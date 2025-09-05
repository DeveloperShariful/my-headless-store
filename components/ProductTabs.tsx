'use client';
import { useState } from 'react';
import styles from '../app/product/[slug]/ProductPage.module.css';

interface ProductTabsProps {
  description: string;
}

export default function ProductTabs({ description }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabButton} ${activeTab === 'description' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'additional' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('additional')}
        >
          Additional Information
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>
      <div className={styles.tabContent}>
        {activeTab === 'description' && <div dangerouslySetInnerHTML={{ __html: description }} />}
        {activeTab === 'additional' && <p>Additional information will be shown here.</p>}
        {activeTab === 'reviews' && <p>Customer reviews will be shown here.</p>}
      </div>
    </div>
  );
}