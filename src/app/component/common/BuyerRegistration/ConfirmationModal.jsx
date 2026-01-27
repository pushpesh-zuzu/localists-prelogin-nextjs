"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import Modal from "../Modal";
import useUserInfo from "@/utils/getUserIp";
import { extractAllParams } from "@/utils/decodeURLParams";
import {
  clearSetbuyerRequestData,
  registerQuoteCustomer,
} from "@/lib/store/buyerslice/buyerSlice";
import { getBarkToken } from "@/utils/CookiesHelper";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
import Button1 from "../../UI/Typography/Button1";
import H3 from "../../UI/Typography/H3";
import Paragraph2 from "../../UI/Typography/Paragraph2";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  cancelHeading = "Are you sure that you want to leave?",
  cancelPara = `We're asking a few questions so we can find you the right pros, and send you quotes fast and free!`,
}) => {


  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const { buyerRequest, citySerach } = useSelector((state) => state.buyer);

  // Extract URL parameters
  const urlString = typeof window !== "undefined" ? window.location.search : "";
  const allParams = extractAllParams(urlString);
  const { ip, url } = useUserInfo();

  const campaignid = allParams.gad_campaignid || "";
  const keyword = allParams.keyword || "";
  const gclid = allParams.gclid || "";
  const campaign = allParams.utm_campaign || "";
  const adGroup = allParams.AgId || "";
  const targetID = allParams.utm_term || "";
  const msclickid = allParams.utm_msclkid || "";
  const utm_source = allParams.utm_source || "";

  // Handle body overflow
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!getBarkToken()) {
      setLoading(true);
      try {
        const updatedAnswers = buyerRequest?.questions || [];
        const formData = new FormData();

        formData.append("name", buyerRequest?.name || "");
        formData.append("email", buyerRequest?.email || "");
        formData.append("phone", buyerRequest?.phone || "");
        formData.append("questions", JSON.stringify(updatedAnswers));
        formData.append("service_id", buyerRequest?.service_id || "");
        formData.append("city", citySerach || "");
        formData.append("postcode", buyerRequest?.postcode || "");
        formData.append("campaignid", campaignid);
        formData.append("gclid", gclid);
        formData.append("campaign", campaign);
        formData.append("adgroup", adGroup);
        formData.append("targetid", targetID);
        formData.append("msclickid", msclickid);
        formData.append("utm_source", utm_source);
        formData.append("keyword", keyword);
        formData.append("entry_url", url);
        formData.append("user_ip_address", ip);
        formData.append("form_status", "0");

        const result = await dispatch(registerQuoteCustomer(formData));

        if (result?.payload?.success || result?.success) {
          // Clear local storage
          if (typeof window !== "undefined") {
            localStorage.removeItem("barkToken");
            localStorage.removeItem("barkUserToken");
            localStorage.removeItem("registerDataToken");
            localStorage.removeItem("registerTokens");
            localStorage.removeItem("createRequestToken");
          }

          // clearAuthData();
          dispatch(clearSetbuyerRequestData());
          dispatch(clearBuyerRegisterFormData());

          onConfirm?.();
        }
      } catch (error) {
        console.error("Error in confirmation modal:", error);
      } finally {
        setLoading(false);
      }
    } else {
      onConfirm?.();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-[656px]"
      maxHeight="max-h-auto"
      padding="p-0"
      showButtons={false}
      radius="rounded-[20px]"
    >
      <div className="bg-white w-full rounded-[20px] overflow-hidden px-6 py-9 text-center md:px-12 md:py-12">
        {/* Header */}
        <H3 className="mb-6 text-2xl font-bold text-[#253238] md:text-2xl">
          {cancelHeading}
        </H3>

        {/* Description */}
        <Paragraph2 className="mb-9 text-base font-medium text-[#253238]">{cancelPara}</Paragraph2>

        {/* Button Group */}
        <div className="flex justify-between gap-[12px] max-[480px]:flex-row">
          {/* Back Button */}
          <Button1
            variant="secondary"
            onClick={onClose}
            className="
                      bg-black text-white
                      text-[20px] max-[480px]:text-[14px]
                      px-[20.5px] py-[8px]
                      rounded-[3px] font-medium
                      shadow-sm hover:bg-[#000000cf]
                      disabled:opacity-50
                      cursor-pointer
                    "
          >
            Back
          </Button1>

          {/* Leave Button */}
          <Button1
            variant="primary"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#00ADD8] text-white
                      text-[20px] max-[480px]:text-[14px]
                      px-[9px] py-[8px]
                      min-w-[98px]
                      rounded-[3px] font-medium
                      hover:bg-[#0096c4]
                      disabled:opacity-50
                      cursor-pointer
                "
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                {/* Custom Spinner */}
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Leaving...</span>
              </span>
            ) : (
              "Leave"
            )}
          </Button1>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
