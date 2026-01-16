// next.config.mjs
import protectedRoutes from "./src/utils/protectedRoutes.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const ENV_COOKIE_DOMAIN =
      typeof process !== "undefined" &&
      process.env &&
      process.env.NEXT_PUBLIC_POST_LOGIN_URL
        ? process.env.NEXT_PUBLIC_POST_LOGIN_URL
        : null;
    // Map all protected routes to localhost:3001
    const redirects = protectedRoutes.map((route) => {
      // Remove leading slashes from route for consistency
      const cleanRoute = route.replace(/^\/+/, "");
      return {
        source: `/${cleanRoute}/:path*`, // source must start with /
        destination: `${ENV_COOKIE_DOMAIN}${cleanRoute}/:path*`, // destination with trailing slash
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
    optimizePackageImports: ["lucide-react", "date-fns"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    loader: "default",
    qualities: [50, 75, 85, 90],
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
