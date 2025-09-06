import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// সরাসরি createHttpLink ব্যবহার করা হচ্ছে
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://sharifulbuilds.com/graphql",
  // fetch ফাংশনটিকে ওভাররাইড করা হচ্ছে
  fetch: async (uri, options) => {
    // শুধুমাত্র ব্রাউজার পরিবেশেই localStorage ব্যবহার করা হবে
    if (typeof window !== 'undefined') {
      // ১. অনুরোধ পাঠানোর আগে হেডার যোগ করা হচ্ছে
      const token = localStorage.getItem('woo-session');
      if (token) {
        // options.headers এ হেডার যোগ করা হচ্ছে
        options.headers = {
          ...options.headers,
          'woocommerce-session': `Session ${token}`
        };
      }
    }

    // আসল fetch কল করা হচ্ছে
    const response = await fetch(uri, options);

    // শুধুমাত্র ব্রাউজার পরিবেশেই হেডার থেকে টোকেন সেভ করা হবে
    if (typeof window !== 'undefined') {
      // ২. উত্তর পাওয়ার পর হেডার থেকে টোকেন সেভ করা হচ্ছে
      const session = response.headers.get('woocommerce-session');
      if (session) {
        const newToken = session.split(';')[0].trim();
        if (newToken) {
          localStorage.setItem('woo-session', newToken);
        }
      }
    }

    return response;
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;