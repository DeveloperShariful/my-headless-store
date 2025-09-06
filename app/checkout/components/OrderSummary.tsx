'use client';
import { useCart } from '../../../context/CartContext';
import styles from '../CheckoutPage.module.css';

interface OrderSummaryProps {
  cartData: any; // GraphQL থেকে আসা কার্টের তথ্য
}

export default function OrderSummary({ cartData }: OrderSummaryProps) {
  const { cartItems } = useCart();
  const cart = cartData;

  return (
    <div className={styles.summaryColumn}>
      <h2>Your Order</h2>
      {cartItems.map(item => (
        <div key={item.id} className={styles.summaryItem}>
          {item.image && <img src={item.image} alt={item.name} className={styles.itemImage}/>}
          <div className={styles.itemInfo}>
            <span>{item.name} x {item.quantity}</span>
          </div>
          <span dangerouslySetInnerHTML={{ __html: item.price.replace(/<bdi>|<\/bdi>/g, '') }}></span>
        </div>
      ))}
      <hr/>
      <div className={styles.summaryRow}>
        <span>Subtotal</span>
        <span dangerouslySetInnerHTML={{ __html: cart?.subtotal || '...' }}></span>
      </div>
      <div className={styles.summaryRow}>
        <span>Shipping</span>
        <span dangerouslySetInnerHTML={{ __html: cart?.shippingTotal || '...' }}></span>
      </div>
      {cart?.discountTotal && cart.discountTotal !== '$0.00' && 
        <div className={styles.summaryRow}>
          <span>Discount</span>
          <span dangerouslySetInnerHTML={{ __html: `-${cart.discountTotal}` }}></span>
        </div>
      }
      <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
        <span>Total</span>
        <span dangerouslySetInnerHTML={{ __html: cart?.total || '...' }}></span>
      </div>
    </div>
  );
}