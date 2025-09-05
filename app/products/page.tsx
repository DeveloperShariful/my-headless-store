// app/products/page.tsx

import { gql } from '@apollo/client';
import client from '../../lib/apolloClient';
import styles from './products.module.css';
import ProductFilters from './ProductFilters';
import PaginationControls from './PaginationControls';
import ProductCard from './ProductCard';

const PRODUCTS_PER_PAGE = 12;

// --- Interfaces (অপরিবর্তিত) ---
interface Product {
  id: string;
  name: string;
  slug: string;
  image?: { sourceUrl: string };
  price?: string;
}
interface Category {
  id: string;
  name: string;
  slug: string;
}
interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}
// --- QueryData Interface-এ একটি ছোট পরিবর্তন আনা হয়েছে ---
interface QueryData {
  products: {
    nodes: Product[];
    pageInfo: PageInfo;
  } | null; // <-- products null হতে পারে
  productCategories: {
    nodes: Category[];
  } | null; // <-- productCategories null হতে পারে
}

// --- শুধুমাত্র এই ফাংশনটি আপডেট করা হয়েছে ---
async function getProductsAndCategories(
    category: string | null,
    first: number | null,
    after: string | null,
    last: number | null,
    before: string | null
) {
  const { data } = await client.query<QueryData>({
    query: gql`
      query GetProductsCursor(
        $category: String,
        $first: Int,
        $after: String,
        $last: Int,
        $before: String
      ) {
        products(
          where: { category: $category },
          first: $first,
          after: $after,
          last: $last,
          before: $before
        ) {
          nodes {
            id
            name
            slug
            image { sourceUrl }
            ... on SimpleProduct { price }
            ... on VariableProduct { price }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
        productCategories(first: 50) {
            nodes { id, name, slug }
        }
      }
    `,
    variables: { category, first, after, last, before },
    context: { fetchOptions: { next: { revalidate: 10 } } },
  });

  // --- মূল পরিবর্তন এখানে ---
  // যদি ডেটা না আসে বা প্রয়োজনীয় অংশগুলো না থাকে, তাহলে একটি খালি ফলাফল পাঠানো হচ্ছে
  if (!data) {
    return {
      products: [],
      categories: [],
      pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
    };
  }

  // এখন TypeScript জানে যে 'data' খালি নয়
  return {
    products: data.products?.nodes || [],
    categories: data.productCategories?.nodes || [],
    pageInfo: data.products?.pageInfo || { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null },
  };
}


export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : null;
  const after = typeof searchParams.after === 'string' ? searchParams.after : null;
  const before = typeof searchParams.before === 'string' ? searchParams.before : null;

  const { products, categories, pageInfo } = await getProductsAndCategories(
    category,
    before ? null : PRODUCTS_PER_PAGE,
    after,
    before ? PRODUCTS_PER_PAGE : null,
    before
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Our Exclusive Collection</h1>
        <p>Explore our curated selection of high-quality products. Find exactly what you are looking for.</p>
      </header>

      <main className={styles.mainContent}>
        <aside className={styles.filtersContainer}>
          <ProductFilters categories={categories} />
        </aside>

        <div className={styles.productsGridContainer}>
          {products.length > 0 ? (
            <div className={styles.grid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p>No products found for this category.</p>
          )}

          <PaginationControls pageInfo={pageInfo} />
        </div>
      </main>
    </div>
  );
}