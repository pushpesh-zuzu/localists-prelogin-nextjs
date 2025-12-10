// next.config.mjs
import protectedRoutes from './src/utils/protectedRoutes.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Map all protected routes to localhost:3001
    const redirects = protectedRoutes.map(route => {
      // Remove leading slashes from route for consistency
      const cleanRoute = route.replace(/^\/+/, '');
      return {
        source: `/${cleanRoute}/:path*`,                // source must start with /
        destination: `http://localhost:3001/${cleanRoute}/:path*`, // destination with trailing slash
        permanent: false,
      };
    });

    return redirects;
  },

    compress: true,
    poweredByHeader: false,
    generateEtags: false,

    experimental: {
      optimizeCss: true,
    },

    images: {
      formats: ["image/avif", "image/webp"],
      deviceSizes: [320, 420, 768, 1024, 1200],
      imageSizes: [16, 32, 48, 64, 96],
    loader: "default",
    qualities: [75, 85, 90],
    minimumCacheTTL: 60,
    },

    compiler: {
      removeConsole: process.env.NODE_ENV === "production",
    },

  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

export default nextConfig;
