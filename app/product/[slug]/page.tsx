'use client';

import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import client from '../../../lib/apolloClient';
import ProductCard from '../../products/ProductCard';
import QuantityAddToCart from '../../../components/QuantityAddToCart';
import ReviewForm from '../../../components/ReviewForm'; // <-- রিভিউ ফর্ম ইম্পোর্ট করা হয়েছে
import styles from './ProductPage.module.css';
import { notFound } from 'next/navigation';

// --- TypeScript Interfaces ---
interface ImageNode { sourceUrl: string; }
interface Attribute { name: string; options: string[]; }
interface ReviewAuthor { node: { name: string; }; }
interface Review {
  id: string;
  author: ReviewAuthor;
  content: string;
  date: string;
}
interface Product {
  id: string;
  databaseId: number;
  name: string;
  description: string;
  shortDescription?: string;
  image?: ImageNode;
  galleryImages: { nodes: ImageNode[]; };
  price?: string;
  attributes: { nodes: Attribute[] };
  reviews: { nodes: Review[] };
  related: { nodes: Product[]; };
}
interface QueryData { product: Product | null; }

// --- GraphQL কোয়েরি ---
const GET_PRODUCT_QUERY = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      description
      shortDescription
      image { sourceUrl }
      galleryImages { nodes { sourceUrl } }
      ... on SimpleProduct {
        price
        attributes { nodes { name options } }
      }
      ... on VariableProduct {
        price
        attributes { nodes { name options } }
      }
      reviews(first: 10) {
        nodes {
          id
          author { node { name } }
          content
          date
        }
      }
      related(first: 4) {
        nodes {
          id
          name
          slug
          image { sourceUrl }
          ... on SimpleProduct { price }
          ... on VariableProduct { price }
        }
      }
    }
  }
`;

export default function SingleProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await client.query<QueryData>({
          query: GET_PRODUCT_QUERY,
          variables: { slug: params.slug },
        });
        if (data.product) {
          setProduct(data.product);
          setMainImage(data.product.image?.sourceUrl);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.slug]);
  
  if (loading) return <div>Loading...</div>;
  if (!product) return null;

  const productForCart = {
    id: product.id,
    name: product.name,
    price: product.price || '0',
    image: product.image?.sourceUrl,
  };

  const allImages = [product.image, ...product.galleryImages.nodes].filter(Boolean) as ImageNode[];

  return (
    <div className={styles.container}>
      <div className={styles.productLayout}>
        {/* বাম দিকে ছবি ও গ্যালারি */}
        <div className={styles.galleryContainer}>
            {mainImage && <img src={mainImage} alt={product.name} className={styles.mainImage} />}
            {allImages.length > 1 && (
                <div className={styles.thumbnailGrid}>
                {allImages.map((img, index) => (
                    <img key={index} src={img.sourceUrl} alt={`${product.name} thumbnail ${index + 1}`}
                    className={`${styles.thumbnail} ${mainImage === img.sourceUrl ? styles.activeThumbnail : ''}`}
                    onClick={() => setMainImage(img.sourceUrl)} />
                ))}
                </div>
            )}
        </div>

        {/* ডান দিকের তথ্য */}
        <div>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <div className={styles.ratingWrapper}>
            <div className={styles.rating}>★★★★☆</div>
            <div className={styles.reviewsCount}>(8 customer reviews)</div>
          </div>
          <div className={styles.priceWrapper}>
            <img src="https://gobike.au/wp-content/uploads/2025/08/hot-deal.svg" alt="Hot Deal" className={styles.dealBadge} />
            {product.price && (
              <div className={styles.productPrice} dangerouslySetInnerHTML={{ __html: product.price }} />
            )}
          </div>
          {product.shortDescription && (
            <div 
              className={styles.shortDescription} 
              dangerouslySetInnerHTML={{ __html: product.shortDescription.replace(/<ul>/g, `<ul class="${styles.featuresGrid}">`).replace(/<li>/g, `<li class="${styles.featureItem}">`) }} 
            />
          )}
          <QuantityAddToCart product={productForCart} />
          <div className={styles.trustBadges}>
            <span>✓ 100% Secure Checkout</span>
            <span>✓ 30 Days Easy Returns</span>
            <span>✓ 1 Year Full Warranty</span>
            <span>✓ Fast Shipping Aus-Wide</span>
          </div>
          <div className={styles.checkoutGuarantee}>
            <p className={styles.guaranteeText}>Guaranteed Safe Checkout</p>
            <img src="https://themedemo.commercegurus.com/shoptimizer-demodata/wp-content/uploads/sites/53/2018/07/trust-symbols_a.jpg" alt="Payment Methods" className={styles.paymentLogos} />
          </div>
        </div>
      </div>
      
      {/* Description Section */}
      {product.description && (
        <section className={styles.productInfoSection}>
          <h2 className={styles.sectionTitle}>Description</h2>
          <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: product.description }} />
        </section>
      )}

      {/* Additional Information Section */}
      {product.attributes && product.attributes.nodes.length > 0 && (
        <section className={styles.productInfoSection}>
          <h2 className={styles.sectionTitle}>Additional Information</h2>
          <div className={styles.sectionContent}>
            <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
              <tbody>
                {product.attributes.nodes.map((attr, index) => (
                  <tr key={index} style={{borderBottom: '1px solid #eaeaea'}}>
                    <th style={{padding: '0.8rem 0', width: '30%'}}>{attr.name}</th>
                    <td style={{padding: '0.8rem 0'}}>{attr.options.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      
      {/* Reviews Section */}
      <section className={styles.productInfoSection}>
        <h2 className={styles.sectionTitle}>Customer Reviews</h2>
        <div className={styles.sectionContent}>
          {product.reviews && product.reviews.nodes.length > <strong><mark>0</mark></strong> ? (
            product.reviews.nodes.map(review => (
              <div key={review.id} style={{borderBottom: '1px solid #eee', marginBottom: '1.5rem', paddingBottom: '1.5rem'}}>
                <strong>{review.author.node.name}</strong>
                <p style={{fontSize: '0.8rem', color: '#777', margin: '0.25rem 0'}}>{new Date(review.date).toLocaleDateString()}</p>
                <div dangerouslySetInnerHTML={{ __html: review.content }} />
              </div>
            ))
          ) : (
            <p>There are no reviews yet.</p>
          )}
          <ReviewForm productId={product.databaseId} />
        </div>
      </section>

      {/* Related Products Section */}
      {product.related && product.related.nodes.length > 0 && (
        <div className={styles.relatedProducts}>
          <h2 className={styles.relatedTitle}>Related Products</h2>
          <div className={styles.relatedGrid}>
            {product.related.nodes.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}