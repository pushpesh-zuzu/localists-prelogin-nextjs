// import LoginForm from "@/app/component/common/Auth/LoginForm";
import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import dynamic from "next/dynamic";


const LoginForm = dynamic(
    () => import("@/app/component/common/Auth/LoginForm"),
    {
        loading: () => (
            <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                <LoaderIndicator size="large" />
            </div>
        ),
        ssr: true
    }
);

export const metadata = {
    title: "Localists Login | Access Your Account",
    description:
        "Log in to your Localists account to manage leads, connect with customers, and grow your business with trusted local opportunities.",

    robots: false,
};

export default function LoginPage() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/login"
                conversion={true}
            />
            <h1 className="hidden">Login</h1>
            <LoginForm passwordless={false} />
        </>
    );
}
