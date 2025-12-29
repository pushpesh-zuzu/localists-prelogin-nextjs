import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();

  const companyData = useSelector((state) => state.companyLook?.companyData);

  useEffect(() => {
    const reg = formData.company_reg_number?.trim();

    if (
      reg?.length === 8 &&
      companyData?.company_name &&
      companyData?.registered_office_address
    ) {
      const newAddress = {};

      dispatch(setFormData(newAddress));
      dispatch(setHasPopulatedFromCompany(true));
    }
  }, [
    companyData,
    formData.company_reg_number,
    dispatch,
    setFormData,
    setHasPopulatedFromCompany,
  ]);

  return (
    <SellerFormCardWrappper
      heading="Your business address"
      description="This will be used for tax & billing"
      maxWidth="max-w-[730px]"
    >
      <div className="flex flex-col gap-3 md:gap-5">
        {/* ✅ Street address - addressValue prop se */}
        <Input
          label="Street address"
          name="address"
          value={addressValue}
          onChange={handleInputChange}
        />

        {/* ✅ Apartment */}
        <Input
          label="Building or House Name/Number"
          name="apartment"
          value={formData.apartment}
          onChange={handleInputChange}
        />

        {/* ✅ City */}
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />

        {/* ✅ Country */}
        <Input
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
        />

        {/* ✅ Postcode - special handling with fallback logic */}
        <Input
          label="Postcode"
          name="zipcode"
          placeholder="Postcode"
          value={
            formData.postcode ||
            (!formData.company_reg_number ? formData.zipcode_old : "") ||
            ""
          }
          onChange={(e) =>
            dispatch(
              setFormData({
                ...formData,
                zipcode: e.target.value,
              })
            )
          }
          style={{
            appearance: "textfield",
            MozAppearance: "textfield",
            WebkitAppearance: "none",
          }}
        />

        {/* ✅ Buttons */}
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
