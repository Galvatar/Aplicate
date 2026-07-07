import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.paddle.com https://va.vercel-scripts.com https://public.profitwell.com https://www.redditstatic.com;
  style-src 'self' 'unsafe-inline' https://cdn.paddle.com https://va.vercel-scripts.com;
  img-src 'self' blob: data: https://*.supabase.co https://alb.reddit.com;
  font-src 'self' data:;
  connect-src 'self' https://*.supabase.co http://localhost:54321 https://va.vercel-scripts.com ws://localhost:54321 https://api.paddle.com https://cdn.paddle.com https://alb.reddit.com https://pixel-config.reddit.com;
  frame-src 'self' https://checkout.paddle.com https://buy.paddle.com;
  frame-ancestors 'none';
  form-action 'self';
`;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Allows Google profile pictures
      },
    ],
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Prevents clickjacking
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          }
        ],
      },
    ]
  },
};

export default nextConfig;
