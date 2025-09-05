// app/account/page.tsx
import Link from 'next/link';
import styles from './AccountPage.module.css';

export default function AccountPage() {
  return (
    <div className={styles.container}>
      <h1>My Account</h1>
      <p>Please login to your account or create a new one.</p>
      <div className={styles.buttonContainer}>
        <Link href="/login" className={styles.button}>
          Login
        </Link>
        <Link href="/register" className={styles.button}>
          Register
        </Link>
      </div>
    </div>
  );
}