import Image from "next/image";
import creditsAtTheReady from "../../../../public/images/Pricing/creditsAtTheReadyImg.svg";
import youareincontrol from "../../../../public/images/Pricing/youAreInControlImg.svg";
import jobrelatedprice from "../../../../public/images/Pricing/jobRelatedPricesImg.svg";
import newbusiness from "../../../../public/images/Pricing/newBusinessImg.svg";
import Paragraph2 from "../UI/Typography/Paragraph2";

const cardData = [
  {
    title: "No commission. No hidden fees.",
    description:
      "We use a straightforward credit system. Buy a credit pack, and use your credits to connect with the customers you want. It's that easy.",
    linkText: "No commission, no hidden fees.",
    image: creditsAtTheReady,
  },
  {
    title: "You have total control",
    description:
      "When we send you leads, you decide which leads are worth it. Every lead shows its cost in credits upfront, so you know exactly what you’re spending.",
    image: youareincontrol,
  },
  {
    title: "Transparent pricing",
    description:
      "The credit cost of a lead depends on the service, the size of the job, and demand in your area, keeping things fair and flexible.",
    image: jobrelatedprice,
  },
  {
    title: "Our pricing promise",
    description:
      "We’re so confident you’ll win business with your first credit pack, we’ll return all your credits if you don’t. No questions asked.",
    image: newbusiness,
  },
];

const PricingCards = () => {
  return (
    <section className="flex flex-col gap-[85px] mt-[30px] md:mt-[40px] mb-[95px] max-[768px]:gap-[50px] max-[768px]:mb-[50px] max-[480px]:mb-[35px]">
      {cardData.map((card, index) => {
        const isReverse = (index + 1) % 2 === 0;

        return (
          <div
            key={index}
            className={`relative flex items-stretch justify-between ${
              isReverse ? "flex-row-reverse bg-[#F9F9FA]" : "bg-[#E9F9FF]"
            } max-[768px]:flex-col max-[768px]:text-center`}
          >
            <div className="flex flex-1 items-center justify-center">
              <Image
                src={card.image}
                alt={card.title}
                className={`
                  max-w-full object-contain
                  ${index === 0 ? "mt-[-70px] max-[768px]:mt-[-40px]" : ""}
                  ${index === 1 ? "mt-[-60px] max-[768px]:mt-[-30px]" : ""}
                  ${index === 2 ? "py-[35px]" : ""}
                  ${index === 3 ? "py-[38px]" : ""}
                  max-[768px]:max-w-[250px]
                `}
              />
            </div>

            <div className="relative mx-[2rem] w-[2px] max-[768px]:hidden">
              <span
                className={`absolute top-[64px] bottom-[64px] left-1/2 w-[2px] -translate-x-1/2 ${
                  index % 2 === 0 ? "bg-white" : "bg-[#ccc]"
                }`}
              />
            </div>

            <div className="flex flex-1 flex-col justify-center max-[768px]:items-center">
              <div
                className={`flex max-w-[440px] mt-[20px] md:mt-0 flex-col justify-center ml-[34px]
                ${index === 1 || index === 3 ? "ml-[100px]" : ""}
                max-[1060px]:ml-0 max-[1060px]:px-[30px] max-[1060px]:pb-[30px]
                max-[768px]:ml-0 max-[768px]:mb-[20px]`}
              >
                <h3 className="mb-[1rem] font-Inter font-black
        tracking-[-0.03em]
        text-[20px] leading-[22px]
        md:text-[20px] md:leading-[22px]
        lg:text-[20px] lg:leading-[24px] xl:text-[30px] xl:leading-[30px] whitespace-nowrap max-[480px]:whitespace-normal">
                  {card.title}
                </h3>

                <Paragraph2>
                  {card.description}
                  {card.linkText && (
                    <>
                      {" "}
                      <Paragraph2 className="inline font-bold !text-[#00AFE3]">
                        {card.linkText}
                      </Paragraph2>
                    </>
                  )}
                </Paragraph2>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default PricingCards;
