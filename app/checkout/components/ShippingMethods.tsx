'use client';
import styles from '../CheckoutPage.module.css';

interface ShippingMethodsProps {
  isLoading: boolean;
  rates: any[];
  selectedShipping: string;
  setSelectedShipping: (id: string) => void;
}

export default function ShippingMethods({ isLoading, rates, selectedShipping, setSelectedShipping }: ShippingMethodsProps) {
  return (
    <div className={styles.section}>
      <h3>Shipping Method</h3>
      {isLoading ? (
        <div className={styles.spinner} style={{width: '25px', height: '25px', margin: '1rem 0'}}></div>
      ) : (
        rates.length > 0 ? (
          rates.map((rate: any) => (
            <div 
              key={rate.id} 
              className={`${styles.option} ${selectedShipping === rate.id ? styles.selectedOption : ''}`}
              onClick={() => setSelectedShipping(rate.id)}
            >
              <input 
                type="radio" 
                id={rate.id} 
                name="shippingMethod" 
                value={rate.id} 
                checked={selectedShipping === rate.id} 
                onChange={e => setSelectedShipping(e.target.value)} 
              />
              <label htmlFor={rate.id}>{rate.label}: <strong>{rate.cost > 0 ? `$${rate.cost}` : 'Free'}</strong></label>
            </div>
          ))
        ) : <p>No shipping methods available for your address. Please check your postcode.</p>
      )}
    </div>
  );
}