import GetQuote from "../common/GetQuotes/GetQuote";
import H2 from "../UI/Typography/H2";
import Paragraph from "../UI/Typography/Paragraph";

export default function AveragePrice() {
  return (
    <div className="flex items-center justify-center lg:pb-[72px] pb-[30px] md:pb-0 pt-2 md:pt-[50px] ">
      <div className="w-full max-w-[1000px]">
        <div
          className="w-full rounded-[25px]"
          style={{ backgroundColor: "#8BFFCF" }}
        >
          <div className="flex flex-col lg:flex-row lg:gap-4">
            {/* Left Section - H2 and GetQuote */}
            <div className="flex flex-col justify-between px-4  pt-7 lg:pl-9  lg:py-14 lg:min-w-[386px]">
              <H2 className="text-center lg:text-left px-2">
                Average cost of tree surgery UK
              </H2>

              <div className="hidden md:flex mt-6 lg:mt-0 justify-center lg:justify-start">
                <GetQuote text=" Get a real quote" />
              </div>
            </div>

            {/* Right Section - Price Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-3 gap-y-5 lg:gap-x-5 px-3 lg:px-0 py-8 lg:py-16 lg:pr-7">
              {/* Price Card 1 */}
              <div className="">
                <Paragraph
                  variant="primarySmall"
                  className="max-w-[152px] lg:max-w-full text-left lg:text-center"
                >
                  For a small tree removal (under 25ft), the average cost is
                </Paragraph>
                <p className="text-4xl lg:text-5xl tracking-[-0.03em] font-black text-left lg:text-center text-[#253238] mt-8 lg:mt-3">
                  £450
                </p>
              </div>

              {/* Price Card 2 */}
              <div className="">
                <Paragraph
                  variant="primarySmall"
                  className="text-left lg:text-center max-w-[164px] lg:min-w-[264px]"
                >
                  For a medium stump removal under 15 inch diameter), the average cost is
                </Paragraph>
                <p className="text-4xl lg:text-5xl tracking-[-0.03em] font-black text-left lg:text-center text-[#253238] mt-3">
                  £215
                </p>
              </div>

              {/* Divider Line */}
              <div className="col-span-2 border-t-[3.84px] border-[#253237] my-0"></div>

              {/* Price Card 3 */}
              <div className="">
                <Paragraph
                  variant="primarySmall"
                  className="text-left lg:text-center max-w-[154px] lg:max-w-[90%]"
                >
                  Trimming or pruning a small tree (under 25ft) costs on average
                </Paragraph>
                <p className="text-4xl lg:text-5xl tracking-[-0.03em] font-black text-left lg:text-center text-[#253238] max-[336px]:mt-[22%] mt-[10%] sm:mt-4">
                  £250
                </p>
              </div>

              {/* Price Card 4 */}
              <div className="">
                <Paragraph
                  variant="primarySmall"
                  className="text-left lg:text-center max-w-[154px] lg:min-w-[264px]"
                >
                  For medium stump grinding (under 15 inch in diameter), the average cost is
                </Paragraph>
                <p className="text-4xl lg:text-5xl tracking-[-0.03em] font-black text-left lg:text-center text-[#253238] mt-3">
                  £115
                </p>
              </div>
              <div className="flex md:hidden col-span-2 mt-0 justify-center">
                <GetQuote text=" Get a real quote" />
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Text */}
        <div className="mt-2.5 text-left lg:text-left px-0 lg:px-4 ">
          <p
            className="text-[13.5px] leading-[18px]
        lg:text-[16px] lg:leading-[16px]
        lg:text-[20px] lg:leading-[24px] font-[Arial]  tracking-[-0.03em]font-normal lg:font-bold"
          >
            *costs are estimates only, to get a more specific estimate try our{" "}
            <a href="#" className="underline font-normal text-[#00AFE3]">
              Tree Surgery Calculator
            </a>
          </p>
        </div>
        
      </div>
    </div>
  );
}
