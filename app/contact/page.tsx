import styles from './ContactPage.module.css';
import ContactForm from './ContactForm'; // নতুন ফর্ম কম্পোনেন্ট ইম্পোর্ট করুন

export default function ContactPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Get In Touch</h1>
        <p>
          Have questions about our bikes, need help with an order, or just want to say hello? 
          We&apos;d love to hear from you!
        </p>
      </header>

      <div className={styles.contactGrid}>
        {/* বাম দিকে যোগাযোগের তথ্য */}
        <div className={styles.contactInfo}>
          <h2>Contact Information</h2>
          <div className={styles.infoItem}>
            <strong>Customer Support</strong>
            <p>Our team is available to help you from Monday to Friday, 9am - 5pm AEST.</p>
          </div>
          <div className={styles.infoItem}>
            <strong>Email Us</strong>
            <p>support@mystore.com</p>
          </div>
          <div className={styles.infoItem}>
            <strong>Call Us</strong>
            <p>+123 456 7890</p>
          </div>
          <div className={styles.infoItem}>
            <strong>Address</strong>
            <p>123 E-commerce St, Web City, World</p>
          </div>
        </div>

        {/* ডান দিকে কন্টাক্ট ফর্ম */}
        <ContactForm />
      </div>
    </div>
  );
}