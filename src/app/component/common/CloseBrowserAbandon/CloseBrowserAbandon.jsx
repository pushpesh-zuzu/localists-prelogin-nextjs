"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { registerQuoteCustomer } from "@/lib/store/buyerslice/buyerSlice";
import useUserInfo from "@/utils/getUserIp";
import { extractAllParams } from "@/utils/decodeURLParams";
import { getBarkToken } from "@/utils/CookiesHelper";

const CloseBrowserAbandon = () => {
  if (typeof window === 'undefined') return null;
  
  const dispatch = useDispatch();
  const userToken = getBarkToken();
  const { buyerRequest, citySerach } = useSelector((state) => state.buyer);
  const searchParams = useSearchParams();
  
  const search = searchParams?.toString() ? `?${searchParams.toString()}` : "";
  const allParams = extractAllParams(search || window.location.search);
  
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

  const isMobile = useRef(false);
  
  const latestData = useRef({
    userToken,
    buyerRequest,
    citySerach,
  });

  useEffect(() => {
    latestData.current = { userToken, buyerRequest, citySerach };
  }, [userToken, buyerRequest, citySerach]);

  const hasSent = useRef(false);

  // Check if form has any data
  const hasFormData = () => {
    const { userToken, buyerRequest } = latestData.current;
    
    if (userToken) {
      return false;
    }

    // Check if any field has value
    const hasData = 
      (buyerRequest?.name?.trim()?.length > 0) ||
      (buyerRequest?.email?.trim()?.length > 0) ||
      (buyerRequest?.phone?.trim()?.length > 0) ||
      (buyerRequest?.postcode?.trim()?.length > 0) ||
      (buyerRequest?.questions && buyerRequest.questions.length > 0);

    return hasData;
  };

  const submitFormData = () => {
    const { userToken, buyerRequest, citySerach } = latestData.current;
    
    // Don't send if user is logged in
    if (userToken) {
      console.log("🔐 User logged in - skipping");
      return;
    }

    // Check if already sent in this close attempt
    if (hasSent.current) {
      console.log("⏭️ Already sent");
      return;
    }

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
      (!buyerRequest?.questions || buyerRequest.questions.length === 0);

    if (isEverythingEmpty) {
      console.log("🚫 Skipping API - all fields empty");
      return;
    }

    // Mark as sent for this close attempt
    hasSent.current = true;

    const formData = new FormData();
    formData.append("name", buyerRequest?.name || "");
    formData.append("email", buyerRequest?.email || "");
    formData.append("phone", buyerRequest?.phone || "");
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

    formData.append("entry_url", buyerRequest?.url || "");
    formData.append("user_ip_address", buyerRequest?.ip || "");
    formData.append("form_status", 0);

    console.log("📤 Sending incomplete form data");

    dispatch(registerQuoteCustomer(formData))
      .then(() => {
        console.log("✅ Data saved successfully");
        localStorage.removeItem("barkToken");
        localStorage.removeItem("barkUserToken");
        localStorage.removeItem("registerDataToken");
        localStorage.removeItem("registerTokens");
        localStorage.removeItem("createRequestToken");
      })
      .catch((error) => {
        console.error("❌ API Call failed:", error);
        // Reset on error so it can retry
        hasSent.current = false;
      });
  };

  useEffect(() => {
    // Detect device type
    isMobile.current = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    console.log(`🔵 Mounted - ${isMobile.current ? "Mobile 📱" : "Desktop 💻"}`);

    const handleBeforeUnload = (event) => {
      if (!hasFormData()) {
        console.log("🟢 No form data - allowing navigation without popup");
        return;
      }

      if (hasSent.current) return;
      
      console.log(`🚨 ${isMobile.current ? "Mobile" : "Desktop"} - beforeunload triggered`);
      submitFormData();
      
      event.preventDefault();
      event.returnValue = "";
    };

    // Mobile specific handlers
    const handlePageHide = (event) => {
      if (!hasFormData() || hasSent.current) return;
      console.log("📱 Mobile - pagehide triggered");
      submitFormData();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (!hasFormData() || hasSent.current) return;
        console.log("📱 Mobile - visibilitychange (hidden)");
        submitFormData();
      }
    };

    const handleBlur = () => {
      // Only for mobile, with slight delay to avoid false triggers
      if (!isMobile.current || !hasFormData() || hasSent.current) return;
      
      setTimeout(() => {
        if (document.hidden && !hasSent.current && hasFormData()) {
          console.log("📱 Mobile - blur triggered");
          submitFormData();
        }
      }, 100);
    };

    // Add all listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    
    if (isMobile.current) {
      window.addEventListener("pagehide", handlePageHide);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("blur", handleBlur);
    }

    // Cleanup
    return () => {
      // Reset hasSent when component unmounts (page actually changes/navigates)
      // This allows API to be called again if user comes back and closes again
      hasSent.current = false;
      
      window.removeEventListener("beforeunload", handleBeforeUnload);
      
      if (isMobile.current) {
        window.removeEventListener("pagehide", handlePageHide);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("blur", handleBlur);
      }
      
      console.log("🧹 Cleanup done");
    };
  }, []);

  return null;
};

export default CloseBrowserAbandon;