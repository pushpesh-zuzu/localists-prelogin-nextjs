import { Suspense } from "react";

export const metadata = {
    title: "Compare Free Quotes from Local Roofing Companies | Localists",
    description:
      "Get free quotes from top roofing companies. Compare local professionals, read reviews, and hire trusted experts – quick and hassle-free.",

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