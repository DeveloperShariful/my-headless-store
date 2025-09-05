'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import styles from '../app/product/[slug]/ProductPage.module.css'; // একই CSS ব্যবহার করা হচ্ছে
import toast from 'react-hot-toast';

interface ProductForCart {
  id: string;
  name: string;
  price: string;
  image?: string;
}

export default function QuantityAddToCart({ product }: { product: ProductForCart }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Context API-তে এখন পরিমাণসহ আইটেম যোগ করতে হবে।
    // এর জন্য আমাদের CartContext আপডেট করতে হতে পারে।
    // আপাতত, আমরা লুপের মাধ্যমে একাধিকবার যোগ করব।
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
    toast.success(`${quantity} x "${product.name}" added to cart!`);
  };

  return (
    <div className={styles.quantityAndCart}>
      <div className={styles.quantitySelector}>
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(q => q + 1)}>+</button>
      </div>
      <button 
        onClick={handleAddToCart} 
        style={{
            flexGrow: 1, 
            padding: '1rem', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontSize: '1.1rem',
            cursor: 'pointer'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}