import { Suspense } from "react";

export const metadata = {
    title: "Compare Free Quotes from Local Fencing Companies | Localists",
    description:
        "Get free quotes from top fencing companies. Compare local professionals, read reviews, and hire trusted experts – quick and hassle-free.",

    robots: {
        index: false,
        follow: false,
    },
};


export default function Layout({ children }) {
    return (
        <Suspense fallback={null}>
            {children}
        </Suspense>
    );
}