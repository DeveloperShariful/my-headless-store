'use client';

import Link from 'next/link';
import toast from 'react-hot-toast'; // আপনার লেআউটে Toaster সেটআপ করা আছে, তাই এটি ব্যবহার করছি
import styles from './products.module.css';
import { useCart } from '../../context/CartContext'; // আপনার বানানো CartContext থেকে useCart হুক ইম্পোর্ট করছি

// প্রোডাক্টের ডেটার ধরন
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
  // আপনার বানানো useCart হুক থেকে addToCart ফাংশনটি নিচ্ছি
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // যেন বাটনে ক্লিক করলে প্রোডাক্ট পেজে না যায়

    // আপনার addToCart ফাংশনটি quantity ছাড়া একটি অবজেক্ট নেয়,
    // তাই আমরা সেই ফরম্যাটেই ডেটা পাঠাচ্ছি।
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price || '0', // দাম না থাকলে '0' পাঠানো হচ্ছে
      image: product.image?.sourceUrl, // image অবজেক্ট থেকে sourceUrl বের করে পাঠানো হচ্ছে
    };

    addToCart(itemToAdd);
    
    // ব্যবহারকারীকে জানানোর জন্য একটি সুন্দর নোটিফিকেশন
    toast.success(`"${product.name}" has been added to the cart!`);
  };

  return (
    <Link href={`/product/${product.slug}`} className={styles.productCard}>
      <div className={styles.productImageContainer}>
        {product.image?.sourceUrl ? (
          <img src={product.image.sourceUrl} alt={product.name} className={styles.productImage} />
        ) : (
          <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }} />
        )}
      </div>
      <div className={styles.productInfo}>
        <h2 className={styles.productName}>{product.name}</h2>
        
        {/* রেটিং এর জন্য ডেমো স্টার */}
        <div className={styles.productRating}>
          ★★★★☆ <span style={{ color: '#777', marginLeft: '0.5rem' }}>(4.5)</span>
        </div>
        
        {product.price && (
          <div className={styles.productPrice} dangerouslySetInnerHTML={{ __html: product.price }} />
        )}
        
        <button 
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}