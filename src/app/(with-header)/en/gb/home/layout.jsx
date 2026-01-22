import { Suspense } from "react";

export const metadata = {
    title: "Find Trusted Home & Garden Professionals Near Me - Localists",
    description:
        "Need help finding Home & Garden professionals, consultants, or expert local services near you? Get free quotes now at Localists. It's quick, easy & free.",

    alternates: {
        // canonical: "https://dev2.localistsbooster.com/en/gb/home",
        languages: {
            "en-GB": "https://dev2.localistsbooster.com/en/gb/home"
        },
    },
};


export default function HomeLayout({ children }) {
    return (
        <Suspense fallback={null}>
            {children}
        </Suspense>
    );
}
