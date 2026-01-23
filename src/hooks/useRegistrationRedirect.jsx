"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBarkToken, getRegisterTokens } from "@/utils/CookiesHelper";

const useRegistrationRedirect = () => {
  const router = useRouter();


  useEffect(() => {
    if (typeof window === "undefined") return;

    const userToken = getBarkToken();
    const registerToken = getRegisterTokens();

    // 🚨 User logged out → cleanup stale PPC data
    if (!userToken && !registerToken) {
      localStorage.removeItem("pendingBuyerModal");
      localStorage.removeItem("isRegistrationComplete");
      return;
    }

    // ✅ Logged in → redirect
    if (userToken || registerToken) {
      router.replace("/buyers/create");
    }
  }, [router]);

};

export default useRegistrationRedirect;
