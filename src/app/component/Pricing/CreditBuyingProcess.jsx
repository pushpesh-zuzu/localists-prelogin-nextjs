import Image from "next/image";
import ChooseRightCreditIcon from "../../../../public/images/Pricing/ChooseRightCreditIcon.svg";
import CompletePurchaseIcon from "../../../../public/images/Pricing/CompletePurchaseIcon.svg";
import RedeemCreditsIcon from "../../../../public/images/Pricing/RedeemCreditsIcon.svg";
import H2 from "../UI/Typography/H2";

const CreditBuyingProcess = () => {
    const HowItWorksData = [
        {
            id: 1,
            title: "Choose Right Credits",
            image: ChooseRightCreditIcon,
            description:
                "Pick a credit pack that fits your business needs. Basic or premium, there’s an option for you.",
        },
        {
            id: 2,
            title: "Complete Purchase",
            image: CompletePurchaseIcon,
            description:
                "Buy credits quickly and safely using your preferred payment method.",
        },
        {
            id: 3,
            title: "Redeem Credits",
            image: RedeemCreditsIcon,
            description:
                "Spend credits to contact customers you’re interested in. Once unlocked, you’ll get their phone number and email so you can reach out directly.",
        },
    ];

    return (
        <section className="flex flex-col items-center justify-center gap-[40px] px-[5%] py-[40px] text-center max-[920px]:gap-[30px] max-[480px]:pt-[30px]">
            <H2 className="mb-[45px] md:mb-0">
                How to Access{" "}
                <H2 className="inline text-[#00AFE3]">Your Leads</H2>
            </H2>

            <div className="mt-[58px] flex gap-[20px] max-[920px]:mt-[52px] max-[768px]:mt-[45px] max-[667px]:mt-0 max-[667px]:flex-col max-[667px]:items-center max-[667px]:gap-[70px]">
                {HowItWorksData.map((item) => (
                    <div
                        key={item.id}
                        className="relative w-full max-w-[409px] bg-[#F9F9FA] rounded-[20px] px-[28px] pb-[28px] text-center max-[920px]:px-[20px] max-[920px]:pb-[20px] max-[667px]:w-[90%]"
                    >
                        <div className="mx-auto mt-[-58px] mb-[22px] flex h-[132px] w-[132px] items-center justify-center rounded-full bg-[#00AFE3] max-[920px]:mt-[-52px] max-[768px]:h-[102px] max-[768px]:w-[102px] max-[667px]:mt-[-50px] max-[667px]:h-[100px] max-[667px]:w-[100px]">
                            <Image
                                src={item.image}
                                alt={item.title}
                                className="h-[78px] w-[78px] max-[768px]:h-[48px] max-[768px]:w-[48px]"
                            />
                        </div>

                        <p className="font-[Arial]
        tracking-[-0.03em]
        leading-[29px] font-bold
        text-[#253238]
        text-[25px]       
        max-[768px]:text-[23px]
        max-[480px]:text-[20px]">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CreditBuyingProcess;
