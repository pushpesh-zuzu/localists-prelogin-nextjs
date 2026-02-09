"use client";

import React, { useEffect, useState } from "react";
import SellerFormCardWrappper from "./SellerFormCardWrappper";
import Input from "../UI/Inputs/Input";
import InputLabel from "../UI/InputLabel/InputLabel";
import Button1 from "../UI/Typography/Button1";
import { useDispatch, useSelector } from "react-redux";
import {
  companyRegOptions,
  websiteOptions,
  newJobsOptions,
  companySizeOptions,
  salesTeamOptions,
  socialMediaOptions,
} from "./formData";
import {
  fetchCompanyDetails,
  clearCompanyData,
  setCompanyError,
} from "@/lib/store/companyJobSlice";
import { showToast } from "@/utils/toaster";

function ServiceDetailsStep({
  nextStep,
  prevStep,
  handleInputChange,
  formData = {},
  setFormData,
  errors = {},
  emailCheck,
  companyCheck,
  phoneCheck,
  companyValue,
  serviceName,
}) {
  const dispatch = useDispatch();
  const [hasCompanyReg, setHasCompanyReg] = useState(null);

  const handleCheck = () => {
    const hasCompanyReg = formData.company_reg_number.trim().length > 0;
    const hasCompanyName = formData.company_name.trim().length > 0;

    if (!formData.profile_name || formData.profile_name.trim() === "") {
      showToast("error", "Business Profile Name is required");
      return;
    }

    if (!emailCheck) {
      showToast("error", "Please Enter Correct Email");
      return;
    } else if (companyValue && companyCheck === false) {
      showToast("error", "Please Enter Correct Company Details");
    } else if (hasCompanyReg && !hasCompanyName) {
    }

    if (!formData.phone.startsWith("0")) {
      showToast("error", "Please enter phone number startwith '0'");
      errors.phone = "";
      return;
    } else if (formData.phone.startsWith("00")) {
      showToast("error", "Phone number should start with only one '0'");
      errors.phone = "";
      return;
    } else if (formData.phone.length < 11) {
      showToast("error", "Please enter 11 digit phone number.");
    } else if (!phoneCheck) {
      showToast("error", "Please Enter Correct Number");
    } else {
      nextStep();
    }
  };

  const companyData = useSelector((state) => state.companyLook?.companyData);
  const companyError = useSelector((state) => state.companyLook?.companyError);

  const handleToggleCompanyReg = (value) => {
    setHasCompanyReg(value);

    if (value === 0) {
      dispatch(
        setFormData({
          company_reg_number: "",
          company_name: "",
        })
      );
      setFormData((prev) => ({
        ...prev,
        company_reg_number: "",
        company_name: "",
      }));
      dispatch(clearCompanyData());
    }

    if (value === 1) {
      setFormData((prev) => ({
        ...prev,
        company_reg_number: "",
        company_name: "",
      }));

      dispatch(clearCompanyData());
    }
  };

  useEffect(() => {
    if (!formData.company_reg_number) {
      dispatch(
        setFormData({
          company_name: "",
        })
      );
      dispatch(clearCompanyData());
      return;
    }

    if (formData.company_reg_number.length === 8) {
      dispatch(fetchCompanyDetails(formData.company_reg_number));
    }
  }, [formData.company_reg_number]);

  useEffect(() => {
    if (companyError && formData.company_reg_number !== "") {
      showToast("error", companyError);
      dispatch(setFormData({ company_reg_number: "" }));
    }

    if (companyError) {
      dispatch(setCompanyError(null));
    }
  }, [companyError, formData.company_reg_number, dispatch]);

  useEffect(() => {
    if (companyData) {
      dispatch(
        setFormData({
          company_name: companyData?.company_name || "",
          company_address:
            companyData?.registered_office_address?.address_line_1 || "",
          company_city: companyData?.registered_office_address?.locality || "",
          company_postcode:
            companyData?.registered_office_address?.postal_code || "",
          company_country:
            companyData?.registered_office_address?.country || "",
        })
      );
    }
  }, [companyData, dispatch]);

  useEffect(() => {
    if (companyData?.company_name && hasCompanyReg === 1) {
      setFormData((prev) => ({
        ...prev,
        company_name: companyData.company_name || "",
      }));
    }
  }, [companyData, hasCompanyReg]);

  return (
    <SellerFormCardWrappper
      heading="Let’s get to know you a little better"
      description={`Just add the information below and you will be able to see ${serviceName?.replace(
        /-/g,
        " "
      )} leads for your business`}
      maxWidth="max-w-[700px]"
    >
      <div className="flex flex-col gap-3 md:gap-5">
        <Input
          label="Your name"
          name="name"
          value={formData.name || ""}
          onChange={handleInputChange}
          error={errors.name}
        />

        <Input
          label="Business Profile Name"
          name="profile_name"
          value={formData.profile_name || ""}
          onChange={handleInputChange}
          error={errors.profile_name}
        />

        <InputLabel label="Do you have a company registration number?">
          <div className="flex gap-2">
            {companyRegOptions.map((option) => (
              <Button1
                key={option.value}
                variant={
                  hasCompanyReg === option.value ? "primary2" : "outlined"
                }
                className="max-w-fit min-w-[70px]"
                onClick={() =>
                  // dispatch(setFormData({ company_reg_number: option.value }))
                  handleToggleCompanyReg(option.value)
                }
              >
                {option.label}
              </Button1>
            ))}
          </div>
        </InputLabel>
        {hasCompanyReg === 1 && (
          <>
            <Input
              label="Company registration number (Optional)"
              name="company_reg_number"
              value={formData.company_reg_number || ""}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/[^a-zA-Z0-9]/g, "")
                  .slice(0, 8);
                handleInputChange({
                  target: { name: "company_reg_number", value },
                });
              }}
            error={errors.company_reg_number && errors.company_reg_number}
            />

            <Input
              label="Company name"
              value={companyData?.company_name || ""}
              readOnly
            />
          </>
        )}

        <Input
          label="Email address"
          name="email"
          value={formData.email || ""}
          onChange={handleInputChange}
          error={errors.email}
        />

        <Input
          label="Phone number"
          name="phone"
          value={formData?.phone || ""}
          onChange={handleInputChange}
          error={errors?.phone}
          maxLength={11}
        />

        <InputLabel label="Does your company have a website?">
          <div className="flex gap-2">
            {websiteOptions.map((option) => (
              <Button1
                key={option.value}
                variant={
                  formData.is_company_website === option.value
                    ? "primary2"
                    : "outlined"
                }
                className="max-w-fit min-w-[70px]"
                onClick={() =>
                  dispatch(
                    setFormData({
                    is_company_website: option.value,
                    company_website: option.value === 1 ? "" : null,
                    })
                  )
                }
              >
                {option.label}
              </Button1>
            ))}
          </div>
        </InputLabel>

        {formData.is_company_website === 1 && (
          <Input
            name="company_website"
            placeholder="Website address (optional)"
                  value={
                    formData.company_website != 1
                      ? formData.company_website
                      : ""
                  }
                  onChange={(e) =>
                    dispatch(
                      setFormData({
                        company_website: e.target.value,
                      })
                    )
                  }
            error={errors.company_website}
          />
        )}

        <InputLabel label="What is the estimated number of new jobs per month you would like to help grow your business?">
          <div className="flex flex-wrap gap-2">
            {newJobsOptions.map((option) => (
              <Button1
                key={option}
                variant={formData.new_jobs === option ? "primary2" : "outlined"}
                className="max-w-fit min-w-[70px]"
                onClick={() => dispatch(setFormData({ new_jobs: option }))}
              >
                {option}
              </Button1>
            ))}
          </div>
        </InputLabel>

        <InputLabel label="Company size, employees">
          <div className="flex flex-wrap gap-2">
            {companySizeOptions.map((option) => (
              <Button1
                key={option}
                variant={
                  formData.company_size === option ? "primary2" : "outlined"
                }
                className="max-w-fit min-w-[70px]"
                onClick={() => dispatch(setFormData({ company_size: option }))}
              >
                {option}
              </Button1>
            ))}
          </div>
        </InputLabel>

        <InputLabel label="Does your company have a sales team?">
          <div className="flex gap-2">
            {salesTeamOptions.map((option) => (
              <Button1
                key={option.value}
                variant={
                  formData.company_sales_team === option.value
                    ? "primary2"
                    : "outlined"
                }
                className="max-w-fit min-w-[70px]"
                onClick={() =>
                  dispatch(
                    setFormData({
                      company_sales_team: option.value,
                    })
                  )
                }
              >
                {option.label}
              </Button1>
            ))}
          </div>
        </InputLabel>

        <InputLabel label="Does your company use social media?">
          <div className="flex gap-2">
            {socialMediaOptions.map((option) => (
              <Button1
                key={option.value}
                variant={
                  formData.social_media === option.value
                    ? "primary2"
                    : "outlined"
                }
                className="max-w-fit min-w-[70px]"
                onClick={() =>
                  dispatch(setFormData({ social_media: option.value }))
                }
              >
                {option.label}
              </Button1>
            ))}
          </div>
        </InputLabel>

        <div className="flex justify-between mt-6">
          <Button1 className="cursor-pointer" variant="secondary" onClick={prevStep}>
            Back
          </Button1>
          <Button1 variant="primary" onClick={handleCheck}>
            Next
          </Button1>
        </div>
      </div>
    </SellerFormCardWrappper>
  );
}

export default ServiceDetailsStep;
