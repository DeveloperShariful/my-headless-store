// components/Footer.tsx
import styles from './Footer.module.css'; // এই ফাইলটিও আমরা তৈরি করব

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
      </div>
    </footer>
  );
}