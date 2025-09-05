'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import styles from './MiniCart.module.css';
import { IoClose } from 'react-icons/io5';

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const { cartItems, removeFromCart } = useCart();

  // MiniCart খোলা বা বন্ধ হলে body-তে ক্লাস যোগ/বাদ দেওয়ার জন্য
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    // কম্পোনেন্ট আনমাউন্ট হলে (যেমন পেজ পরিবর্তন হলে) ক্লাসটি পরিষ্কার করার জন্য
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  // Price string থেকে number এ কনভার্ট করার ফাংশন
  const parsePrice = (price: string) => {
    // HTML ট্যাগ (যেমন <bdi>) এবং কারেন্সি সিম্বল বাদ দিয়ে শুধু সংখ্যা বের করে
    const cleanedPrice = price.replace(/<[^>]*>|[^0-9.]/g, '');
    return parseFloat(cleanedPrice) || 0;
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price = parsePrice(item.price);
    return total + price * item.quantity;
  }, 0);

  // isOpen false হলে কম্পোনেন্ট রেন্ডার হবে না
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={`${styles.miniCartOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}></div>
      <div className={`${styles.miniCartContainer} ${isOpen ? styles.open : ''}`}>
        <header className={styles.header}>
          <h3>Shopping Cart</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <IoClose />
          </button>
        </header>

        <div className={styles.cartBody}>
          {cartItems.length === 0 ? (
            <p className={styles.emptyMessage}>Your cart is empty.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                {item.image ? (
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                ) : (
                  <div style={{width: '80px', height: '80px', backgroundColor: '#f0f0f0'}} className={styles.itemImage}/>
                )}
                <div className={styles.itemDetails}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemPrice} dangerouslySetInnerHTML={{ __html: item.price }}></p>
                  <div className={styles.itemActions}>
                    <span className={styles.itemQuantity}>Qty: {item.quantity}</span>
                    <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <footer className={styles.footer}>
            <div className={styles.subtotal}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.actionButtons}>
              <Link href="/cart" className={`${styles.actionButton} ${styles.viewCart}`} onClick={onClose}>
                View Cart
              </Link>
              <Link href="/checkout" className={`${styles.actionButton} ${styles.checkout}`} onClick={onClose}>
                Checkout
              </Link>
            </div>
          </footer>
        )}
      </div>
    </>
  );
}