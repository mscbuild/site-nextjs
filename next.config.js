/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {   
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)", // применяет заголовки ко всем маршрутам
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline';
              img-src 'self' https://cdn.sanity.io data:;
              font-src 'self';
              connect-src 'self';
              frame-src 'none';
            `.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
