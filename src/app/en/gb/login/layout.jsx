import Footer from "@/app/component/Footer/Footer";
import { Suspense } from "react";



export const metadata = {
    title: "Localists Login | Access Your Account",
    description:
        "Log in to your Localists account to manage leads, connect with customers, and grow your business with trusted local opportunities.",


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
