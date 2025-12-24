import React from "react";
import SellerFormCardWrappper from "./SellerFormCardWrappper";
import Input from "../UI/Inputs/Input";
import InputLabel from "../UI/InputLabel/InputLabel";
import Button1 from "../UI/Typography/Button1";
import { useDispatch } from "react-redux";
import {
  companyRegOptions,
  websiteOptions,
  newJobsOptions,
  companySizeOptions,
  salesTeamOptions,
  socialMediaOptions,
} from "./formData";

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
}) {
  const dispatch = useDispatch();

  return (
    <SellerFormCardWrappper
      heading="Let’s get to know you a little better"
      description="Just add the information below and you will be able to see driveway installation leads for your business"
      maxWidth="max-w-[700px]"
    >
      <div className="flex flex-col gap-3 md:gap-5">
        <Input
          label="Your name"
          placeholder=""
          name="name"
          value={formData?.name || ""}
          onChange={handleInputChange}
          error={errors?.name}
        />

        <Input
          label="Business Profile Name"
          placeholder=""
          name="profile_name"
          value={formData?.profile_name || ""}
          onChange={handleInputChange}
          error={errors?.profile_name}
        />

        <InputLabel label="Do you have a company registration number?">
          <div className="flex gap-2">
            {companyRegOptions.map((option) => (
              <Button1 
              
                key={option.value}
                variant={
                  formData?.hasCompanyReg === option.value
                    ? "primary2"
                    : "outlined"
                }
                className="max-w-fit min-w-16"
                onClick={() =>
                  dispatch(setFormData({ hasCompanyReg: option.value }))
                }
              >
                {option.label}
              </Button1>
            ))}
          </div>
        </InputLabel>
        {formData?.hasCompanyReg === 1 && (
          <Input label="Company registration number(Optional)" />
        )}

        <Input
          label="Email address"
          name="email"
          value={formData?.email || ""}
          onChange={handleInputChange}
          error={errors?.email}
        />

        <Input
          label="Phone number"
          name="phone"
          value={formData?.phone || ""}
          onChange={handleInputChange}
          error={errors?.phone}
        />

        <InputLabel label="Does your company have a website?">
          <div className="flex gap-2">
            {websiteOptions.map((option) => (
              <Button1
                key={option.value}
                variant={
                  formData?.is_company_website === option.value
                    ? "primary2"
                    : "outlined"
                }
                className="max-w-fit"
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

        <InputLabel label="What is the estimated number of new jobs per month you would like to help grow your business?">
          <div className="flex flex-wrap gap-2">
            {newJobsOptions.map((option) => (
              <Button1
                key={option}
                variant={
                  formData?.new_jobs === option ? "primary2" : "outlined"
                }
                className="max-w-fit"
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
                  formData?.company_size === option ? "primary2" : "outlined"
                }
                className="max-w-fit"
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
                  formData?.company_sales_team === option.value
                    ? "primary2"
                    : "outlined"
                }
                className="max-w-fit"
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
                  formData?.social_media === option.value
                    ? "primary2"
                    : "outlined"
                }
                className="max-w-fit"
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

export default ServiceDetailsStep;
