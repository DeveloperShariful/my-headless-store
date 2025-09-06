"use client";

import { useState, useEffect, useCallback } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CheckoutPage.module.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { gql } from '@apollo/client';
import client from '../../lib/apolloClient';

// --- নতুন কম্পোনেন্টগুলো ইম্পোর্ট করা হচ্ছে ---
import BillingDetailsForm from './components/BillingDetailsForm';
import ShippingMethods from './components/ShippingMethods';
import CouponForm from './components/CouponForm';
import PaymentMethods from './components/PaymentMethods';
import OrderSummary from './components/OrderSummary';

// --- সব GraphQL কোয়েরি এবং মিউটেশন ---
const GET_CHECKOUT_DATA = gql`
  query GetCheckoutData {
    cart(recalculateTotals: true) {
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
  
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  const [selectedShipping, setSelectedShipping] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [coupon, setCoupon] = useState('');

  const refreshCheckout = useCallback(async (shippingInfo?: object) => {
    try {
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
    }
  }, [selectedShipping, selectedPayment]);
  
  useEffect(() => {
    if (cartItems.length > 0) {
      setIsPageLoading(true);
      refreshCheckout().finally(() => setIsPageLoading(false));
    } else {
      setIsPageLoading(false);
    }
  }, [cartItems.length, refreshCheckout]);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (formData.postcode.length >= 4) {
        setIsShippingLoading(true);
        refreshCheckout({ country: formData.country, postcode: formData.postcode })
          .finally(() => setIsShippingLoading(false));
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [formData.postcode, formData.country, refreshCheckout]);

  const getNumericId = (b64Id: string): number | null => {
    try { 
      return parseInt(atob(b64Id).split(':')[1], 10); 
    } catch(e) { 
      return null; 
    }
  };

  const handleApplyCoupon = async () => {
    if (!coupon) return;
    setIsCouponLoading(true);
    try {
      await client.mutate({ mutation: APPLY_COUPON, variables: { code: coupon } });
      toast.success("Coupon applied!");
      await refreshCheckout();
    } catch (error: any) {
      toast.error(error.message || "Invalid coupon.");
    } finally {
      setIsCouponLoading(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingOrder(true);
    toast.loading("Placing order...");

    const lineItems = cartItems.map(item => ({
      productId: getNumericId(item.id),
      quantity: item.quantity,
    })).filter(item => item.productId !== null);

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
        throw new Error('Failed to place order.');
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message);
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  if (isPageLoading) return <div className={styles.loadingOverlay}><div className={styles.spinner}></div></div>;
  if (cartItems.length === 0) return <div className={styles.container}><h1 className={styles.title}>Your Cart is Empty</h1></div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      <form onSubmit={handlePlaceOrder} className={styles.layout}>
        <div className={styles.formColumn}>
          <BillingDetailsForm formData={formData} handleInputChange={handleInputChange} />
          
          <ShippingMethods 
            isLoading={isShippingLoading}
            rates={checkoutData?.cart?.availableShippingMethods?.[0]?.rates || []}
            selectedShipping={selectedShipping}
            setSelectedShipping={setSelectedShipping}
          />
        </div>
        
        <div className={styles.summaryColumn}>
          <OrderSummary cartData={checkoutData?.cart} />
          
          <CouponForm
            coupon={coupon}
            setCoupon={setCoupon}
            handleApplyCoupon={handleApplyCoupon}
            isLoading={isCouponLoading}
          />

          <PaymentMethods
            paymentGateways={checkoutData?.paymentGateways?.nodes || []}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />

          <button type="submit" className={styles.placeOrderButton} disabled={isProcessingOrder || isShippingLoading || !selectedShipping || !selectedPayment}>
            {isProcessingOrder ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
}