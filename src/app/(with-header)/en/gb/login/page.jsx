import LoginForm from "@/app/component/common/Auth/LoginForm";

export const metadata = {
    title: "Localists Login | Access Your Account",
    description:
        "Log in to your Localists account to manage leads, connect with customers, and grow your business with trusted local opportunities.",


    robots: "noindex",
};

export default function LoginPage() {
    return <LoginForm passwordless={false} />;
}
