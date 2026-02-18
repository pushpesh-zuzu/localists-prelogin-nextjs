import { Inter } from "next/font/google";
import NoscriptTags from "./component/common/TrackingScripts/NoscriptTags";
import TrackingScripts from "./component/common/TrackingScripts/TrackingScripts";
// import Header from "./component/Header/Header";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { ToastProvider } from "@/utils/toaster";
import CookieConsent from "./component/common/CookieConsent/CookieConsent";
import SEO from "./component/common/seo/SEO";
// import { headers } from "next/headers";

export async function generateMetadata() {

  const isProductionDomain =
    process.env.NEXT_PUBLIC_CANNONICAL_SITE_URL === "localists.com" || false;

  return {
    // metadataBase: new URL(process.env.NEXT_PUBLIC_CANNONICAL_SITE_URL),
    title: "Localists.com: Find Trusted Local Services and Professionals",
    description:
      "Connect with verified local experts through Localists.com. Find trusted professionals, compare quotes, and hire the best for your project—quick, easy, and free.",
    icons: {
      icon: "/favicon.ico",
    },

    // alternates: {
    //   languages: {
    //     "en-GB": "/en/gb",
    //   },
    // },

    openGraph: {
      locale: "en_GB",
    },

    robots: {
      index: isProductionDomain,
      follow: isProductionDomain,
    },
  };
}


const inter = Inter({
  subsets: ["latin"],
  // variable: "--font-inter",
  display: "swap",   // allows instant text paint
});

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <TrackingScripts />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning
      >
        <StoreProvider>
          {/* <Header /> */}
          <NoscriptTags />
          {children}
          {/* <TrackingScripts /> */}
          {/* Global Cookie Consent */}
          <SEO />
          <CookieConsent />
          <ToastProvider />
        </StoreProvider>
      </body>
    </html>
  );
}
