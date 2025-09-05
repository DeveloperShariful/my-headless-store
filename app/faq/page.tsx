import styles from './FaqPage.module.css';

// SEO এর জন্য সম্পূর্ণ JSON-LD ডেটা
const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question","name": "Why choose an electric balance bike over a pedal bike?","acceptedAnswer": {"@type": "Answer","text": "An electric balance bike teaches the most crucial skill—balance—but adds a low-speed throttle to build confidence and make riding incredibly fun, helping kids learn faster."}},
    {"@type": "Question","name": "How do I choose the right size bike for my child?","acceptedAnswer": {"@type": "Answer","text": "The best measure is inseam. Your child should be able to sit on the seat with their feet flat on the ground. Check our product pages for detailed size guides."}},
    {"@type": "Question","name": "What is the weight limit for GoBikes?","acceptedAnswer": {"@type": "Answer","text": "Our bikes are built tough! Please refer to the specific product page for the exact weight limit of each model."}},
    {"@type": "Question","name": "Do you assemble the bikes?","acceptedAnswer": {"@type": "Answer","text": "GoBikes are delivered 80% pre-assembled. Attaching the handlebar and front wheel takes about 15 minutes. A basic toolkit is provided."}},
    {"@type": "Question","name": "How long will my GoBike battery last?","acceptedAnswer": {"@type": "Answer","text": "The GoBike battery provides up to 75 minutes of riding time on a single full charge."}},
    {"@type": "Question","name": "How long does it take to charge?","acceptedAnswer": {"@type": "Answer","text": "A full charge takes approximately 60 minutes."}},
    {"@type": "Question","name": "Can I use a power tool battery with my GoBike?","acceptedAnswer": {"@type": "Answer","text": "No. For safety and warranty, you must only use the genuine GoBike battery. Using unauthorised batteries is done at your own risk."}},
    {"@type": "Question","name": "Does the bike come with a charger?","acceptedAnswer": {"@type": "Answer","text": "Yes, every GoBike comes with its own specific, high-quality battery charger included in the box."}},
    {"@type": "Question","name": "How can I ensure my kids are riding safely?","acceptedAnswer": {"@type": "Answer","text": "We recommend ALWAYS using a helmet and closed-toe shoes. It is crucial to supervise young riders and check local helmet safety laws."}},
    {"@type": "Question","name": "Can the bike be ridden in wet conditions?","acceptedAnswer": {"@type": "Answer","text": "GoBikes are not 100% waterproof. Occasional puddles are fine if the bike is thoroughly cleaned and dried afterwards."}},
    {"@type": "Question","name": "Can I attach training wheels?","acceptedAnswer": {"@type": "Answer","text": "GoBikes are designed as balance bikes, so training wheels are not needed or recommended."}},
    {"@type": "Question","name": "Are electric bikes legal for kids in Australia?","acceptedAnswer": {"@type": "Answer","text": "Yes. Our bikes are classed as power-assisted pedal cycles with low power, making them legal for kids on private property."}},
    {"@type": "Question","name": "Can my kids race on GoBikes?","acceptedAnswer": {"@type": "Answer","text": "Absolutely! GoBikes are perfect for fun local club races and events."}},
    {"@type": "Question","name": "Why would I need suspension forks?","acceptedAnswer": {"@type": "Answer","text": "Suspension forks are a popular upgrade for kids on rougher terrain. They absorb bumps, providing better comfort and control."}},
    {"@type": "Question","name": "Where can I get spare parts?","acceptedAnswer": {"@type": "Answer","text": "We use standard parts for items like brakes and tyres, available at your local bike shop. For specific GoBike parts, contact us directly."}},
    {"@type": "Question","name": "How should I clean the bike?","acceptedAnswer": {"@type": "Answer","text": "Do not use a pressure washer. Remove the battery, then clean with a gentle hose and bucket."}},
    {"@type": "Question","name": "How do I make a warranty claim?","acceptedAnswer": {"@type": "Answer","text": "Our products adhere to the Australian Consumer Law. For claims, contact your original place of purchase with proof of purchase."}},
    {"@type": "Question","name": "Do you ship Australia-wide?","acceptedAnswer": {"@type": "Answer","text": "Yes! We offer fast shipping for our electric bikes all across Australia."}},
    {"@type": "Question","name": "Can I pick up my order locally?","acceptedAnswer": {"@type": "Answer","text": "Yes, local pickup is available in Camden, NSW."}},
    {"@type": "Question","name": "What is your return policy?","acceptedAnswer": {"@type": "Answer","text": "We offer a return policy on unused bikes in their original packaging. For full details, please visit our official Return Policy page."}}
  ]
};

