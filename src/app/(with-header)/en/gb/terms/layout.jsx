import { Suspense } from "react";

export const metadata = {
    title: "Terms & Conditions | Localists.com",
    description:
        "Read the full Terms & Conditions for using Localists in the UK. Learn about user responsibilities, service professional rules, data policies, and legal guidelines.",
};

export default function LoginLayout({ children }) {
    return (
        <Suspense fallback={null}>
            {children}
        </Suspense>
    );
}
