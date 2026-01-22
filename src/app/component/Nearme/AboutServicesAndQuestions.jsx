import { handleScrollToBottom } from "@/utils/handleScrollToBottom";
import Paragraph from "../UI/Typography/Paragraph";
import H3 from "../UI/Typography/H3";
import NearmeH2Heading from "./NearmeH2Heading";
import Image from "next/image";
import PostCodeSection from "./AboutServicesAndQuestions/PostCodeSection";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import AveragePrice from "./AveragePrice";

const textBase =
  "font-[Arial] tracking-[-0.03em] text-[16px] leading-[20px] md:text-[16px] md:leading-[16px] lg:text-[20px] lg:leading-[24px]";

const AboutServicesAndQuestions = ({
  title,
  contentBlocks = [],
  buttonText,
}) => {
  const renderBlock = (block, index) => {
    switch (block.type) {
      case "h2":
        return (
          <NearmeH2Heading
            key={index}
            headdingblue={block.text}
            className="mb-5 md:mb-[25px] max-w-[90%] md:max-w-full"
          />
        );
      case "image":
        return (
          <div
            key={index}
            className={`relative w-full overflow-hidden ${
              block.className || ""
            }`}
          >
            <Image
              src={block?.src}
              alt={block?.alt || "Service Image"}
              width={block?.width || 1000}
              height={block?.height || 600}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className={`w-full h-auto object-cover rounded-lg ${
                block?.className
              } ${block?.marginTop ? "mt-[30px] lg:mt-[72px]" : ""} ${
                block?.marginBottom ? "mb-5 lg:mb-[70px]" : ""
              }`}
              priority={block?.priority || false}
            />
          </div>
        );
      case "AveratePriceSection":
        return <AveragePrice key={index} />;
      case "h3":
        return (
          <H3 key={index} className={`${textBase} font-bold mb-2 text-black`}>
            {block.text}
          </H3>
        );
      case "PostCodeSection":
        return <PostCodeSection key={index} />;

      case "p":
        return (
          <Paragraph
            variant="primarySmall"
            key={index}
            bold="font-normal"
            className={`${textBase} ${block?.notMarginBottom? "":"mb-[15px] md:mb-[25px]"} ${block?.className? block?.className:""} text-black`}
          >
            <span dangerouslySetInnerHTML={{ __html: block.text }} />
          </Paragraph>
        );

      case "pbold":
        return (
          <Paragraph
            variant="primarySmall"
            key={index}
            className={`${textBase} font-bold ${
              block?.className ? block?.className : "mb-[5px] md:mb-2.5"
            } text-[#253238]`}
          >
            {block.text}
          </Paragraph>
        );

      case "li":
        return (
          <ul key={index} className="mb-2.5 md:mb-[15px] list-disc pl-5 md:pl-8">
            <li className={textBase}>
              {block.heading}
              {block.text && (
                <span className="leading-[22px]" dangerouslySetInnerHTML={{ __html: block.text }} />
              )}
            </li>
          </ul>
        );

      case "libold":
        return (
         <ul key={index} className="mb-2.5 md:mb-[15px] list-disc pl-5 md:pl-8">
            <li className={`${textBase} font-bold`}>{block.heading}</li>
          </ul>
        );

      case "uili":
        return (
          <ul key={index} className="mb-2.5 md:mb-[15px] list-disc pl-5 md:pl-8">
            <li className={textBase}>
              <span className="font-bold">{block.heading}</span>{" "}
              <span dangerouslySetInnerHTML={{ __html: block.text }} />
            </li>
          </ul>
        );

      case "table":
        return (
          <div key={index} className="overflow-x-auto my-6">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  {block.tableHeaders.map((h, i) => (
                    <th key={i} className="border p-3 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rowData.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td
                        key={c}
                        className={`border p-3 ${c === 0 ? "font-bold" : ""}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="md:block px-2.5 py-5 sm:px-10 md:px-16 md:py-10 xl:px-[120px] pt-10 xl:pt-[72px] xl:pb-[72px]">
    <WrapperBGWidth>
      <div className="container max-w-[1000px] mx-auto  ">
        {contentBlocks.map(renderBlock)}

        {title && (
          <button
            onClick={handleScrollToBottom}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
          >
            {buttonText || "Get Quotes Now"}
          </button>
        )}
      </div>
    </WrapperBGWidth>
    </div>
  );
};

export default AboutServicesAndQuestions;
