// app/product/[slug]/page.tsx

import { gql } from '@apollo/client';
import client from '../../../lib/apolloClient';
import AddToCartButton from '../../../components/AddToCartButton';

interface Product {
  id: string;
  name: string;
  description: string;
  image?: {
    sourceUrl: string;
  };
  price?: string;
}

interface GetProductQueryData {
  product: Product | null; // <-- পরিবর্তন ১: প্রোডাক্ট null হতে পারে
}

// --- শুধুমাত্র এই ফাংশনটি পরিবর্তন করা হয়েছে ---
async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data } = await client.query<GetProductQueryData>({
    query: gql`
      query GetProductBySlug($slug: ID!) {
        product(id: $slug, idType: SLUG) {
          id
          name
          description
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
    `,
    variables: {
      slug,
    },
    context: {
      fetchOptions: {
        next: { revalidate: 3600 },
      },
    },
  });
  
  // --- পরিবর্তন ২: ডেটা না থাকলে null ফেরত দেওয়া হচ্ছে ---
  if (!data || !data.product) {
    return null;
  }
  
  return data.product;
}

export default async function SingleProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return <div>Product not found!</div>;
  }

  const productForCart = {
    id: product.id,
    name: product.name,
    price: product.price || '0',
    image: product.image?.sourceUrl,
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
      <div>
        {product.image?.sourceUrl && (
          <img 
            src={product.image.sourceUrl} 
            alt={product.name} 
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        )}
      </div>
      <div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.name}</h1>
        {product.price && (
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0070f3' }} dangerouslySetInnerHTML={{ __html: product.price }}></p>
        )}
        <div 
          style={{ marginTop: '1.5rem', fontSize: '1.1rem', lineHeight: '1.7', color: '#333' }} 
          dangerouslySetInnerHTML={{ __html: product.description }} 
        />
        
        <AddToCartButton product={productForCart} />

      </div>
    </div>
  );
}