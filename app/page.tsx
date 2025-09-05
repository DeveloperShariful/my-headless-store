// app/page.tsx
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './page.module.css'; // সঠিক CSS Module ফাইল ইম্পোর্ট করা হচ্ছে

// ====================================================================
// HeroSlider Component
// ====================================================================
const HeroSlider = () => {
  const totalSlides = 3;
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev % totalSlides) + 1);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const handleRadioChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className={styles.heroSliderSection}>
      <div className={styles.finalSplitSliderContainer}>
        <input type="radio" id="slide-radio-1" name="slider-radio" className="visually-hidden" checked={currentSlide === 1} onChange={() => handleRadioChange(1)} />
        <input type="radio" id="slide-radio-2" name="slider-radio" className="visually-hidden" checked={currentSlide === 2} onChange={() => handleRadioChange(2)} />
        <input type="radio" id="slide-radio-3" name="slider-radio" className="visually-hidden" checked={currentSlide === 3} onChange={() => handleRadioChange(3)} />

        <div className={styles.finalSplitSliderWrapper} style={{ transform: `translateX(-${(currentSlide - 1) * 100}%)` }}>
          <div className={styles.finalSplitSlide}>
            <div className={styles.finalSplitImageWrapper}><img className={styles.finalSplitImage} loading="eager" src="https://gobike.au/wp-content/uploads/2025/08/Gobike-electric-bike-kids-ebike20-inch-ages-for10-16-1-1.webp" alt="GoBike 20 Electric Bike for teens" /></div>
            <div className={styles.finalSplitContent}>
              <p className={styles.finalSlideSubtitle}>The Ultimate Weapon</p>
              <h2 className={styles.finalSlideTitle}>GOBIKE 20</h2>
              <p className={styles.finalSlideDescription}>The best 20-inch ebike of its kind. POWERFUL AND FUN. With a tough build, 10AH battery, and reliable performance, it's the ultimate weapon for young adventurers and teens.</p>
              <Link href="/product/20-inch-electric-bikes-for-sale-ebike-for-kids/" className={styles.finalSlideButton}>Shop Now</Link>
            </div>
          </div>
          <div className={styles.finalSplitSlide}>
              <div className={styles.finalSplitImageWrapper}><img className={styles.finalSplitImage} loading="lazy" src="https://gobike.au/wp-content/uploads/2025/08/Gobike-electric-bike-kids-ebike20-inch-ages-for10-16-2.webp" alt="GoBike 16 Electric Bike for kids" /></div>
              <div className={styles.finalSplitContent}>
                  <p className={styles.finalSlideSubtitle}>The All-Rounder</p>
                  <h2 className={styles.finalSlideTitle}>GOBIKE 16</h2>
                  <p className={styles.finalSlideDescription}>The fastest 16-inch Electric bike on the market! With 3 speed modes, hydraulic brakes, and front suspension, it's the perfect all-around childrens electric bikes for confident young riders.</p>
                  <Link href="/product/ebike-for-sale-16-inch-gobike-ages-5-9/" className={styles.finalSlideButton}>Shop Now</Link>
              </div>
          </div>
          <div className={styles.finalSplitSlide}>
              <div className={styles.finalSplitImageWrapper}><img className={styles.finalSplitImage} loading="lazy" src="https://gobike.au/wp-content/uploads/2025/08/Gobike-electric-bike-kids-ebike12-inch-ages-for-2-5-1.webp" alt="GoBike 12 Electric Bike for toddlers" /></div>
              <div className={styles.finalSplitContent}>
                  <p className={styles.finalSlideSubtitle}>The Everyday GoBike Range</p>
                  <h2 className={styles.finalSlideTitle}>GOBIKE 12</h2>
                  <p className={styles.finalSlideDescription}>The perfect bike for toddlers aged 2 years and above, transitioning from a Balance Bike! Extra slow learning mode. Easy to ride. Long ride time. Adjustable seat height. Lightweight and reliable!</p>
                  <Link href="/product/ebike-for-kids-12-inch-electric-bike-ages-2-5/" className={styles.finalSlideButton}>Shop Now</Link>
              </div>
          </div>
        </div>

        <div className={styles.finalSplitSliderNav}>
          <label htmlFor="slide-radio-1" className={styles.finalSplitSliderDot} aria-label="Go to slide 1"></label>
          <label htmlFor="slide-radio-2" className={styles.finalSplitSliderDot} aria-label="Go to slide 2"></label>
          <label htmlFor="slide-radio-3" className={styles.finalSplitSliderDot} aria-label="Go to slide 3"></label>
        </div>
      </div>
    </section>
  );
}

