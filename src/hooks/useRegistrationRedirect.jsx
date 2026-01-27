"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getBarkToken, getRegisterTokens } from "@/utils/CookiesHelper";
import { setBuyerStep } from "@/lib/store/buyerslice/buyerSlice";


const useRegistrationRedirect = () => {
  const router = useRouter();
  const dispatch = useDispatch(); // ✅ correct place



  useEffect(() => {
    if (typeof window === "undefined") return;

    const userToken = getBarkToken();
    const registerToken = getRegisterTokens();

    // 🚨 User logged out → FULL cleanup
    if (!userToken && !registerToken) {
      dispatch(setBuyerStep(1));
      return;
    }

    const isRegistrationComplete =
      localStorage.getItem("isRegistrationComplete");

    if (
      isRegistrationComplete === "true" &&
      userToken || registerToken
    ) {
      localStorage.setItem("isRegistrationComplete", "true");
      router.replace("/buyers/create");
    }
  }, [router, dispatch]);
};

export default useRegistrationRedirect;
