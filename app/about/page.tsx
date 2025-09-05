import Link from 'next/link';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <div className={styles['about-us-page-wrapper']}>

      {/* Section 1: Main Header */}
      <div className={styles['section-container']}>
        <h1>Our Story: More Than Just a kids eBike</h1>
        <p className={styles['intro-text']}>
          Welcome to GoBike! We&apos;re not just another brand; we are a community born from a passion for adventure, family, and the pure joy of riding. Our journey began with a simple mission: to create the <strong><a href="https://gobike.au/" target="_blank" rel="noopener noreferrer">best kids electric bike</a></strong> in Australia.
        </p>
      </div>

      {/* Section 2: Our Story (with Image) */}
      <div className={styles['section-container']}>
        <div className={styles['story-grid']}>
          <div>
            {/* --- মূল পরিবর্তন এখানে --- */}
            <img 
              src="https://gobike.au/wp-content/uploads/2025/08/gobike-scaled.webp" 
              alt="The founders of GoBike, two Australian dads, with their kids and their electric balance bikes." 
              className={styles['story-image']}
              loading="eager"
              width="600"
              height="400"
            />
          </div>
          <div className={styles['story-content']}>
            <h2>Founded by Two Dads, Fuelled by Fun</h2>
            <p>
              As two mates from the Macarthur Region, NSW, our story started in our own backyards. We saw the excitement in our kids&apos; eyes as they rode their first bikes (shoutout to STACYC!). We became addicted to modifying them, making them faster, better, and more fun.
            </p>
            <p>
              This weekend hobby quickly grew into a passion. We realised we could build our own brand—one that blended thrilling performance with the safety every parent demands. In 2023, GoBike was born.
            </p>
          </div>
        </div>
      </div>
      
      {/* Section 3: Our Vision */}
      <div className={styles['section-container']}>
        <h2 className={styles['text-center']}>What We Envisioned</h2>
        <div className={styles['vision-grid']}>
          <div className={styles['vision-card']}>
            <h3>Adventure, Anywhere</h3>
            <p>Electric dirt bikes that kids could ride anytime, anywhere, building confidence with every lap.</p>
          </div>
          <div className={styles['vision-card']}>
            <h3>Performance & Affordability</h3>
            <p>A perfect blend of power and price, solving the problem of expensive or low-performance bikes in the Aussie market.</p>
          </div>
          <div className={styles['vision-card']}>
            <h3>Safety & Durability</h3>
            <p>Low-maintenance, reliable, and tough enough for inexperienced riders, making them a smarter choice than intimidating petrol bikes.</p>
          </div>
        </div>
      </div>

      {/* Section 4: Our Commitment (with Outbound Links) */}
      <div className={styles['section-container']}>
        <div className={styles['commitment-section']}>
          <h2>Our Commitment to Quality & Safety</h2>
          <p>
            We are proud to be part of Australia’s growing e-rider community. Every <strong>electric balance bike</strong> we deliver is backed by our commitment to the highest standards.
          </p>
          <ul>
            <li>✓ We follow the standards set by the <a href="https://www.bikeindustry.com.au/" target="_blank" rel="noopener noreferrer">Australian Bicycle Industry Association</a>.</li>
            <li>✓ We comply with <a href="https://www.productsafety.gov.au/product-safety-laws" target="_blank" rel="noopener noreferrer">ACCC Product Safety Guidelines</a>.</li>
            <li>✓ We align with sustainable transport goals promoted by the <a href="https://www.infrastructure.gov.au/" target="_blank" rel="noopener noreferrer">Australian Government</a>.</li>
          </ul>
        </div>
      </div>
      
      {/* Section 5: Why Choose GoBike? */}
      <div className={styles['section-container']}>
        <h2 className={styles['text-center']}>Why Choose GoBike?</h2>
        <div className={styles['vision-grid']}>
          <div className={styles['vision-card']}>
            <h3>Highest Performance</h3>
            <p>Our bikes are built to last, featuring powerful and reliable motors that deliver an unbeatable riding experience and the best performance in the market.</p>
          </div>
          <div className={styles['vision-card']}>
            <h3>1 Year Warranty</h3>
            <p>We stand by our quality. Every GoBike is backed by a 1-year advanced replacement warranty and unbeatable Aussie customer service.</p>
          </div>
          <div className={styles['vision-card']}>
            <h3>Join The Community</h3>
            <p>You’re not just getting a top-quality product; you’re joining a community that values adventure and family fun. See why families across Australia choose GoBike!</p>
          </div>
        </div>
      </div>
      
      {/* Section 6: Final Call to Action */}
      <div className={`${styles['section-container']} ${styles['text-center']}`}>
        <h2>Our Mission is to Power Adventure, Confidence, and Freedom—One Ride at a Time.</h2>
        <Link href="/products" className={styles['final-cta-button']}>
            Explore The Bikes
        </Link>
      </div>

    </div>
  );
}