import { Suspense } from "react";

export const metadata = {
    title: "Compare Free Quotes from Local Driveway Companies | Localists",
    description:
        "Get free quotes from trusted local driveway companies. Compare prices, read reviews, and hire top-rated professionals near you – quick and simple.",

    robots: {
        index: false,
        follow: true,
    },
};


export default function Layout({ children }) {
    return (
        <Suspense fallback={null}>
            {children}
        </Suspense>
    );
}