import React from "react";
import SellerFormCardWrappper from "./SellerFormCardWrappper";
import Input from "../UI/Inputs/Input";
import Button1 from "../UI/Typography/Button1";

function ServiceBusinessAddressStep({
  nextStep,
  prevStep,
  handleInputChange,
  formData,
  setFormData,
  setHasPopulatedFromCompany,
  addressValue,
}) {
  return (
    <SellerFormCardWrappper
      heading="Your business address"
      description="This will be used for tax & billing"
      maxWidth="max-w-[730px]"
    >
      <div className="flex flex-col gap-3 md:gap-5">
        <Input label="Street address" />
        <Input label="Building or House Name/Number" />
        <Input label="City" />
        <Input label="Country" />
        <Input label="Postcode" />
        <div className="flex justify-between mt-6">
          <Button1 variant="secondary" onClick={prevStep}>
            Back
          </Button1>
          <Button1 variant="primary" onClick={nextStep}>
            Next
          </Button1>
        </div>
      </div>
    </SellerFormCardWrappper>
  );
}

export default ServiceBusinessAddressStep;
