// app/cart/page.tsx
"use client";

import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import styles from './CartPage.module.css';

export default function CartPage() {
  // context থেকে নতুন ফাংশনগুলো আনা হলো
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const parsePrice = (priceHtml: string): number => {
    const priceString = priceHtml.replace(/<[^>]*>/g, '').replace(/[^0-9.]/g, '');
    return parseFloat(priceString) || 0;
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + parsePrice(item.price) * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Your Cart is Empty</h1>
        <Link href="/products" className={styles.continueShopping}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Shopping Cart</h1>
      <div className={styles.cartLayout}>
        <div className={styles.cartItems}>
          {cartItems.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <h2 className={styles.itemName}>{item.name}</h2>
                <p className={styles.itemPrice} dangerouslySetInnerHTML={{ __html: item.price }}></p>
                <div className={styles.quantityControl}>
                  {/* বাটনগুলো এখন কার্যকরী করা হয়েছে */}
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div className={styles.itemActions}>
                {/* রিমুভ বাটন এখন কার্যকরী করা হয়েছে */}
                <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link href="/checkout" className={styles.checkoutButton}>
    Proceed to Checkout
  </Link>
        </div>
      </div>
    </div>
  );
}