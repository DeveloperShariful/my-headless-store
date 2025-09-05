"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';

interface CartItem {
  id: string;
  name: string;
  price: string;
  image?: string;
  quantity: number;
}

// --- কনটেক্সটের ধরন আপডেট করা হয়েছে ---
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isMiniCartOpen: boolean; // <-- নতুন state
  openMiniCart: () => void; // <-- MiniCart খোলার জন্য নতুন ফাংশন
  closeMiniCart: () => void; // <-- MiniCart বন্ধ করার জন্য নতুন ফাংশন
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false); // <-- MiniCart এর জন্য নতুন state

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem('cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      window.localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialLoad]);

  // --- MiniCart নিয়ন্ত্রণের ফাংশন ---
  const openMiniCart = () => setIsMiniCartOpen(true);
  const closeMiniCart = () => setIsMiniCartOpen(false);

  const addToCart = (itemToAdd: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
    openMiniCart(); // <-- মূল পরিবর্তন: আইটেম যোগ করার সাথে সাথে MiniCart খুলে যাবে
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => {
        const itemToRemove = prevItems.find(item => item.id === itemId);
        if (itemToRemove) {
            toast.error(`"${itemToRemove.name}" removed from cart.`);
        }
        return prevItems.filter(item => item.id !== itemId);
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart,
        isMiniCartOpen, // <-- নতুন value যোগ করা হয়েছে
        openMiniCart,     // <-- নতুন value যোগ করা হয়েছে
        closeMiniCart     // <-- নতুন value যোগ করা হয়েছে
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}