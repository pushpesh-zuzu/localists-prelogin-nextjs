import { Suspense } from "react";

export const metadata = {
    title: "Compare Free Quotes from Local Landscapers | Localists",
    description:
        "Compare free quotes from trusted local landscapers in seconds. Submit your details and get matched with top-rated landscapers near you – quick, easy, and hassle-free!",

    robots: {
        index: false,
        follow: true,
    },

    alternates: {
        canonical: "https://dev2.localistsbooster.com/en/gb/new-ppc-landscaping",
    },
};


export default function Layout({ children }) {
    return (
        <Suspense fallback={null}>
            {children}
        </Suspense>
    );
}