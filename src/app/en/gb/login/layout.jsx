import Footer from "@/app/component/Footer/Footer";
import { Suspense } from "react";



export const metadata = {
    robots: "noindex",
};

export default function LoginLayout({ children }) {
    return (
        <Suspense fallback={null}>
            {children}
            <Footer />
        </Suspense>
    );
}
