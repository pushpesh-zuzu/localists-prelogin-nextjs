import GetQuote from "../common/GetQuotes/GetQuote";
import H2 from "../UI/Typography/H2";
import Paragraph from "../UI/Typography/Paragraph";

export default function AveratePrice({ key }) {
  return (
    <div
      key={key}
      className="flex items-center justify-center pb-[72px] pt-12 px-4 sm:px-6"
    >
      <div className="w-full max-w-[1000px]">
        <div
          className="w-full rounded-[25px]"
          style={{ backgroundColor: "#8BFFCF" }}
        >
          <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
            {/* Left Section - H2 and GetQuote */}
            <div className="flex flex-col justify-between pl-4 md:pl-9 py-8 md:py-14 md:min-w-[386px]">
              <H2 className="text-center md:text-left px-2">
                Average cost of tree surgery UK
              </H2>

              <div className="mt-6 md:mt-0 flex justify-center md:justify-start">
                <GetQuote text=" Get a real quote" />
              </div>
            </div>

            {/* Right Section - Price Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-x-5 px-4 md:px-0 py-8 md:py-16 md:pr-7">
              {/* Price Card 1 */}
              <div className="">
                <Paragraph
                  variant="secondary"
                  className="text-center md:text-left"
                >
                  For a small tree removal (under 25ft), the average cost is
                </Paragraph>
                <p className="text-4xl md:text-5xl tracking-[-0.03em] font-black text-center md:text-left text-[#253238] mt-3">
                  £450
                </p>
              </div>

              {/* Price Card 2 */}
              <div className="">
                <Paragraph
                  variant="secondary"
                  className="text-center md:text-left md:min-w-[264px]"
                >
                  For a medium stump removal (under 15 inch diameter), the
                  average cost is
                </Paragraph>
                <p className="text-4xl md:text-5xl tracking-[-0.03em] font-black text-center md:text-left text-[#253238] mt-3">
                  £215
                </p>
              </div>

              {/* Divider Line */}
              <div className="col-span-1 sm:col-span-2 border-t-[3.84px] border-[#66E6B1] my-5"></div>

              {/* Price Card 3 */}
              <div className="">
                <Paragraph
                  variant="secondary"
                  className="text-center md:text-left md:max-w-[90%]"
                >
                  Trimming or pruning a small tree (under 25ft) costs on average
                </Paragraph>
                <p className="text-4xl md:text-5xl tracking-[-0.03em] font-black text-center md:text-left text-[#253238] mt-3">
                  £250
                </p>
              </div>

              {/* Price Card 4 */}
              <div className="">
                <Paragraph
                  variant="secondary"
                  className="text-center md:text-left md:min-w-[264px]"
                >
                  For medium stump grinding (under 15 inch in diameter the
                  average cost is)
                </Paragraph>
                <p className="text-4xl md:text-5xl tracking-[-0.03em] font-black text-center md:text-left text-[#253238] mt-3">
                  £115
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Text */}
        <div className="mt-2.5 text-center md:text-left px-4">
          <Paragraph variant="secondary">
            *Costs are estimates only, to get a more specific estimate, try our{" "}
            <a href="#" className="underline font-semibold text-[#00AFE3]">
              Tree Surgery Calculator
            </a>
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
