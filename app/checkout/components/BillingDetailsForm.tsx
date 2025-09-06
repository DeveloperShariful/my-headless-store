'use client';
import styles from '../CheckoutPage.module.css';

interface BillingDetailsFormProps {
  formData: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    postcode: string;
    email: string;
    phone: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BillingDetailsForm({ formData, handleInputChange }: BillingDetailsFormProps) {
  return (
    <div className={styles.formColumn}>
      <h2>Billing & Shipping Details</h2>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" value={formData.firstName} className={styles.input} onChange={handleInputChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" value={formData.lastName} className={styles.input} onChange={handleInputChange} required />
        </div>
      </div>
      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
        <label htmlFor="address1">Address</label>
        <input id="address1" name="address1" value={formData.address1} className={styles.input} onChange={handleInputChange} required />
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="city">City</label>
          <input id="city" name="city" value={formData.city} className={styles.input} onChange={handleInputChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="postcode">Postcode</label>
          <input id="postcode" name="postcode" value={formData.postcode} className={styles.input} onChange={handleInputChange} required />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={formData.email} className={styles.input} onChange={handleInputChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone</label>
          <input id="phone" type="tel" name="phone" value={formData.phone} className={styles.input} onChange={handleInputChange} required />
        </div>
      </div>
    </div>
  );
}