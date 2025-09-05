// app/products/ProductFilters.tsx
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
// CSS ইম্পোর্টের পাথটি ঠিক করুন
import styles from './filters.module.css';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductFiltersProps {
  categories: Category[];
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      params.delete('page');
      return params.toString();
    },
    [searchParams]
  );

  const handleCategoryChange = (slug: string) => {
    const newQuery = createQueryString('category', slug);
    router.push(`${pathname}?${newQuery}`);
  };

  return (
    <div className={styles.filterWrapper}>
      <h3 className={styles.filterTitle}>Categories</h3>
      <ul className={styles.categoryList}>
        {/* --- এখানে পরিবর্তন করা হয়েছে --- */}
        <li
          className={`${styles.categoryItem} ${!activeCategory ? styles.active : ''}`}
          onClick={() => handleCategoryChange('')}
        >
          All Products
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            className={`${styles.categoryItem} ${activeCategory === category.slug ? styles.active : ''}`}
            onClick={() => handleCategoryChange(category.slug)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}