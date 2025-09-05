// lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
    // আমরা uri এর পরিবর্তে link ব্যবহার করছি
    link: new HttpLink({
        uri: "https://shop.sharifulbuilds.com/graphql",
    }),
    cache: new InMemoryCache(),
});

export default client;