import Image from "next/image";

export default function ServicesSteps() {

    const serviceStepsData = [
        {
            id: 1,
            alt:"Customer entering service details online",
            title: "Step 1",
            heading: "Enter your details via our quick and easy form above",
            image: '/images/HowItWorks/Step1Img.webp',
            width: 601,
            height: 356
        },
        {
            id: 2,
            alt:"Customer reviewing multiple quotes",
            title: "Step 2",
            heading: "Receive up to 5 quotes from local leading suppliers",
            image: '/images/HowItWorks/Step2Img.webp',
            width: 601,
            height: 356
        },
        {
            id: 3,
            alt:"Customer comparing quotes to save money",
            title: "Step 3",
            heading: "Compare your quotes and enjoy great savings - fast",
            image: '/images/HowItWorks/Step3Img.webp',
            width: 601,
            height: 356
        },
    ];
    return (
        <section className="flex flex-col items-center px-[20px] lg:px-[88px] mb-[30px]">
            {serviceStepsData.map((step, index) => (
                <article
                    key={step.id}
                    className={`flex justify-center w-full gap-[20px] lg:gap-[50px] max-[786px]:flex-col max-[786px]:[&:nth-child(odd)]:flex-col-reverse ${index % 2 === 0 ? "mt-[0]" : "my-[50px] lg:my-[70px]"}`}
                >
                    {index % 2 === 0 ? (
                        <>
                            {/* Image */}
                            <div className="relative flex items-center justify-center flex-1">
                                <Image
                                    src={step.image}
                                    alt={step.alt}
                                    width={step.width}
                                    height={step.height}
                                    loading="lazy"
                                    className="w-full h-full object-cover rounded-[20px]"
                                />

                                {index === 0 && (
                                    <p className="absolute font-[Arial] text-white font-bold text-[12px] md:text-[16px] lg:text-[16px] xl:text-[20px] leading-[18px] -translate-x-1/2 bg-[#00AFE3] px-4 py-3 rounded-[3px] whitespace-nowrap max-[1220px]:px-3 max-[1220px]:py-2 max-[1080px]:px-[10px] max-[1080px]:py-2 top-[30%] md:top-[40%] lg:top-[30%] xl:top-[36%] left-[75%] md:left-[80%] lg:left-[85%] xl:left-[83%]">
                                        Enter Your Requirements
                                        <span aria-hidden="true" className="absolute bottom-[-26px] left-[20%] -translate-x-1/2 w-0 h-0 border-[14px] border-solid border-t-[#00AFE3] border-x-transparent border-b-transparent"></span>
                                    </p>
                                )}
                            </div>

                            {/* Text */}
                            <div className="flex-1 max-[1220px]:pl-0">
                                <p className="relative inline-block font-[Arial] font-bold text-[#00AFE3] text-[18px] md:text-[16px] lg:text-[20px] mb-[3.04px] lg:after:block md:after:w-[0.88px] lg:after:h-[52.11px] lg:after:bg-[#D9D9D9] lg:after:mt-[5px] lg:after:h-[42.11px] lg:after:mt-[3px]">
                                    {step.title}
                                </p>

                                <h2 className="text-[30px] md:text-[35px] lg:text-[50px] leading-[30px]  md:leading-[35px] lg:leading-[55px] font-black text-black tracking-[-0.01em] md:tracking-[-0.03em] max-w-[460px] w-full max-[1020px]:max-w-full">
                                    {step.heading}
                                </h2>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Text */}
                            <div className="flex-1 lg:pl-[10%]">
                                <p className="relative inline-block font-[Arial] font-bold text-[#00AFE3] text-[18px] md:text-[16px] lg:text-[20px] mb-[3.04px] lg:after:block md:after:w-[0.88px] lg:after:h-[52.11px] lg:after:bg-[#D9D9D9] lg:after:mt-[5px] lg:after:h-[42.11px] lg:after:mt-[3px]">
                                    {step.title}
                                </p>

                                <h2 className="text-[30px] md:text-[35px] lg:text-[50px] leading-[30px]  md:leading-[35px] lg:leading-[55px] font-black text-black tracking-[-0.01em] md:tracking-[-0.03em] max-w-[460px] w-full max-[1020px]:max-w-full">
                                    {step.heading}
                                </h2>
                            </div>

                            {/* Image */}
                            <div className="relative flex items-center justify-center flex-[1.25] max-[1220px]:flex-1">
                                <Image
                                    src={step.image}
                                    alt={step.alt}
                                    width={step.width}
                                    height={step.height}
                                    loading="lazy"
                                    className="w-full h-full object-cover rounded-[20px]"
                                />
                            </div>
                        </>
                    )}
                </article>
            ))}
        </section>
    );
};
