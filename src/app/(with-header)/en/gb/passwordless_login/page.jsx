import { Suspense } from "react";
import LoginForm from "@/app/component/common/Auth/LoginForm";

export const metadata = {
  title: "Localists Login | Access Your Account",
  description:
    "Log in to your Localists account to manage leads, connect with customers, and grow your business with trusted local opportunities.",


  robots: false,
};

export default function PasswordlessLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm passwordless />
    </Suspense>
  );
}
