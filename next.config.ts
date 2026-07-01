import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // 'unsafe-inline' is required for Next.js inline bootstrap scripts and styled-jsx; 'unsafe-eval' only matters in dev
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://images.unsplash.com https://www.google-analytics.com https://*.googleapis.com https://*.gstatic.com https://maps.gstatic.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://*.googleapis.com",
  "frame-src 'self' https://www.google.com https://maps.google.com https://google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
