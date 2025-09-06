'use client';
import styles from '../CheckoutPage.module.css';
// StripeForm এর জন্য import, যা আমরা পরে তৈরি করব (ঐচ্ছিক)
// import StripeForm from './StripeForm';

interface PaymentMethodsProps {
  paymentGateways: any[];
  selectedPayment: string;
  setSelectedPayment: (id: string) => void;
}

export default function PaymentMethods({ paymentGateways, selectedPayment, setSelectedPayment }: PaymentMethodsProps) {
  return (
    <div className={styles.section}>
      <h3>Payment Method</h3>
      {paymentGateways.length > 0 ? (
        paymentGateways.map((gateway: any) => (
          <div key={gateway.id}>
            <div 
              className={`${styles.option} ${selectedPayment === gateway.id ? styles.selectedOption : ''}`}
              onClick={() => setSelectedPayment(gateway.id)}
            >
              <input 
                type="radio" 
                id={gateway.id} 
                name="paymentMethod" 
                value={gateway.id} 
                checked={selectedPayment === gateway.id} 
                onChange={e => setSelectedPayment(e.target.value)} 
              />
              <label htmlFor={gateway.id}>{gateway.title}</label>
            </div>
            
            {/* Stripe বা অন্য কোনো গেটওয়ের জন্য অতিরিক্ত ফিল্ড এখানে দেখানো যেতে পারে */}
            {/* {gateway.id === 'stripe' && selectedPayment === 'stripe' && (
              <StripeForm />
            )} */}
          </div>
        ))
      ) : (
        <p>No payment methods available.</p>
      )}
    </div>
  );
}