 "use client";

import { useState, useEffect, useCallback } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CheckoutPage.module.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { gql } from '@apollo/client';
import client from '../../lib/apolloClient';

// --- সব GraphQL কোয়েরি এবং মিউটেশন ---
const GET_CHECKOUT_DATA = gql`
  query GetCheckoutData {
    cart(recalculateTotals: true) {
      contents { nodes { product { node { name } } quantity total } }
      subtotal total shippingTotal discountTotal
      availableShippingMethods { rates { id label cost } }
    }
    paymentGateways { nodes { id title } }
  }
`;
const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) { customer { id } }
  }
`;
const APPLY_COUPON = gql`
  mutation ApplyCoupon($code: String!) {
    applyCoupon(input: { code: $code }) { cart { total discountTotal } }
  }
`;
const CHECKOUT_MUTATION = gql`
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) { result order { orderNumber } }
  }
`;
interface CheckoutQueryData {
  cart: {
    availableShippingMethods: {
      rates: any[];
    }[];
  };
  paymentGateways: {
    nodes: any[];
  };
}

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({ firstName: '', lastName: '', address1: '', city: '', postcode: '', email: '', phone: '', country: 'AU', state: 'NSW' });
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [coupon, setCoupon] = useState('');

  const refreshCheckout = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await client.query<CheckoutQueryData>({ query: GET_CHECKOUT_DATA, fetchPolicy: 'network-only' });
      setCheckoutData(data);
      if (data) { 
        setCheckoutData(data);
        if (data.cart?.availableShippingMethods?.[0]?.rates?.[0] && !selectedShipping) {
          setSelectedShipping(data.cart.availableShippingMethods[0].rates[0].id);
        }
        if (data.paymentGateways?.nodes?.[0] && !selectedPayment) {
          setSelectedPayment(data.paymentGateways.nodes[0].id);
        }
      }
      
    } catch (error) { 
      toast.error("Could not load checkout data."); 
    } finally { 
      setLoading(false); 
    }
  }, [selectedShipping, selectedPayment]);

  useEffect(() => {
    if (cartItems.length > 0) { refreshCheckout(); } 
    else { setLoading(false); }
  }, [cartItems.length, refreshCheckout]);
  
  useEffect(() => {
    if (formData.postcode.length >= 4) {
      const handler = setTimeout(async () => {
        setLoading(true);
        await client.mutate({
          mutation: UPDATE_CUSTOMER,
          variables: { input: { shipping: { country: 'AU', postcode: formData.postcode } } }
        });
        await refreshCheckout();
      }, 1000);
      return () => clearTimeout(handler);
    }
  }, [formData.postcode, refreshCheckout]);

  const handleApplyCoupon = async () => { /* ... */ };
  const getNumericId = (b64Id: string) => { /* ... */ };
  const handlePlaceOrder = async (e: React.FormEvent) => { /* ... */ };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  if (loading && !checkoutData) return <div className={styles.loadingOverlay}><div className={styles.spinner}></div></div>;
  if (!loading && cartItems.length === 0) return <div className={styles.container}><h1>Your Cart is Empty</h1></div>;

  const cart = checkoutData?.cart;
  const paymentGateways = checkoutData?.paymentGateways?.nodes || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      <form onSubmit={handlePlaceOrder} className={styles.layout}>
        {/* বাম দিকের কলাম: ঠিকানা */}
        <div className={styles.formColumn}>
          <h2>Billing & Shipping Details</h2>
          <div className={styles.formRow}>
            <input name="firstName" placeholder="First Name" onChange={handleInputChange} required />
            <input name="lastName" placeholder="Last Name" onChange={handleInputChange} required />
          </div>
          <input name="address1" placeholder="Address" onChange={handleInputChange} required />
          <input name="city" placeholder="City" onChange={handleInputChange} required />
          <input name="postcode" placeholder="Postcode" onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
          <input type="tel" name="phone" placeholder="Phone" onChange={handleInputChange} required />
        </div>

        {/* ডান দিকের কলাম: অর্ডার সামারি */}
        <div className={styles.summaryColumn}>
          <h2>Your Order</h2>
          {cart?.contents.nodes.map((item: any, i: number) => (
            <div key={i} className={styles.summaryRow}><span>{item.product.node.name} x {item.quantity}</span><span>{item.total}</span></div>
          ))}
          <hr/>
          <div className={styles.summaryRow}><span>Subtotal</span><span>{cart?.subtotal}</span></div>
          <div className={styles.summaryRow}><span>Shipping</span><span>{cart?.shippingTotal}</span></div>
          {cart?.discountTotal && cart.discountTotal !== '0.00' && 
            <div className={styles.summaryRow}><span>Discount</span><span>-{cart.discountTotal}</span></div>
          }
          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}><span>Total</span><span>{cart?.total}</span></div>

          <div className={styles.section}>
            <h3>Shipping Method</h3>
            {loading ? <div className={styles.spinner}></div> :
              cart?.availableShippingMethods?.[0]?.rates.length > 0 ?
              cart.availableShippingMethods[0].rates.map((rate: any) => (
              <div key={rate.id} className={styles.option}>
                <input type="radio" id={rate.id} name="shipping" value={rate.id} checked={selectedShipping === rate.id} onChange={e => setSelectedShipping(e.target.value)} />
                <label htmlFor={rate.id}>{rate.label}: <strong>{rate.cost > 0 ? `$${rate.cost}` : 'Free'}</strong></label>
              </div>
            )) : <p>No shipping methods available.</p>}
          </div>
          
          <div className={styles.section}>
             <h3>Have a coupon?</h3>
             <div className={styles.couponForm}>
                <input placeholder="Coupon code" onChange={e => setCoupon(e.target.value)} />
                <button type="button" className={styles.couponButton} onClick={handleApplyCoupon}>Apply</button>
             </div>
          </div>
          
          <div className={styles.section}>
            <h3>Payment Method</h3>
            {paymentGateways.length > 0 ? (
              paymentGateways.map((gateway: any) => (
                <div key={gateway.id} className={styles.option}>
                  <input type="radio" id={gateway.id} name="payment" value={gateway.id} checked={selectedPayment === gateway.id} onChange={e => setSelectedPayment(e.target.value)} />
                  <label htmlFor={gateway.id}>{gateway.title}</label>
                </div>
              ))
            ) : (<p>No payment methods available.</p>)}
          </div>

          <button type="submit" className={styles.placeOrderButton} disabled={isProcessing || loading || !selectedShipping || !selectedPayment}>
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
}