// ====================================================================
// TrustBadges Component
// ====================================================================
const ReturnIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-9 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3"/><path d="M21 12v3a2 2 0 0 1-2 2H5"/><path d="m16 5 3-3-3-3"/><path d="M3 10h13"/><path d="M12 21a9 9 0 0 0 9-9h-3"/><path d="m16 19 3 3-3 3"/></svg>;
const WarrantyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>;
const SecureIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const PerformanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6.5l.3-.3a1.5 1.5 0 0 1 2.4 2l-3.2 3.2-1.3-1.3a1.5 1.5 0 0 1 2-2.3zM8.5 10.5l-1.3-1.3a1.5 1.5 0 0 1 2-2.3l.3-.3a1.5 1.5 0 0 1 2.4 2l-3.2 3.2z"/><path d="M12 15.5l.3-.3a1.5 1.5 0 0 1 2.4 2l-3.2 3.2-1.3-1.3a1.5 1.5 0 0 1 2-2.3zM8.5 14.5l-1.3-1.3a1.5 1.5 0 0 1 2-2.3l.3-.3a1.5 1.5 0 0 1 2.4 2l-3.2 3.2z"/><path d="M15.5 12.5l-.3.3a1.5 1.5 0 0 1-2.4-2l3.2-3.2 1.3 1.3a1.5 1.5 0 0 1-2 2.3z"/><path d="M10.5 8.5l1.3 1.3a1.5 1.5 0 0 1-2 2.3l-.3.3a1.5 1.5 0 0 1-2.4-2l3.2-3.2z"/><path d="M19 12h-2"/><path d="M5 12H3"/></svg>;
const ShippingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16.5V8a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v2M18 16.5v-3.5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1.5M6 12v6h2l2-3-2-3H6"/><path d="M3 12h3"/><path d="M21 12h-3"/></svg>;
const SupportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6"/><path d="M22 11h-4"/></svg>;

const trustItems = [
    { icon: <ReturnIcon />, title: "Easy 30-Day Returns", description: "Not a perfect fit? No worries. We offer a 30-day money-back guarantee." },
    { icon: <WarrantyIcon />, title: "Full 1-Year Warranty", description: "Every GoBike kids electric bike is covered by a full one-year local warranty." },
    { icon: <SecureIcon />, title: "100% Secure Checkout", description: "Pay with confidence. We support all major payment methods including Afterpay." },
    { icon: <PerformanceIcon />, title: "Market-Leading Performance", description: "Experience the highest top speeds and best performance for value on any kids ebike." },
    { icon: <ShippingIcon />, title: "Fast Shipping Aus-Wide", description: "Get your GoBike delivered quickly to your doorstep, anywhere in Australia." },
    { icon: <SupportIcon />, title: "Expert Aussie Support", description: "Have a question? email us easily! gobike@gobike.au our local team is ready to help you." },
];

