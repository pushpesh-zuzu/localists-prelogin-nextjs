import { Suspense } from "react";

export const metadata = {
    title: "Hire Trusted Home Improvement Experts Near You | Get Free Quotes",
    description:
        "Hire trusted & experienced home improvement experts near you. Get free online quotes from local, verified professionals for your home projects.",

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