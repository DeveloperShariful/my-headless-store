// app/products/PaginationControls.tsx
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './pagination.module.css'; // pagination.module.css ফাইলটি অপরিবর্তিত থাকবে

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

interface PaginationControlsProps {
  pageInfo: PageInfo;
}

export default function PaginationControls({ pageInfo }: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // "Next" বাটনের জন্য URL তৈরি
  const createNextPageUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('before');
    if (pageInfo.endCursor) {
      params.set('after', pageInfo.endCursor);
    }
    return `${pathname}?${params.toString()}`;
  };

  // "Previous" বাটনের জন্য URL তৈরি
  const createPrevPageUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('after');
    if (pageInfo.startCursor) {
      params.set('before', pageInfo.startCursor);
    }
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className={styles.paginationContainer}>
      {pageInfo.hasPreviousPage ? (
        <Link href={createPrevPageUrl()} className={styles.button}>
          &larr; Previous
        </Link>
      ) : (
        <button className={styles.button} disabled>
          &larr; Previous
        </button>
      )}

      {pageInfo.hasNextPage ? (
        <Link href={createNextPageUrl()} className={styles.button}>
          Next &rarr;
        </Link>
      ) : (
        <button className={styles.button} disabled>
          Next &rarr;
        </button>
      )}
    </div>
  );
}