const TrustBadges = () => {
  return (
    <section className={styles.gobikeSection}>
      <div className={styles.container1500}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>The GoBike Promise: Australia's Best Kids Electric Bike</h2>
          <p className={styles.sectionSubtitle}>We're committed to providing an unmatched riding experience, backed by guarantees you can count on. Here’s why GoBike is the choice for Aussie families. Electric balance bike</p>
        </div>
        <div className={styles.finalTrustGrid}>
          {trustItems.map((item, index) => (
            <div className={styles.trustItem} key={index}>
              <div className={styles.trustIcon}>{item.icon}</div>
              <div>
                <h3 className={styles.trustTitle}>{item.title}</h3>
                <p className={styles.trustDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ====================================================================
// ProductCollection Component
// ====================================================================
const products = [
    { imgSrc: "https://gobike.au/wp-content/uploads/2025/02/Electric-Balance-Bike-Electric-bike-Balance-Bike-Bike-baby-bike-E-bike-1-1-scaled.webp", altText: "GoBike 12 Kids Electric Balance Bike with 3 speed modes", name: "GoBike 12-inch", feature: "Perfect for Ages 2-5 | Featuring a Slow Safety Mode for new riders.", link: "/product/ebike-for-kids-12-inch-electric-bike-ages-2-5/" },
    { imgSrc: "https://gobike.au/wp-content/uploads/2025/02/Electric-Balance-Bike-Electric-bike-Balance-Bike-Bike-baby-bikes-1-scaled.webp", altText: "GoBike 16 Kids Electric Bike with 3 speed modes", name: "GoBike 16-inch", feature: "Best for Ages 5-9 | With 3-Speed Modes, Dual Hydraulic Brakes and Front Suspension.", link: "/product/ebike-for-sale-16-inch-gobike-ages-5-9/" },
    { imgSrc: "https://gobike.au/wp-content/uploads/2025/02/Electric-Balance-Bike-Electric-bike-Balance-Bike-Bike-baby-bike-1-1-scaled.webp", altText: "GoBike 20 All-Terrain Kids Electric Bike", name: "GoBike 20-inch", feature: "Serious Bike for Ages 9-16 | A powerful and reliable bike for the bigger kids.", link: "/product/20-inch-electric-bikes-for-sale-ebike-for-kids/" }
];

const ProductCollection = () => {
  return (
    <section className={styles.productCollectionSection}>
      <div className={styles.productCollectionContainer}>
        <h2 className={styles.collectionTitle}>The GoBike Electric Bike Latest Collection</h2>
        <div className={styles.productGrid}>
          {products.map((product, index) => (
            <Link href={product.link} className={styles.productCard} key={index}>
              <div className={styles.productImageContainer}>
                <img loading="lazy" src={product.imgSrc} alt={product.altText} />
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productFeature}>{product.feature}</p>
                <div className={styles.productPrice}></div>
                <span className={styles.productButton}>View Details</span>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.viewAllButtonContainer}>
          <Link href="/shop" className={styles.btnPrimary}>View All Bikes</Link>
        </div>
      </div>
    </section>
  );
}

// ====================================================================
// OurStory Component
// ====================================================================
const OurStory = () => {
  return (
    <section className={styles.gobikeSection}>
      <div className={styles.container1500}>
        <div className={styles.originStoryGrid}>
          <div className={styles.originStoryImage}>
            <img loading="lazy" src="https://gobike.au/wp-content/uploads/2025/08/gobike-scaled-1.webp" alt="Two Australian dads with their kids and electric balance bikes, representing the founders of GoBike" />
          </div>
          <div className={styles.originStoryText}>
            <p className={styles.storyTagline}>Our Story</p>
            <h2 className={styles.storyTitle}>Founded by Two Dads, Fuelled by Fun GoBike</h2>
            <p className={styles.storyDescription}>Welcome to GoBike! We are a proud Australian brand, founded in 2023 by two mates in the Macarthur Region of NSW. Our journey began from a simple observation: seeing the pure joy on our kids' faces as they rode their first electric balance bikes.</p>
            <p className={styles.storyDescription}>That spark, motivated us to design an even better <strong>kids electric bike</strong> One that elevates their riding experience while giving parents total peace of mind. We are committed to being the <strong>best electric balance bike</strong> brand through top-tier performance, reliability and unbeatable customer service.</p>
            <div className={styles.stickerNotice}>
              <p><strong>A Splash of Fun:</strong> Every GoBike comes shipped with <strong>7 different colour sticker kits</strong>, so your child can customize their ride right out of the box!</p>
            </div>
            <Link href="/about" className={styles.storyButton}>Read More About GoBike</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ====================================================================
// SmarterChoice Component
// ====================================================================
const choices = [
    { image: "https://gobike.au/wp-content/uploads/2025/08/Gobike-kids-electric-bikes-electric-bike-for-kids-ebike-kids-electric-bike-Final-1.webp", label: "A child wearing a helmet, representing GoBike's commitment to safety", title: "Safety is Our Foundation", description: "From a gentle, slow-start mode for beginners to responsive, powerful brakes for confident riders, every detail is engineered to keep your child safe on their adventures." },
    { image: "https://gobike.au/wp-content/uploads/2025/02/Electric-Balance-Bike-Electric-bike-Balance-Bike-Bike-baby-bike-E-bike-Electric-bike-E-bike-review-Electric-bike-review-Buy-e-bike-Buy-electric-bike-E-bike-price-Electric-bike-price-E-b-scaled-2.webp", label: "A tough GoBike frame, representing durability", title: "Built for Real Kids", description: "Kids play hard. We get it. That's why GoBikes are built with durable, high-quality frames and components that can handle bumps, skids, and years of relentless fun.", height: "200px" },
    { image: "https://gobike.au/wp-content/uploads/2025/02/Electric-Balance-Bike-Electric-bike-Balance-Bike-Bike-baby-bike-E-bike-Electric-bike-E-bike-review-Electric-bike-review-Buy-e-bike-Buy-electric-bike-E-bike-price-Electric-bike-price-E-b-1-1-2.webp", label: "A GoBike battery, representing long ride times", title: "More Riding, Less Waiting", description: "Our high-efficiency batteries offer the longest run-times available, so the adventure doesn't have to stop. More time on the bike, less time plugged into the wall.", height: "200px" },
    { image: "https://gobike.au/wp-content/uploads/2025/02/Electric-Balance-Bike-Electric-bike-Balance-Bike-scaled-1.webp", label: "The Australian flag, representing Aussie ownership", title: "Aussie Owned & Supported", description: "We're not just a store, we're a team of Aussie parents right here to help. When you need support, you'll get real advice from people who actually use and love the product.", height: "200px" }
];

const SmarterChoice = () => {
  return (
    <section className={`${styles.gobikeSection} ${styles.smarterChoiceSection} ${styles.sectionFullWidthBreakout}`}>
      <div className={styles.container1500}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why GoBike is The Smarter Choice</h2>
          <p className={styles.sectionSubtitle} style={{ color: '#000' }}>When we couldn't find the best kids electric bike for our own kids, we decided to build it. Every GoBike is a promise of, durability, performance and pure FUN.</p>
        </div>
        <div className={styles.smarterChoiceGrid}>
          {choices.map((choice, index) => (
            <div className={styles.choiceCard} key={index}>
              <div className={styles.choiceCardImage} role="img" aria-label={choice.label} style={{ backgroundImage: `url('${choice.image}')`, height: choice.height ? choice.height : '260px' }}></div>
              <div className={styles.choiceCardContent}>
                <h3 className={styles.choiceCardTitle}>{choice.title}</h3>
                <p className={styles.choiceCardDescription}>{choice.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ====================================================================
// DifferenceSection Component
// ====================================================================
const comparisonData = [
    { feature: "Long Run Time", isGoBike: true, isOthers: false }, { feature: "High Speed / Performance", isGoBike: true, isOthers: false }, { feature: "Slow Learning Mode", isGoBike: true, isOthers: false }, { feature: "Affordability", isGoBike: true, isOthers: false }, { feature: "Most Reliable", isGoBike: true, isOthers: false }, { feature: "Easy Spare Parts", isGoBike: true, isOthers: false }, { feature: "Best Support And Service", isGoBike: true, isOthers: false },
];

const TickMark = () => <span className={styles.tickMarkPerfect}>✓</span>;
const CrossMark = () => <span className={styles.crossMarkPerfect}>✗</span>;

const DifferenceSection = () => {
  return (
    <section className={styles.gobikeSection} style={{ backgroundColor: '#000', color: '#fff' }}>
      <div style={{ maxWidth: '1450px', margin: '0 auto' }}>
        <div className={styles.perfectComparisonSection}>
          <div style={{ textAlign: 'left' }}>
            <h2 className={styles.sectionTitle} style={{ color: '#fff', textAlign: 'center' }}>The GoBike Difference</h2>
            <h3 className={styles.sectionSubtitle} style={{ color: '#fff', textAlign: 'center', fontWeight: 600 }}>Engineered Better. Built Stronger.</h3>
            <p style={{ fontSize: '17px', lineHeight: 1.7, marginBottom: '20px' }}>While others cut corners, we deliver what matters: the <strong>highest-performance and most reliable kids electric bike</strong> on the market, backed by a <strong>1-year advanced replacement warranty.</strong></p>
            <p style={{ fontSize: '17px', lineHeight: 1.7, marginBottom: '0px' }}>As a proud Aussie brand founded by two dads, we built the bikes we wanted for our own kids. That's the GoBike promise.</p>
          </div>
          <div>
            <table className={styles.perfectComparisonTable}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: 'transparent', borderColor: '#333' }}></th>
                  <th style={{ borderColor: '#333' }}><img src="https://gobike.au/wp-content/uploads/2025/06/GOBIKE-Electric-Bike-for-kids-1.webp" alt="GoBike Logo" style={{ maxHeight: '40px', display: 'inline-block' }} /></th>
                  <th style={{ color: '#000', borderColor: '#333' }}>Others</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.feature}</td>
                    <td className={styles.gobikeColPerfect}>{item.isGoBike ? <TickMark /> : <CrossMark />}</td>
                    <td>{item.isOthers ? <TickMark /> : <CrossMark />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// ====================================================================
// CommunitySection Component
// ====================================================================
const CommunitySection = () => {
  return (
    <section className={styles.gobikeSection} style={{ backgroundColor: '#f8f9fa' }}>
      <div style={{ maxWidth: '1450px', margin: '0 auto' }}>
        <div className={styles.finalCommunityGrid}>
          <div className={styles.communityImage}>
            <img loading="lazy" src="https://gobike.au/wp-content/uploads/2025/08/electric-bike-ebike-for-kids-1.webp" alt="A diverse group of happy kids and families, representing the GoBike community" />
          </div>
          <div className={styles.finalCommunityText}>
            <h2 className={styles.communityTitle}>More Than a Bike - It's The GoBike Family</h2>
            <p className={styles.communityDescription}>At GoBike, our passion is creating unforgettable riding experiences. We didn't just set out to sell another kids ebike, we aimed to design the <strong>best electric bike for kids</strong> in Australia, ensuring a fun-filled adventure for them and a stress-free experience for parents.</p>
            <p className={styles.communityDescription}>Every <strong>electric balance bike</strong> we create is a blend of fun, reliability, and safety. By choosing GoBike, you’re not just getting a top-quality <strong>kids electric motorbike</strong>; you’re joining a community that values adventure and family bonding.</p>
            <p className={styles.communityCtaText}>Create lasting memories and join the adventure today!</p>
            <Link href="/shop" className={styles.btnPrimary}>Join The Community</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ====================================================================
// VideoReviews Component
// ====================================================================
interface YouTubePlayerProps { youtubeId: string; thumbnailUrl: string; }

function YouTubePlayer({ youtubeId, thumbnailUrl }: YouTubePlayerProps) {
    'use client';
    const [showVideo, setShowVideo] = useState(false);

    if (showVideo) {
        return (
            <div className={styles.lazyYoutubeFacade} style={{ aspectRatio: '16/9' }}>
                <iframe src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        );
    }

    return (
        <div className={styles.lazyYoutubeFacade} onClick={() => setShowVideo(true)} style={{ aspectRatio: '16/9', backgroundImage: `url('${thumbnailUrl}')` }}>
            <div className={styles.playIcon}></div>
        </div>
    );
}

const VideoReviews = () => {
    return (
        <section className={`${styles.gobikeSection} ${styles.videoSection}`} style={{ backgroundColor: '#f8f9fa' }}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>See Why Parents & Kids Love The GoBike</h2>
                <p className={styles.sectionSubtitle} style={{ color: '#1a1a1a' }}>From first rides to pro-level tricks, our video reviews showcase the real-world performance and unbeatable fun of our kids electric bikes. See them in action!</p>
            </div>
            <div className={styles.videoMainWrapper}>
                <YouTubePlayer youtubeId="Fl8jEUxS_LU" thumbnailUrl="https://i.ytimg.com/vi/Fl8jEUxS_LU/maxresdefault.jpg" />
                <div className={styles.videoCaption}>
                    <h3 className={styles.videoCaptionTitle}>Unboxing & First Ride: The GoBike 12 Experience</h3>
                    <p className={styles.videoCaptionDescription}>Watch how easy it is to assemble the GoBike 12 and see a 3-year-old's real-time reaction on his first-ever electric bike ride.</p>
                </div>
            </div>
            <div className={styles.videoGridWrapper}>
                <div className={styles.videoGrid}>
                    <div>
                        <YouTubePlayer youtubeId="BARebHNa3lY" thumbnailUrl="https://i.ytimg.com/vi/BARebHNa3lY/maxresdefault.jpg" />
                        <div className={styles.videoCaption}>
                            <h3 className={styles.videoCaptionTitle}>GoBike 16: From Parks to Trails</h3>
                            <p className={styles.videoCaptionDescription}>A deep-dive review showing the GoBike 16's versatility and power on different terrains.</p>
                        </div>
                    </div>
                    <div>
                        <YouTubePlayer youtubeId="CIevuTbyTlY" thumbnailUrl="https://i.ytimg.com/vi/CIevuTbyTlY/maxresdefault.jpg" />
                        <div className={styles.videoCaption}>
                            <h3 className={styles.videoCaptionTitle}>Parent's Guide: Choosing The Right GoBike</h3>
                            <p className={styles.videoCaptionDescription}>Confused between models? This helpful guide breaks down the features of each GoBike.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ====================================================================
// FaqSection Component
// ====================================================================
const faqs = [
    { question: "Are electric bikes safe for young children?", answer: "Absolutely! Our entire range of <strong>electric bikes for kids</strong> is designed with safety as the number one priority. They feature parental speed controls, sturdy yet lightweight frames, and reliable braking systems, making them the <strong>Perfect bike for toddlers</strong> and young kids to build confidence and master their balance safely." },
    { question: "How do I choose the best kids electric bike?", answer: "Finding the <strong>best kids electric bike</strong> comes down to your child's age, size, and confidence level. Key things to look for are the correct size (e.g., 12\" or 16\" wheels), adjustable speed settings, and great battery life. Our collection ticks all these boxes, making the choice simple for Aussie parents." },
    { question: "What's the difference between a kids e-bike and a kids motorbike?", answer: "While both offer powered fun, a <strong>kids ebike</strong> is essentially an electric-powered balance bike designed for learning. It's light and easy to handle. A traditional petrol <strong>Kids Motorbike</strong> is often heavier and more complex. Our e-bikes deliver the \"motorbike\" thrill with the safety and simplicity young riders need." },
    { question: "What age are these childrens electric bikes for?", answer: "Our <strong>childrens electric bikes</strong> cater for a wide age range, typically from toddlers as young as 2 up to 16 years old. The adjustable speed settings make this possible. It's the kind of versatile <strong>electric bike</strong> that truly grows with your child." },
    { question: "What's the speed and battery life like on an ebike for kids?", answer: "An <strong>ebike for kids</strong> is designed for safe fun, not racing. Most models feature two speed modes: a slow learning mode (around 8-10 km/h) and a faster mode (up to 18 km/h). The high-quality battery is built to last for hours of riding on a single charge." }
];

const FaqSection = () => {
  return (
    <section className={styles.gobikeSection}>
      <div className={styles.premiumFaqContainer}>
        <h2 className={styles.premiumFaqHeader}>Got Questions About Kids e-Bikes? We Have the Answers.</h2>
        <p className={styles.premiumFaqIntro}>Got questions about the <strong>best kids electric bike</strong>? We've answered the most common ones below to help you choose the perfect GoBike for your child in Australia.</p>
        
        {faqs.map((faq, index) => (
          <details className={styles.premiumFaqItem} key={index}>
            <summary className={styles.premiumFaqQuestion}>
              <span>{faq.question}</span>
              <span className={styles.faqIcon}>&gt;</span>
            </summary>
            <div className={styles.premiumFaqAnswer}>
              <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
            </div>
          </details>
        ))}
        
        <div className={styles.premiumFaqButtonContainer}>
          <Link href="/faq" className={styles.premiumFaqButton}>View All FAQs</Link>
        </div>
      </div>
    </section>
  );
}

// ====================================================================
// BlogSection Component
// ====================================================================
const blogPosts = [
    { link: "/blog/is-a-kids-electric-bike-worth-it-the-ultimate-2025-aussie-parents-guide/", imageSrc: "https://gobike.au/wp-content/uploads/2025/08/Gobike-kids-electric-bike-ebike-for-kids-2-scaled-1.webp", altText: "A child standing with a GoBike 14, representing the future of fun for kids electric balance bikes", badge: "Buyer's Guide", title: "Electric Bikes: The Future of Fun for Aussie Kids?", excerpt: "Is an electric balance bike the right choice for your child? We break down the benefits, from safety features to building confidence." },
    { link: "/blog/gobike-electric-balance-bike-revolutionizing-kids-outdoor-fun/", imageSrc: "https://gobike.au/wp-content/uploads/2025/08/Gobike-kids-electric-bike-ebike-for-kids-1-scaled-1.webp", altText: "A young child having outdoor fun on a GoBike electric balance bike, revolutionizing their playtime", badge: "Tips & Tricks", title: "Revolutionizing Kid's Outdoor Fun: The GoBike Guide", excerpt: "Discover how a GoBike can transform your child's outdoor playtime, encouraging adventure and developing crucial motor skills." },
    { link: "/blog/a-fun-and-eco-friendly-ride-for-the-whole-family/", imageSrc: "https://gobike.au/wp-content/uploads/2025/08/Gobike-kids-electric-bike-ebike-for-kids-5-scaled-1.webp", altText: "A child giving a thumbs up on a GoBike, an eco-friendly ride for all ages", badge: "Lifestyle", title: "A Fun and Eco-Friendly Ride for the Whole Family", excerpt: "Learn why electric bikes are a fantastic, eco-friendly way for kids and teens to stay active and explore their world." }
];

const BlogSection = () => {
  return (
    <section className={styles.seoBlogSection}>
      <div className={styles.container1500}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>GoBike Guides & Pro Tips with Latest Blog</h2>
          <p className={styles.sectionSubtitle} style={{ color: '#000' }}>From safety guides to choosing the right size, our blog is packed with expert advice to help you and your child get the most out of your ebike adventure.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {blogPosts.map((post, index) => (
            <Link href={post.link} className={styles.seoBlogCard} key={index}>
              <div className={styles.seoBlogImageWrapper}>
                <img loading="lazy" src={post.imageSrc} alt={post.altText} />
                <span className={styles.seoBlogBadge}>{post.badge}</span>
              </div>
              <div className={styles.seoBlogContent}>
                <h3 className={styles.seoBlogTitle}>{post.title}</h3>
                <p className={styles.seoBlogExcerpt}>{post.excerpt}</p>
                <span className={styles.seoBlogReadMore}>Read The Full Story »</span>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.viewAllButtonContainer}>
          <Link href="/blog" className={styles.btnPrimary}>View All Posts</Link>
        </div>
      </div>
    </section>
  );
}

// ====================================================================
// Main Home Page Component
// ====================================================================
export default function Home() {
  return (
    <main>
      <HeroSlider />
      <TrustBadges />
      <ProductCollection />
      <OurStory />
      <SmarterChoice />
      <DifferenceSection />
      <CommunitySection />
      <VideoReviews />
      <FaqSection />
      <BlogSection />
    </main>
  );
}