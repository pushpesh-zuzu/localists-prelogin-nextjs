import GetQuote from "../common/GetQuotes/GetQuote";
import H2 from "../UI/Typography/H2";
import Paragraph from "../UI/Typography/Paragraph";

export default function AveragePrice() {
  return (
    <div className="flex items-center justify-center lg:pb-[72px] pb-[30px] lg:pb-0 pt-2 md:pt-6 lg:pt-[47px] ">
      <div className="w-full max-w-[1000px]">
        <div
          className="w-full rounded-[30px] md:rounded-[25px]"
          style={{ backgroundColor: "#8BFFCF" }}
        >
          <div className="flex flex-col lg:flex-row lg:gap-6">
            {/* Left Section - H2 and GetQuote */}
            <div className="flex flex-col justify-between px-2.5  pt-[30px] lg:pl-[38px]  lg:pt-[54px] lg:pb-[52px] lg:min-w-[386px]">
              <H2 className="text-center min-[460px]:max-w-[80%] min-[460px]:mx-auto md:mx-0 md:max-w-full lg:text-left">
                Average cost of tree surgery UK
              </H2>

              <div className="hidden lg:flex mt-6 lg:mt-0 justify-center lg:justify-start">
                <GetQuote text=" Get a real quote" />
              </div>
            </div>

            {/* Right Section - Price Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-[14px] gap-y-5 lg:gap-x-5 px-[10px] min-[450px]:px-20 lg:px-0 pt-[23px] pb-[38px] lg:py-16 lg:pr-7">
              {/* Price Card 1 */}
              <div className="">
                <Paragraph
                  variant="VeryprimarySmall"
                  className="md:mx-auto max-w-[110px]  min-[360px]:max-w-[120px] min-[360px]:min-w-[120px] min-[450px]:text-center min-[450px]:mx-auto md:text-center md:max-w-[160px] lg:max-w-full text-left lg:text-center"
                >
                  For a small tree removal (under 25ft), the average cost is
                </Paragraph>
                <p className=" text-4xl lg:text-5xl tracking-[-0.03em] font-black text-left min-[450px]:text-left md:text-center lg:text-center text-[#253238] mt-7 md:mt-3 lg:mt-3">
                  £450
                </p>
              </div>

              {/* Price Card 2 */}
              <div className="">
                <Paragraph
                  variant="VeryprimarySmall"
                  className="tracking-[-0.03em]! md:mx-auto text-left min-[450px]:text-center min-[450px]:mx-auto  md:text-center lg:text-center max-w-[164px] md:max-w-[220px] lg:min-w-[264px]"
                >
                  For a medium stump removal under 15 inch diameter), the average cost is
                </Paragraph>
                <p className=" text-4xl lg:text-5xl tracking-[-0.03em] font-black text-left min-[450px]:text-left md:text-center text-[#253238] mt-3">
                  £215
                </p>
              </div>

              {/* Divider Line */}
              <div className="col-span-2 border-t-[3.84px] border-[#253237] my-0"></div>

              {/* Price Card 3 */}
              <div className="h-full">
                <Paragraph
                  variant="VeryprimarySmall"
                  className="md:mx-auto text-left min-[450px]:text-center min-[450px]:mx-auto md:text-center lg:text-center max-w-[142px] md:max-w-[220px]  lg:max-w-[90%]"
                >
                  Trimming or pruning a small tree (under 25ft) costs on average
                </Paragraph>
                <p className=" text-4xl lg:text-5xl tracking-[-0.03em] font-black text-left min-[450px]:text-left md:text-center text-[#253238] max-[336px]:mt-[12px] mt-6 md:mt-3 sm:mt-4">
                  £250
                </p>
              </div>

              {/* Price Card 4 */}
              <div className="">
                <Paragraph
                  variant="VeryprimarySmall"
                  className="md:mx-auto text-left min-[450px]:text-center min-[450px]:mx-auto md:text-center lg:text-center max-w-[150px] md:max-w-[220px] lg:min-w-[264px]"
                >
                  For medium stump grinding (under 15 inch in diameter), the average cost is
                </Paragraph>
                <p className=" text-4xl lg:text-5xl tracking-[-0.03em] font-black text-left min-[450px]:text-left md:text-center text-[#253238] mt-2.5 min-[331px]:mt-[18px] md:mt-3 mr-1 sm:mr-0">
                  £115
                </p>
              </div>
              <div className="flex lg:hidden col-span-2 mt-5 md:mt-2.5 lg:mt-0 md:mb-[5px] lg:mb-0 justify-center">
                <GetQuote text=" Get a real quote" />
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Text */}
        <div className="mt-2.5 text-left lg:text-left">
          <p
            className="text-[12px] leading-[12px]
        lg:text-[16px] lg:leading-[16px]
        lg:text-[20px] lg:leading-[24px] font-[Arial]  tracking-[0em]! font-normal lg:font-bold"
          >
            *costs are estimates only, to get a more specific estimate try our{" "}
            <a href="#" className="underline font-normal md:font-bold text-[#00AFE3]">
              Tree Surgery Calculator
            </a>
          </p>
        </div>
        
      </div>
    </div>
  );
}
