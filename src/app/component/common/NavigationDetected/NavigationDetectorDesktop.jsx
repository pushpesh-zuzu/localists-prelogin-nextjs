"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

import { extractAllParams } from "@/utils/decodeURLParams";
import { registerQuoteCustomer } from "@/lib/store/buyerslice/buyerSlice";
import useUserInfo from "@/utils/getUserIp";
import { getBarkToken } from "@/utils/CookiesHelper";



const NavigationDetectorDesktop = () => {
  const dispatch = useDispatch();
  const search = useSearchParams();
  const userToken = getBarkToken();

  const { buyerRequest, citySerach } = useSelector((state) => state.buyer);


 const allParams =
          typeof window !== "undefined" &&
          extractAllParams(search || window.location.search);

 const campaignid = allParams.campaign_id || "";
    const keyword = allParams.keyword || "";
    const gclid = allParams.gclid || "";
    const msclkid = allParams.msclkid || "";
    const adgroup_id = allParams.adgroup_id;
    const platform_source = allParams.source || "";
    const campaign = allParams.campaign || "";
    const adgroup = allParams.adgroup || "";
    const matchtype = allParams.matchtype || "";
    const device = allParams.device || "";
    const loc_physical_ms = allParams.loc_physical_ms || "";
    const utm_search_term = allParams.utm_search_term || "";


  const { ip, url } = useUserInfo();

  const latestData = useRef({
    userToken,
    buyerRequest,
    citySerach,
  });

  useEffect(() => {
    latestData.current = { userToken, buyerRequest, citySerach };
  }, [userToken, buyerRequest, citySerach]);

  const hasSent = useRef(false);

  const submitFormData = () => {
    const { userToken, buyerRequest, citySerach } = latestData.current;
    if (hasSent.current || userToken) return;

    hasSent.current = true;

    const updatedAnswers = Array.isArray(buyerRequest?.questions)
      ? buyerRequest.questions.filter(Boolean)
      : [];

    const hasQuestionNo = updatedAnswers.some(
      (q) => q && typeof q === "object" && "question_no" in q
    );

    const answersToSend = hasQuestionNo
      ? updatedAnswers.map((q) => {
          if (!q || typeof q !== "object") return q;
          const { question_no, ...rest } = q;
          return rest;
        })
      : updatedAnswers;

    const isEverythingEmpty =
      !buyerRequest?.name?.trim() &&
      !buyerRequest?.email?.trim() &&
      !buyerRequest?.phone?.trim() &&
      !buyerRequest?.postcode?.trim() &&
      buyerRequest.questions.length === 0;

    if (isEverythingEmpty) {
      console.log("🚫 Skipping API call - all fields are empty");
      return;
    }

    const formData = new FormData();
    formData.append("name", buyerRequest?.name);
    formData.append("email", buyerRequest?.email);
    formData.append("phone", buyerRequest?.phone);
    formData.append("questions", JSON.stringify(answersToSend));
    formData.append("service_id", buyerRequest?.service_id || "");
    formData.append("city", citySerach || "");
    formData.append("postcode", buyerRequest?.postcode || "");
    formData.append("campaignid", campaignid || "");
    formData.append("gclid", gclid || "");
    formData.append("campaign", campaign || "");
    formData.append("adgroup", adgroup || "");
    formData.append("msclickid", msclkid || "");
    formData.append("adgroup_id", adgroup_id || "");
    formData.append("matchtype", matchtype || "");
    formData.append("device", device || "");
    formData.append("loc_physical_ms", loc_physical_ms || "");
    formData.append("utm_search_term", utm_search_term || "");
    formData.append("platform_source", platform_source);
    formData.append("keyword", keyword || "");
    formData.append("entry_url", buyerRequest.url || url || "");
    formData.append("user_ip_address", buyerRequest.ip || ip || "");
    formData.append("form_status", 0);

    dispatch(registerQuoteCustomer(formData))
      .then(() => {
        localStorage.removeItem("barkToken");
        localStorage.removeItem("barkUserToken");
        localStorage.removeItem("registerDataToken");
        localStorage.removeItem("registerTokens");
        localStorage.removeItem("createRequestToken");
      })
      .catch((error) => {
        console.error("❌ API Call failed:", error);
      });
  };

  useEffect(() => {
    console.log("🔵 NavigationDetector mounted once");

    const handleBeforeUnload = (event) => {
      if (hasSent.current) return;
      submitFormData();
      hasSent.current = true;
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};

export default NavigationDetectorDesktop;
