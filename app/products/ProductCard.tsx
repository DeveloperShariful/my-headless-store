'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import styles from './products.module.css';
import { useCart } from '../../context/CartContext';
import { gql } from '@apollo/client';
import client from '../../lib/apolloClient';

// GraphQL Mutation for adding to cart
const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($productId: Int!) {
    addToCart(input: { productId: $productId, quantity: 1 }) {
      cartItem {
        key
        quantity
      }
    }
  }
`;

// প্রোডাক্ট ডেটার ধরন
interface Product {
  id: string;
  name: string;
  slug: string;
  image?: { sourceUrl: string };
  price?: string;
}
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart: contextAddToCart } = useCart();

  const getNumericId = (b64Id: string): number | null => {
    try {
      return parseInt(atob(b64Id).split(':')[1], 10);
    } catch (e) {
      return null;
    }
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const productId = getNumericId(product.id);
    if (!productId) {
      toast.error("Invalid product.");
      return;
    }

    const toastId = toast.loading("Adding to cart...");
    
    try {
      // WooCommerce ব্যাকএন্ডে কার্ট আপডেট করার জন্য মিউটেশন চালানো হচ্ছে
      await client.mutate({
        mutation: ADD_TO_CART_MUTATION,
        variables: { productId: productId }
      });
      
      // ফ্রন্টএন্ডের Context API আপডেট করা হচ্ছে
      contextAddToCart({
        id: product.id,
        name: product.name,
        price: product.price || '0',
        image: product.image?.sourceUrl,
      });

      // MiniCart খোলার জন্য addToCart ফাংশনটি openMiniCart কল করবে (CartContext অনুযায়ী)
      
      toast.success(`"${product.name}" added to cart!`, { id: toastId });

    } catch (error: any) {
      console.error("Add to cart error:", error);
      toast.error(error.message || "Could not add item to cart.", { id: toastId });
    }
  };

  return (
    <Link href={`/product/${product.slug}`} className={styles.productCard}>
        <div className={styles.productImageContainer}>
            {product.image?.sourceUrl ? ( <img src={product.image.sourceUrl} alt={product.name} className={styles.productImage} /> ) 
            : ( <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }} /> )}
        </div>
        <div className={styles.productInfo}>
            <h2 className={styles.productName}>{product.name}</h2>
            <div className={styles.productRating}>★★★★☆ <span style={{ color: '#777', marginLeft: '0.5rem' }}>(4.5)</span></div>
            {product.price && (<div className={styles.productPrice} dangerouslySetInnerHTML={{ __html: product.price }} />)}
            <button className={styles.addToCartBtn} onClick={handleAddToCart}>Add to Cart</button>
        </div>
    </Link>
  );
}