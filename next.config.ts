import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // --- শুধুমাত্র এই অংশটুকু যোগ করা হয়েছে ---
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // --- এই পর্যন্ত ---
};

export default nextConfig;