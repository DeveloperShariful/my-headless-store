// app/register/page.tsx
"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    toast.loading('Creating your account...');

    const registerMutation = `
      mutation RegisterUser($username: String!, $email: String!, $password: String!) {
        registerUser(input: {
          username: $username,
          email: $email,
          password: $password
        }) {
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
          query: registerMutation,
          variables: { username, email, password }
        })
      });

      const result = await response.json();
      toast.dismiss();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      if (result.data.registerUser.user) {
        toast.success('Account created successfully! Please log in.');
        // ভবিষ্যতে এখানে সরাসরি লগইন করিয়ে দেওয়া হবে বা লগইন পেজে পাঠানো হবে
      }

    } catch (err: any) {
      toast.dismiss();
      toast.error(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Create an Account</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}