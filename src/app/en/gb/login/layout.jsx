import Footer from "@/app/component/Footer/Footer";


export const metadata = {
    robots: "noindex",
};

export default function LoginLayout({ children }) {
    return (
        <main>
            {children}
            <Footer />
        </main>
    );
}
