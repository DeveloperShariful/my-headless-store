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
      contents { nodes { product { node { name, image { sourceUrl } } } quantity subtotal } }
      subtotal
      total
      shippingTotal
      discountTotal
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

  const refreshCheckout = useCallback(async (shippingInfo?: object) => {
    try {
      setLoading(true);
      if (shippingInfo) {
        await client.mutate({
          mutation: UPDATE_CUSTOMER,
          variables: { input: { shipping: shippingInfo, billing: shippingInfo } }
        });
      }
      const { data } = await client.query({ query: GET_CHECKOUT_DATA, fetchPolicy: 'network-only' });
      setCheckoutData(data);
      if (data.cart?.availableShippingMethods?.[0]?.rates?.[0] && !selectedShipping) {
        setSelectedShipping(data.cart.availableShippingMethods[0].rates[0].id);
      }
      if (data.paymentGateways?.nodes?.[0] && !selectedPayment) {
        setSelectedPayment(data.paymentGateways.nodes[0].id);
      }
    } catch (error) { 
      console.error("Refresh Checkout Error:", error);
      toast.error("Could not load checkout data."); 
    } finally { 
      setLoading(false); 
    }
  }, [selectedShipping, selectedPayment]);

  useEffect(() => {
    if (cartItems.length > 0) {
      refreshCheckout();
    } else {
      setLoading(false);
    }
  }, [cartItems.length, refreshCheckout]);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (formData.postcode.length >= 4) {
        refreshCheckout({ country: formData.country, postcode: formData.postcode });
      }
    }, 1000);
    return () => clearTimeout(handler);
  }, [formData.postcode, formData.country, refreshCheckout]);

  const getNumericId = (b64Id: string): number | null => {
    try { 
      return parseInt(atob(b64Id).split(':')[1], 10); 
    } catch(e) { 
      console.error("Invalid base64 ID:", b64Id);
      return null; 
    }
  };

  const handleApplyCoupon = async () => {
    if (!coupon) return;
    setLoading(true);
    try {
      await client.mutate({ mutation: APPLY_COUPON, variables: { code: coupon } });
      toast.success("Coupon applied!");
      await refreshCheckout();
    } catch (error: any) {
      toast.error(error.message || "Invalid coupon.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    toast.loading("Placing order...");

    const lineItems = cartItems.map(item => ({
      productId: getNumericId(item.id),
      quantity: item.quantity,
    })).filter(item => item.productId !== null);

    if (lineItems.length !== cartItems.length) {
      toast.error("Some items in the cart are invalid. Please try again.");
      setIsProcessing(false);
      return;
    }

    try {
      const { data } = await client.mutate({
        mutation: CHECKOUT_MUTATION,
        variables: { input: {
          billing: formData,
          shipping: formData,
          paymentMethod: selectedPayment,
          shippingMethods: [selectedShipping],
          lineItems: lineItems
        }}
      });

      toast.dismiss();
      if (data.checkout.result === 'success') {
        toast.success('Order placed successfully!');
        clearCart();
        router.push(`/order-success?order_id=${data.checkout.order.orderNumber}`);
      } else {
        throw new Error('Failed to place order. Please check your details.');
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  if (loading && cartItems.length > 0) return <div className={styles.loadingOverlay}><div className={styles.spinner}></div></div>;
  if (cartItems.length === 0) return <div className={styles.container}><h1 className={styles.title}>Your Cart is Empty</h1></div>;

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
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" className={styles.input} onChange={handleInputChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" className={styles.input} onChange={handleInputChange} required />
            </div>
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="address1">Address</label>
            <input id="address1" name="address1" className={styles.input} onChange={handleInputChange} required />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city">City</label>
              <input id="city" name="city" className={styles.input} onChange={handleInputChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="postcode">Postcode</label>
              <input id="postcode" name="postcode" className={styles.input} onChange={handleInputChange} required />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" className={styles.input} onChange={handleInputChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input id="phone" type="tel" name="phone" className={styles.input} onChange={handleInputChange} required />
            </div>
          </div>
        </div>

        {/* ডান দিকের কলাম: অর্ডার সামারি */}
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
          <div className={styles.summaryRow}><span>Subtotal</span><span dangerouslySetInnerHTML={{ __html: cart?.subtotal || '...' }}></span></div>
          <div className={styles.summaryRow}><span>Shipping</span><span dangerouslySetInnerHTML={{ __html: cart?.shippingTotal || '...' }}></span></div>
          {cart?.discountTotal && cart.discountTotal !== '$0.00' && 
            <div className={styles.summaryRow}><span>Discount</span><span dangerouslySetInnerHTML={{ __html: `-${cart.discountTotal}` }}></span></div>
          }
          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}><span>Total</span><span dangerouslySetInnerHTML={{ __html: cart?.total || '...' }}></span></div>

          <div className={styles.section}>
            <h3>Shipping Method</h3>
            {loading ? <div className={styles.spinner}></div> :
              cart?.availableShippingMethods?.[0]?.rates.length > 0 ?
              cart.availableShippingMethods[0].rates.map((rate: any) => (
              <div key={rate.id} className={styles.option}>
                <input type="radio" id={rate.id} name="shipping" value={rate.id} checked={selectedShipping === rate.id} onChange={e => setSelectedShipping(e.target.value)} />
                <label htmlFor={rate.id}>{rate.label}: <strong>{rate.cost > 0 ? `$${rate.cost}` : 'Free'}</strong></label>
              </div>
            )) : <p>No shipping methods available for your address.</p>}
          </div>
          
          <div className={styles.section}>
             <h3>Have a coupon?</h3>
             <div className={styles.couponForm}>
                <input className={styles.input} placeholder="Coupon code" onChange={e => setCoupon(e.target.value)} />
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