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
                    At Localists, we make it easy for local professionals and businesses like you to win more work. Every day, we connect thousands of service providers from builders and gardeners to accountants and business consultants, with high-quality clients who are ready to hire. At Localists, we make it easy for local professionals and businesses like you to win more work. Every day, we connect thousands of service providers from builders and gardeners to accountants and business consultants, with high-quality clients who are ready to hire.
                </p>
                <p>
                    When customers post a request, telling us exactly what they’re after and where they need it done. We match them with the right service provider in their area.
                </p>
                <p>
                   We don’t just take a vague request; we ask the right questions so you get proper, detailed leads that actually fit your skills.
                </p>
            </>
        ),
        images: [
            {
                src: "/images/HowItWorks/howitworkyouprofessionseller.webp",
                alt: "Professional working on a laptop",
                width: 840,
                height: 356,
                className: "w-full h-full  max-h-[356px]  object-cover rounded-[20px]"
            },
        ],
    },
    {
        id: 2,
        heading: "We match them with you",
        description: (
            <>
                <p>
                    When a request matches your services, customers can see your profile and reach out directly. You’ll also get the lead straight to your inbox, so you never miss a chance.
                </p>
                <p>
                    You only pay a small fee for each introduction, and in return, you’ll get the customer contact details (phone number and email), so you can make contact or provide a quote right away.
                </p>
            </>
        ),
        images: [
            {
                src: "/images/HowItWorks/howitworkdigitalmanseller.webp",
                alt: "Man checking job alerts on smartphone",
                width: 840,
                height: 356,
                className: "w-full h-full  max-h-[356px]  object-cover rounded-[20px]"
            },
        ],
    },
    {
        id: 3,
        heading: "You win the work and grow your business",
        description: (
            <p>
                We make it simple for you to win new work without the stress of marketing. We bring the opportunities to you - fresh, relevant, and local. The quicker you respond, the more work you’ll win. And we’ll be right here with support if you ever need it.
            </p>
        ),
        images: [
            {
                src: "/images/HowItWorks/howitworkwommenseller.webp",
                alt: "Woman working on laptop at desk",
                width: 840,
                height: 356,
                className: "w-full h-full max-h-[356px] object-cover rounded-[20px]"
            },
        ],
    },
    {
        id: 4,
        heading: "Why professionals love Localists",
        description: <p>When you join Localists as a seller you’ll get:</p>,
        points: [
            "High visibility profile that shows off your work and builds your reputation.",
            "Steady flow of quality leads that aren’t just clicks, but genuine customers looking to book your services.",
            "Full control over the jobs you accept.",
            "Friendly support from our customer success team whenever you need it.",
        ],
        images: [
            {
                src: "/images/HowItWorks/plumber.webp",
                alt: "Plumber fixing pipes under sink",
                width: 420,
                height: 420,
                className: "rounded-[20px] md:w-[354px] lg:w-[420px] lg:h-[420px]"
            },
            {
                src: "/images/HowItWorks/smileyman.webp",
                alt: "Service provider using laptop",
                width: 420,
                height: 420,
                className: "rounded-[20px] md:mt-[50px] xl:mt-[20px] md:w-[354px] lg:w-[420px] lg:h-[420px]"
            },
        ],
    },
];

/* ---------------- COMPONENT ---------------- */

export default function HowItWorksDetail() {
    return (
        <section className="flex flex-col items-center px-[20px] lg:px-[88px] pt-[50px] md:pt-[94px]">
            {serviceStepsData.map((step, index) => {
                const isEven = index % 2 === 0;

                return (
                    <article
                        key={step.id}
                        className={`flex flex-col flex-col-reverse lg:flex-row justify-center w-full gap-[20px] lg:gap-[50px] ${index % 2 === 0 ? "mt-[0]" : "my-[50px] lg:my-[70px]"} ${index % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
                    >
                        {/* Images */}
                        <StepImages images={step.images} grow={!isEven} />

                        {/* Content */}
                        <StepContent
                            heading={step.heading}
                            description={step.description}
                            points={step.points}
                            align={!isEven ? "right" : "left"}
                        />
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
            {
                images.length === 1 ?
                    <div className="flex-1">
                        <Image
                            src={images[0].src}
                            alt={images[0].alt}
                            width={images[0].width}
                            height={images[0].height}
                            loading="lazy"
                            quality={95}
                            sizes="(max-width: 768px) 50vw, 50vw"
                            className={`${images[0].className}`}
                        />
                    </div>
                    :
                    <div className="flex">
                        {images.map((img, index) => (
                            <div key={index} className={`${index > 0 ? "" : "hidden md:block lg:hidden xl:block"}`}>
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={img.width}
                                    height={img.height}
                                    loading="lazy"
                                    quality={95}
                                    sizes="(max-width: 768px) 50vw, 50vw"
                                    className={`${img.className}`}
                                />
                            </div>
                        ))}
                    </div>
            }
        </>
    );
};

const StepContent = ({ heading, description, points, align = "left" }) => {
    return (
        <div className={`flex-1 ${align === "right" ? "lg:pl-[0]" : ""}`}>
            <h2 className="text-[30px] md:text-[35px] lg:text-[50px] leading-[34px] md:leading-[38px] lg:leading-[55px] font-black text-black tracking-[-0.01em] md:tracking-[-0.03em] w-full max-[1020px]:max-w-full">
                {heading}
            </h2>

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
