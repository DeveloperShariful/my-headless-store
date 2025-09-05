'use client';

import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import client from '../../../lib/apolloClient';
import ProductTabs from '../../../components/ProductTabs';
import ProductCard from '../../products/ProductCard'; // আপনার ProductCard এর সঠিক পাথ দিন
import QuantityAddToCart from '../../../components/QuantityAddToCart';
import styles from './ProductPage.module.css';
import { notFound } from 'next/navigation';

// TypeScript Interfaces
interface ImageNode {
  sourceUrl: string;
}
interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  image?: ImageNode;
  galleryImages: {
    nodes: ImageNode[];
  };
  price?: string;
  related: {
    nodes: Product[];
  };
}
interface QueryData {
  product: Product | null;
}

// GraphQL Query
const GET_PRODUCT_QUERY = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      name
      description
      shortDescription
      image {
        sourceUrl
      }
      galleryImages {
        nodes {
          sourceUrl
        }
      }
      ... on SimpleProduct {
        price
      }
      ... on VariableProduct {
        price
      }
      related(first: 4) {
        nodes {
          id
          name
          slug
          image {
            sourceUrl
          }
          ... on SimpleProduct {
            price
          }
          ... on VariableProduct {
            price
          }
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
          notFound(); // প্রোডাক্ট না পাওয়া গেলে 404 পেজ দেখাবে
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
  if (!product) return null; // notFound() ট্রিগার হওয়ার পর এটি আর দেখাবে না

  const productForCart = {
    id: product.id,
    name: product.name,
    price: product.price || '0',
    image: product.image?.sourceUrl,
  };

  // ಮುಖ್ಯ ಚಿತ್ರ ಮತ್ತು ಗ್ಯಾಲರಿ ಚಿತ್ರಗಳನ್ನು ಒಟ್ಟಿಗೆ ಸೇರಿಸುವುದು
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
                <img 
                  key={index}
                  src={img.sourceUrl} 
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className={`${styles.thumbnail} ${mainImage === img.sourceUrl ? styles.activeThumbnail : ''}`}
                  onClick={() => setMainImage(img.sourceUrl)}
                />
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
      
      <ProductTabs description={product.description || ''} />

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