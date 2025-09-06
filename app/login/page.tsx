// app/login/page.tsx
"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from '../register/RegisterPage.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    toast.loading('Logging in...');

    // WooGraphQL-এর ডিফল্ট `login` Mutation ব্যবহার করা হচ্ছে
    const loginMutation = `
      mutation LoginUser($username: String!, $password: String!) {
        login(input: {
          username: $username,
          password: $password
        }) {
          authToken
          refreshToken
          user {
            id
            name
          }
        }
      }
    `;

    try {
      const response = await fetch("https://sharifulbuilds.com/graphql", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: loginMutation,
          variables: { username, password }
        })
      });

      const result = await response.json();
      toast.dismiss();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      const { authToken, user } = result.data.login;

      if (authToken) {
        toast.success(`Welcome back, ${user.name}!`);
        console.log("Auth Token:", authToken);
        console.log("User Data:", user);
      }

    } catch (err: any) {
      toast.dismiss();
      toast.error(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Login to Your Account</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}