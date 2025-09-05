// app/products/page.tsx

import { gql } from '@apollo/client';
import client from '../../lib/apolloClient';
import styles from './products.module.css';
import ProductFilters from './ProductFilters';
import PaginationControls from './PaginationControls';
import ProductCard from './ProductCard'; // <-- ১. এই নতুন লাইনটি যোগ করা হয়েছে

const PRODUCTS_PER_PAGE = 12;

// --- এই অংশগুলো অপরিবর্তিত ---
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

interface QueryData {
  products: {
    nodes: Product[];
    pageInfo: PageInfo;
  };
  productCategories: {
    nodes: Category[];
  };
}

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

  return {
    products: data.products.nodes,
    categories: data.productCategories.nodes,
    pageInfo: data.products.pageInfo,
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
              {/* --- ২. এখানে আগের Link কম্পোনেন্টের বদলে ProductCard ব্যবহার করা হয়েছে --- */}
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