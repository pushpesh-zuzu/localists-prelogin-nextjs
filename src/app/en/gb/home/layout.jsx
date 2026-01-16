import { Suspense } from "react";

export const metadata = {
    title: "Find Trusted Home & Garden Professionals Near Me - Localists",
    description:
        "Need help finding Home & Garden professionals, consultants, or expert local services near you? Get free quotes now at Localists. It's quick, easy & free.",

    robots: {
        index: false,
        follow: false,
    },

    alternates: {
        canonical: "https://dev2.localistsbooster.com/en/gb/home",
        languages: {
            "en-GB": "https://dev2.localistsbooster.com/en/gb/home"
        },
    },

    openGraph: {
        title: "Find Trusted Home & Garden Professionals Near Me - Localists",
        description:
            "Need help finding Home & Garden professionals, consultants, or expert local services near you? Get free quotes now at Localists. It's quick, easy & free.",
        url: "https://dev2.localistsbooster.com/en/gb/home",
        siteName: "Localists",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Find Trusted Home & Garden Professionals Near Me - Localists",
        description:
            "Need help finding Home & Garden professionals, consultants, or expert local services near you? Get free quotes now at Localists. It's quick, easy & free.",
    },
};


export default function LoginLayout({ children }) {
    return (
        <Suspense fallback={null}>
            {children}
        </Suspense>
    );
}
