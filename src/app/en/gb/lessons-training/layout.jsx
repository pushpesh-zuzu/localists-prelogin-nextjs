import { Suspense } from "react";

export const metadata = {
    title: "Lessons & Training From Local Experts | Localists",
    description:
        "Develop a skill, and get lessons in anything from driving to academics with trusted local tutors and trainers. Get your free quote now!",

    robots: {
        index: false,
        follow: false,
    },

    alternates: {
        canonical: "https://dev2.localistsbooster.com/en/gb/lessons-training",
        languages: {
            "en-GB": "https://dev2.localistsbooster.com/en/gb/lessons-training"
        },
    },

    openGraph: {
        title: "Lessons & Training From Local Experts | Localists",
        description:
            "Develop a skill, and get lessons in anything from driving to academics with trusted local tutors and trainers. Get your free quote now!",
        url: "https://dev2.localistsbooster.com/en/gb/lessons-training",
        siteName: "Localists",
        type: "website",
        images: [
            {
                url: "https://dev2.localistsbooster.com/en/gb/component/level/banner/LessonsAndTraining.webp",
                width: 1200,
                height: 630,
                alt: "Home",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Lessons & Training From Local Experts | Localists",
        description:
            "Develop a skill, and get lessons in anything from driving to academics with trusted local tutors and trainers. Get your free quote now!",
    },
};


export default function LoginLayout({ children }) {
    return (
        <Suspense fallback={null}>
            {children}
        </Suspense>
    );
}
