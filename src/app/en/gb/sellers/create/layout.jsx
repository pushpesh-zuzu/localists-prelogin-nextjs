import { Suspense } from "react";

export const metadata = {
  title: "Join Localists for Professionals | Free Sign-Up",
  description:
    "Join Localists free as a professional. Get verified leads with no hidden fees. Pay only for the customers you want and keep all your earnings.",

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
  },
};


export default function LoginLayout({ children }) {
    return (
        <Suspense fallback={null}>
            {children}
        </Suspense>
    );
}
