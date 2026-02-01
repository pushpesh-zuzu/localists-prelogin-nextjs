import { Suspense } from "react";

export const metadata = {
    title: "Lessons & Training From Local Experts | Localists",
    description:
        "Develop a skill, and get lessons in anything from driving to academics with trusted local tutors and trainers. Get your free quote now!",
};


export default function LoginLayout({ children }) {
    return (
        <Suspense fallback={null}>
            {children}
        </Suspense>
    );
}
