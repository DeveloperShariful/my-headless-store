'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './ReviewForm.module.css';
import { FaStar } from 'react-icons/fa';

export default function ReviewForm({ productId }: { productId: number }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    setLoading(true);
    toast.loading('Submitting your review...');

    // WordPress-এর ডিফল্ট কমেন্ট এন্ডপয়েন্ট
    const endpoint = 'https://sharifulbuilds.com/wp-comments-post.php';

    // FormData তৈরি করা হচ্ছে
    const formData = new FormData();
    formData.append('author', name);
    formData.append('email', email);
    formData.append('comment', review);
    formData.append('rating', rating.toString());
    formData.append('comment_post_ID', productId.toString());
    // নিচের দুটি ফিল্ড স্প্যাম প্রতিরোধের জন্য প্রয়োজন হতে পারে
    formData.append('submit', 'Post Comment');
    formData.append('comment_parent', '0');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      toast.dismiss();
      
      // WordPress সাধারণত সফল হলে একটি রিডাইরেক্ট পাঠায়
      if (response.ok || response.status === 200 || response.redirected) {
        toast.success('Review submitted! It will be visible after approval.');
        setName(''); setEmail(''); setReview(''); setRating(0);
      } else {
        throw new Error('Failed to submit review. Server responded with an error.');
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <h4>Write a Review</h4>
      <p>Your email address will not be published. Required fields are marked *</p>
      
      <div className={styles.starRating}>
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input 
                type="radio" 
                name="rating" 
                value={ratingValue} 
                onClick={() => setRating(ratingValue)}
              />
              <FaStar 
                className={styles.star} 
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              />
            </label>
          );
        })}
      </div>
      
      <textarea value={review} onChange={e => setReview(e.target.value)} placeholder="Your review..." required />
      <div className={styles.formRow}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name *" required />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email *" required />
      </div>
      <button type="submit" className={styles.submitButton} disabled={loading}>{loading ? 'Submitting...' : 'Submit Review'}</button>
    </form>
  );
}