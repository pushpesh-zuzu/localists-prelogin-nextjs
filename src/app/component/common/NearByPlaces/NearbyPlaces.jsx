import NearmeH2Heading from "../../Nearme/NearmeH2Heading";
import Paragraph from "../../UI/Typography/Paragraph";
import WrapperBGWidth from "../WrapperBGWidth/WrapperBGWidth";

const vettedHeading1 = "Nearby";
const vettedHeading2 = "Places.";

export default function NearbyPlaces({
  background = "#f7f7f7",
  NearByPlacesData = [],
}) {
  return (
    <WrapperBGWidth background={background}>
      <div className="bg-[#f7f7f7]">
      <div className="px-[30px] md:px-16 pt-[30px] md:pt-[50px] lg:pl-16 xl:px-[120px] lg:pt-[72px]">
        <NearmeH2Heading
          headdingblue={vettedHeading1}
          headingblack={vettedHeading2}
        />

        <div className="mb-3.5 xl:mb-6" />

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-5 md:gap-x-6 xl:gap-x-[86px]">
          {NearByPlacesData.map(({ title, url }, index, arr) => {
            const totalItems = arr.length;
            const cols = 4;
            const mobileCols = 2;

            const isLastRowDesktop =
              index >= totalItems - (totalItems % cols || cols);

            const isLastRowMobile =
              index >= totalItems - (totalItems % mobileCols || mobileCols);

            const borderClasses = [
              "w-full py-4 md:py-5 xl:py-6",
              isLastRowMobile && arr.length > 2 ? "border-b-0" : "border-b border-[#D0F7EB]",
              isLastRowDesktop && arr.length > 4
                ? "md:border-b-0"
                : "md:border-b md:border-[#D0F7EB]",
            ].join(" ");

            return url ? (
              <Paragraph
                variant="secondary"
                className={`group ${borderClasses}`}
              >
                <a key={index} href={url} className="group-hover:text-[#00afe3] transition-colors duration-200 cursor-pointer">
                  <span >
                    {title}
                  </span>
                </a>
              </Paragraph>
            ) : (
              <div key={index} className={borderClasses}>
                <Paragraph variant="secondary">{title}</Paragraph>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </WrapperBGWidth>
  );
}
