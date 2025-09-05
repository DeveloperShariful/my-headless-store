// components/AddToCartButton.tsx
"use client";

import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast'; // <-- toast ইম্পোর্ট করুন

interface ProductData {
  id: string;
  name: string;
  price: string;
  image?: string;
}

export default function AddToCartButton({ product }: { product: ProductData }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    // পুরনো alert-এর জায়গায় নতুন toast.success ব্যবহার করা হচ্ছে
    toast.success(`"${product.name}" added to cart!`); 
  };

  return (
    <button
      onClick={handleAddToCart}
      style={{
        marginTop: '2rem',
        padding: '1rem 2rem',
        fontSize: '1rem',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      Add to Cart
    </button>
  );
}