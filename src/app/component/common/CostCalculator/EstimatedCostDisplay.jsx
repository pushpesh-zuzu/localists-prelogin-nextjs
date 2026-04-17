import Button1 from "../../UI/Typography/Button1";
import Paragraph from "../../UI/Typography/Paragraph";

const EstimatedCostDisplay = ({
  isCalculated,
  estimatedCost,
  formatCurrency,
  isForModal = false,
}) =>
  !isForModal && isCalculated ? (
    <div className="mx-6 sm:mx-8 mb-6 sm:mb-8">
      {isCalculated ? (
        <div className="rounded-sm border border-[#00afe3] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-row gap-3">
            <Paragraph className="mb-1" bold="font-bold">
              Your estimated cost
            </Paragraph>
            <Paragraph
              className="text-[#00afe3] text-4xl sm:text-5xl font-extrabold"
              bold="font-extrabold"
            >
              {formatCurrency(estimatedCost)}
            </Paragraph>
            {/* <Paragraph className=" text-xs mt-1" bold="font-normal">Including labour & materials</Paragraph> */}
          </div>
          <Button1 variant="primary" className="whitespace-nowrap">
            Get a Custom Price
          </Button1>
        </div>
      ) : (
        <div className="rounded-sm border border-dashed border-[#ccc] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-row gap-3">
            <Paragraph className=" text-sm mb-1" bold="font-bold">
              Your estimated cost
            </Paragraph>
            <Paragraph className="" bold="font-bold">
              £—
            </Paragraph>
          </div>
          <Button1 variant="primary" className="whitespace-nowrap">
            Get a Custom Price
          </Button1>
        </div>
      )}
    </div>
  ) : (
    <div className="rounded-sm border border-[#00afe3] p-2 sm:p-6">
        <Paragraph className="mb-4" bold="font-bold block">
          Your estimated cost is
        </Paragraph>
      <div className="flex flex-row justify-between items-center">
        <Paragraph
          className="text-[#00afe3] text-4xl sm:text-5xl font-extrabold"
          bold="font-extrabold"
        >
          {formatCurrency(estimatedCost)}
        </Paragraph>
      <Button1 variant="primary" className="whitespace-nowrap">
        Get a Custom Price
      </Button1>
      </div>
    </div>
  );

export default EstimatedCostDisplay;
