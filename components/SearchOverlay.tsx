// components/SearchOverlay.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './SearchOverlay.module.css';
import { IoClose } from 'react-icons/io5';

// সার্চ রেজাল্টের একটি আইটেমের গঠন
interface SearchResult {
  id: string;
  slug: string;
  name: string;
  image?: {
    sourceUrl: string;
  };
}

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounce effect to delay API calls
  useEffect(() => {
    if (searchTerm.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      // GraphQL Query to search for products
      const searchQuery = `
        query SearchProducts($search: String!) {
          products(where: { search: $search }) {
            nodes {
              id
              slug
              name
              image {
                sourceUrl(size: THUMBNAIL)
              }
            }
          }
        }
      `;

      fetch("https://sharifulbuilds.com/graphql", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          variables: { search: searchTerm },
        }),
      })
      .then(res => res.json())
      .then(data => {
        setResults(data.data.products.nodes);
        setLoading(false);
      })
      .catch(err => {
        console.error("Search failed:", err);
        setLoading(false);
      });

    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    // এখানে overlay-এর onClick ইভেন্টটি যুক্ত করা হয়েছে, যা কন্টেইনারের বাইরের অংশে ক্লিক করলে ওভারলে বন্ধ করবে
    <div className={styles.overlay} onClick={onClose}> 
      <button className={styles.closeButton} onClick={onClose}>
        <IoClose size={40} />
      </button>

      {/* searchContainer-এ onClick দিয়ে ইভেন্ট বাবলিং বন্ধ করা হয়েছে */}
      <div className={styles.searchContainer} onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for products..."
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={styles.resultsContainer}>
          {loading && <p>Searching...</p>}
          {!loading && results.length > 0 && (
            <ul>
              {results.map(product => (
                <li key={product.id}>
                  <Link href={`/product/${product.slug}`} onClick={onClose}>
                    <img src={product.image?.sourceUrl || '/placeholder.png'} alt={product.name} />
                    <span>{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!loading && results.length === 0 && searchTerm.length >= 3 && (
            <p>No products found for "{searchTerm}"</p>
          )}
        </div>
      </div>
    </div>
  );
}