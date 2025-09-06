import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// সরাসরি createHttpLink ব্যবহার করা হচ্ছে
const httpLink = createHttpLink({
  uri: "https://sharifulbuilds.com/graphql",
  // fetch ফাংশনটিকে ওভাররাইড করা হচ্ছে
  fetch: async (uri, options) => {
    // ১. অনুরোধ পাঠানোর আগে হেডার যোগ করা হচ্ছে
    const token = typeof window !== 'undefined' ? localStorage.getItem('woo-session') : null;
    if (token) {
      options.headers['woocommerce-session'] = `Session ${token}`;
    }

    // আসল fetch কল করা হচ্ছে
    const response = await fetch(uri, options);

    // ২. উত্তর পাওয়ার পর হেডার থেকে টোকেন সেভ করা হচ্ছে
    if (typeof window !== 'undefined') {
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