"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { useCart } from '../context/CartContext';
import SearchOverlay from './SearchOverlay';
import MiniCart from './MiniCart';

import { IoSearch, IoPersonOutline, IoMenu, IoClose } from "react-icons/io5";

export default function Header() {
  // MiniCart এর state এখন CartContext থেকে আসছে
  const { cartItems, isMiniCartOpen, openMiniCart, closeMiniCart } = useCart();
  
  // Search এবং Mobile Menu এর জন্য লোকাল state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const pathname = usePathname();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          
          <div className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
          </div>

          <div className={styles.logo}>
            <Link href="/">MyStore</Link>
          </div>

          <nav className={`${styles.navigation} ${isMenuOpen ? styles.menuOpen : ''}`}>
            <div className={styles.mobileOnly}>
              <button className={styles.mobileMenuLink} onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}>Search</button>
              <Link href="/account" className={styles.mobileMenuLink} onClick={() => setIsMenuOpen(false)}>Account</Link>
            </div>

            <Link href="/" className={pathname === '/' ? styles.activeLink : ''} onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/bikes" className={pathname === '/bikes' ? styles.activeLink : ''} onClick={() => setIsMenuOpen(false)}>Bikes</Link>
            <Link href="/products" className={pathname === '/products' ? styles.activeLink : ''} onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link href="/about" className={pathname === '/about' ? styles.activeLink : ''} onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link href="/contact" className={pathname === '/contact' ? styles.activeLink : ''} onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link href="/faq" className={pathname === '/faq' ? styles.activeLink : ''} onClick={() => setIsMenuOpen(false)}>FAQs</Link>
          </nav>

          <div className={styles.actionIcons}>
            <button className={styles.iconButton} onClick={() => setIsSearchOpen(true)}>
              <IoSearch size={24} />
            </button>
            <Link href="/account" className={styles.iconButton}>
              <IoPersonOutline size={24} />
            </Link>
            
            {/* কার্ট আইকন এখন সেন্ট্রাল openMiniCart ফাংশনকে কল করবে */}
            <button className={styles.cartIcon} onClick={openMiniCart}>
              <span>🛒</span>
              {totalItems > 0 && (
                <span className={styles.cartCount}>{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </header>
      
      {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
      
      {/* MiniCart এখন সেন্ট্রাল state দ্বারা নিয়ন্ত্রিত হবে */}
      <MiniCart isOpen={isMiniCartOpen} onClose={closeMiniCart} />
    </>
  );
}