import { Suspense } from "react";

export const metadata = {
  title: "Join Localists for Professionals | Free Sign-Up",
  description:
    "Join Localists free as a professional. Get verified leads with no hidden fees. Pay only for the customers you want and keep all your earnings.",

  alternates: {
    canonical: "https://dev2.localistsbooster.com/en/gb/sellers-create",
    languages: {
      "en-GB": "https://dev2.localistsbooster.com/en/gb/sellers-create"
    },
  },

  openGraph: {
    title: "Join Localists for Professionals | Free Sign-Up",
    description:
      "Join Localists free as a professional. Get verified leads with no hidden fees. Pay only for the customers you want and keep all your earnings.",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Join Localists for Professionals | Free Sign-Up",
    description:
      "Join Localists free as a professional. Get verified leads with no hidden fees. Pay only for the customers you want and keep all your earnings.",
    url: "https://dev2.localistsbooster.com/en/gb/sellers-create",
    siteName: "Localists",
    type: "website",
  },
};


export default function LoginLayout({ children }) {
  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  );
}
