'use client';
import styles from '../CheckoutPage.module.css';

interface CouponFormProps {
  coupon: string;
  setCoupon: (code: string) => void;
  handleApplyCoupon: () => void;
  isLoading: boolean; // কুপন প্রয়োগ করার সময় লোডিং অবস্থা দেখানোর জন্য
}

export default function CouponForm({ coupon, setCoupon, handleApplyCoupon, isLoading }: CouponFormProps) {
  return (
    <div className={styles.section}>
      <h3>Have a coupon?</h3>
      <div className={styles.couponForm}>
        <input 
          className={styles.input} 
          placeholder="Coupon code" 
          value={coupon} 
          onChange={e => setCoupon(e.target.value)} 
          disabled={isLoading}
        />
        <button 
          type="button" 
          className={styles.couponButton} 
          onClick={handleApplyCoupon}
          disabled={isLoading}
        >
          {isLoading ? 'Applying...' : 'Apply'}
        </button>
      </div>
    </div>
  );
}