export default function FaqPage() {
  return (
    <>
      <div className={styles.faqPageContainer}>
        
        <header className={styles.faqPageHeader}>
            <h1 className={styles.faqPageMainTitle}>GoBike FAQ | Australia&apos;s Top Questions Answered</h1>
            <p className={styles.faqPageIntro}>Welcome to the GoBike Help Centre! Here you&apos;ll find clear answers to all your questions about our <strong>kids electric bikes</strong>—from safety and sizing to battery life and delivery across Australia.</p>
        </header>
        
        <section className={styles.ourPromiseSection}>
            <div className={styles.promiseImageWrapper}>
               <img src="https://gobike.au/wp-content/uploads/2025/08/Gobike-kids-electric-bike-ebike-for-kids-4-scaled.webp" 
                     alt="A smiling Australian child with a helmet enjoying a GoBike electric bike in a park"
                     className={styles.promiseImage}
                     width="600"
                     height="400"
                />
            </div>
            <div className={styles.promiseContentWrapper}>
                <h2>The GoBike Promise</h2>
                <ul className={styles.promiseList}>
                    <li><span className={styles.promiseListIcon}>✔</span><strong>Safety First:</strong> Engineered with parental controls and durable materials for your peace of mind.</li>
                    <li><span className={styles.promiseListIcon}>✔</span><strong>Built for Fun:</strong> Lightweight, easy to handle, and designed to make learning to ride an exciting adventure.</li>
                    <li><span className={styles.promiseListIcon}>✔</span><strong>Quality That Lasts:</strong> We use high-quality components to ensure your GoBike can handle years of fun.</li>
                </ul>
            </div>
        </section>

        {/* ===== Category 1: About The Bikes & Sizing ===== */}
        <h2 className={styles.faqCategoryTitle}>About The Bikes & Sizing</h2>

        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>Why choose an electric balance bike over a pedal bike?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>An <strong>electric balance bike</strong> is the best of both worlds. It teaches the most crucial skill—balance—but adds a low-speed throttle to build confidence and make riding incredibly fun, helping kids learn faster.</p></div>
        </details>
        
        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>How do I choose the right size bike for my child?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>The best measure is inseam. Your child should be able to sit on the seat with their feet flat on the ground. Check our product pages or our dedicated <a href="https://www.evanscycles.com/help/bike-sizing-kids" target="_blank" rel="noopener noreferrer">Sizing Guide</a> for detailed charts.</p></div>
        </details>

        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>What is the weight limit for GoBikes?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>Our bikes are built tough! Please refer to the specific product page for the exact <strong>weight limit</strong> of each model, as it varies slightly between the GOBIKE 12 and GOBIKE 16.</p></div>
        </details>
        
        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>Do you assemble the bikes?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>GoBikes are delivered <strong>80% pre-assembled</strong>. Attaching the handlebar and front wheel takes about <strong>15 minutes</strong>. A <strong>basic toolkit is provided</strong> in the package to make it simple.</p></div>
        </details>

        {/* ===== Category 2: Battery & Charging ===== */}
        <h2 className={styles.faqCategoryTitle}>Battery & Charging</h2>

        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>How long will my GoBike battery last?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>The <strong>GoBike battery</strong> provides <strong>up to 75 minutes of riding time</strong> on a full charge. For expert tips on battery health, we recommend this official <a href="https://www.bosch-ebike.com/fileadmin/EBC/Service/Downloads/Akku_Guide/Akku_Guide/Bosch-eBike-Akkuguide-EN-GB.pdf" target="_blank" rel="noopener noreferrer">e-bike Battery Guide</a>.</p></div>
        </details>

        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>How long does it take to charge?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>A full <strong>charge takes approximately 60 minutes</strong>.</p></div>
        </details>
        
        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>Can I use a power tool battery with my GoBike?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>No. For safety and warranty, you must <strong>only use the genuine GoBike battery</strong>. Using unauthorised batteries is done entirely <strong>at your own risk</strong>.</p></div>
        </details>

        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>Does the bike come with a charger?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>Yes, every GoBike comes with its own specific, high-quality battery charger included in the box.</p></div>
        </details>

        {/* ===== Category 3: Riding & Safety ===== */}
        <h2 className={styles.faqCategoryTitle}>Riding & Safety</h2>
        
        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>How can I ensure my kids are riding safely?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>We recommend <strong>ALWAYS using a helmet</strong> and closed-toe shoes. For detailed state-specific rules, check the official <a href="https://www.transport.nsw.gov.au/roadsafety/bicycle-riders/ebikes" target="_blank" rel="noopener noreferrer">helmet safety laws</a>. Always supervise young riders.</p></div>
        </details>
            
        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>Can the bike be ridden in wet conditions?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>GoBikes are not 100% waterproof. Occasional puddles are fine if the bike is <strong>thoroughly cleaned and dried afterwards</strong>.</p></div>
        </details>

        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>Can I attach training wheels?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>GoBikes are designed as balance bikes, so <strong>training wheels are not needed or recommended</strong>. They learn to balance much faster without them.</p></div>
        </details>

        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>Are electric bikes legal for kids in Australia?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>Yes. Our bikes are classed as power-assisted pedal cycles with low power, making them legal for kids on private property. Public road laws vary by state.</p></div>
        </details>

        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>Can my kids race on GoBikes?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>Absolutely! GoBikes are perfect for fun local club races and events.</p></div>
        </details>

        {/* ===== Category 4: Maintenance, Parts & Warranty ===== */}
        <h2 className={styles.faqCategoryTitle}>Maintenance, Parts & Warranty</h2>
        
        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>Why would I need suspension forks?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p><strong>Suspension forks</strong> are a popular upgrade for kids on rougher terrain. They absorb bumps, providing better comfort and control.</p></div>
        </details>

        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>Where can I get spare parts?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>We use standard parts for items like brakes, grips, and tyres, which are available at your <strong>local bike shop</strong>. For specific GoBike parts, <a href="https://gobike.au/contact-us-ebike-expertin-australia-kids-electric-bike/">contact us</a> directly.</p></div>
        </details>
        
        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>How should I clean the bike?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>Please <strong>do not use a pressure washer</strong>. Remove the battery, then clean with a gentle hose and bucket.</p></div>
        </details>

        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>How do I make a warranty claim?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>Our products adhere to the <strong>Australian Consumer Law</strong>. For claims, contact your original place of purchase with proof of purchase. Read more on the official <a href="https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees" target="_blank" rel="noopener noreferrer">ACCC website</a>.</p></div>
        </details>

        {/* ===== Category 5: Purchase & Shipping ===== */}
        <h2 className={styles.faqCategoryTitle}>Purchase & Shipping</h2>

        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>Do you ship Australia-wide?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>Yes! We offer <strong>fast shipping for our electric bikes all across Australia</strong>.</p></div>
        </details>
        
        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>Can I pick up my order locally?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>Yes, <strong>local pickup is available in Camden, NSW</strong>. We plan to open more locations soon!</p></div>
        </details>

        <details className={styles.premiumFaqItem}>
            <summary className={styles.premiumFaqQuestion}><span>What is your return policy?</span><span className={styles.faqIcon}>&gt;</span></summary>
            <div className={styles.premiumFaqAnswer}><p>We offer a return policy on unused bikes in their original packaging. For full details, please visit our official <a href="https://gobike.au/privacy-policy-kids-ebike-electric-bike-kids-ages-2-16/" target="_blank" rel="noopener noreferrer">Return Policy page</a>.</p></div>
        </details>

        {/* Final Call to Action */}
        <div className={styles.faqCtaContainer}>
            <h3 className={styles.faqCtaTitle}>Still Have Questions?</h3>
            <a href="https://gobike.au/contact-us-ebike-expertin-australia-kids-electric-bike/" className={styles.faqCtaButton} target="_blank" rel="noopener noreferrer">Contact Our Friendly Team</a>
        </div>

      </div>

      {/* SEO এর জন্য JSON-LD স্ক্রিপ্ট */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
    </>
  );
}