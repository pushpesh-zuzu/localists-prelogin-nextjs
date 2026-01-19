import { Suspense } from "react";

export const metadata = {
    title: "Find Roof Installation & Replacement Experts Near You",
    description: "Find Roof Installation & Replacement Experts Near You",

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