import React from "react";
import Image from "next/image";

/* ---------------- DATA ---------------- */

const serviceStepsData = [
    {
        id: 1,
        heading: "Customers come to us with their need",
        description: (
            <>
                <p>
                    At Localists, we make it easy for local professionals and businesses like
                    you to win more work. Every day, we connect thousands of service providers
                    with high-quality clients who are ready to hire.
                </p>
                <p>
                    When customers post a request, we match them with the right service
                    provider in their area.
                </p>
                <p>
                    We ask the right questions so you get proper, detailed leads that actually
                    fit your skills.
                </p>
            </>
        ),
        images: [
            {
                src: "/images/HowItWorks/howitworkyouprofessionseller.webp",
                alt: "Customer submitting service request",
                width: 601,
                height: 356,
            },
        ],
    },
    {
        id: 2,
        heading: "We match them with you",
        description: (
            <>
                <p>
                    When a request matches your services, customers can see your profile and
                    reach out directly.
                </p>
                <p>
                    You only pay a small fee per introduction and receive full contact
                    details.
                </p>
            </>
        ),
        images: [
            {
                src: "/images/HowItWorks/howitworkdigitalmanseller.webp",
                alt: "Professional receiving leads",
                width: 601,
                height: 356,
            },
        ],
    },
    {
        id: 3,
        heading: "You win the work and grow your business",
        description: (
            <p>
                We bring the opportunities to you - fresh, relevant, and local. Respond
                quickly and win more work, with full support whenever you need it.
            </p>
        ),
        images: [
            {
                src: "/images/HowItWorks/howitworkwommenseller.webp",
                alt: "Professional growing business",
                width: 601,
                height: 356,
            },
        ],
    },
    {
        id: 4,
        heading: "Why professionals love localists",
        description: <p>When you join Localists as a seller you’ll get:</p>,
        points: [
            "High visibility profile that shows off your work and builds your reputation.",
            "Steady flow of quality leads from genuine customers.",
            "Full control over the jobs you accept.",
            "Friendly support from our customer success team.",
        ],
        images: [
            {
                src: "/images/HowItWorks/smileyman.webp",
                alt: "Why professionals love localists - Image 1",
                width: 601,
                height: 356,
                className: "xl:ml-[-45px] xl:mt-[20px]"
            },
            {
                src: "/images/HowItWorks/plumber.webp",
                alt: "Why professionals love localists - Image 2",
                width: 601,
                height: 356,
            },
        ],
    },
];

/* ---------------- COMPONENT ---------------- */

export default function HowItWorksDetail() {
    return (
        <section className="flex flex-col items-center px-[20px] lg:px-[88px] pt-[94px]">
            {serviceStepsData.map((step, index) => {
                const isEven = index % 2 === 0;

                return (
                    <article
                        key={step.id}
                        className={`flex flex-col flex-col-reverse lg:flex-row justify-center w-full gap-[20px] lg:gap-[50px] ${index % 2 === 0 ? "mt-[0]" : "my-[50px] lg:my-[70px]"} ${index % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
                    >
                        {/* Images */}
                        <StepImages images={step.images} grow={!isEven} />
                        {/* <div className={`${isEven ? "order-1" : "order-2"}`}>
                            <StepImages images={step.images} grow={!isEven} />
                        </div> */}

                        {/* Content */}
                        {/* <div className={`${isEven ? "order-2" : "order-1"}`}> */}
                            <StepContent
                                heading={step.heading}
                                description={step.description}
                                points={step.points}
                                align={!isEven ? "right" : "left"}
                            />
                        {/* </div> */}
                    </article>
                );
            })}
        </section>
    );
}

/* ---------------- SUB COMPONENTS ---------------- */

const StepImages = ({ images, grow = false }) => {
    if (!Array.isArray(images) || images.length === 0) return null;

    return (
        <>
            {images.map((img, index) => (
                <div key={index} className={`flex-1 ${index > 0 ? "hidden xl:block" : ""}`}>
                    <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        // className="w-full h-full object-cover rounded-[20px]"
                        className={`w-full h-full object-cover rounded-[20px] ${img.className}`}
                    />
                </div>
            ))}
        </>

    );
};

const StepContent = ({ heading, description, points, align = "left" }) => {
    return (
        <div className={`flex-1 ${align === "right" ? "lg:pl-[10%]" : ""}`}>
            <h3 className="text-[24px] md:text-[22px] lg:text-[38px] leading-[26px] md:leading-[24px] lg:leading-[45px] font-black text-black tracking-[-0.01em] md:tracking-[-0.03em] max-w-[460px] w-full max-[1020px]:max-w-full">
                {heading}
            </h3>

            <div className="flex flex-col gap-y-[15px] font-[Arial] text-black text-[18px] md:text-[16px] lg:text-[20px] leading-[22px] md:leading-[16px] lg:leading-[24px] mt-[7px]">
                {description}
            </div>

            {Array.isArray(points) && points.length > 0 && (
                <ul className="list-disc pl-[22px] flex flex-col gap-y-[10px] mt-[20px]">
                    {points.map((point, i) => (
                        <li key={i} className="font-[Arial] text-black text-[18px] md:text-[16px] lg:text-[20px] leading-[22px] md:leading-[16px] lg:leading-[24px]">
                            {point}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
