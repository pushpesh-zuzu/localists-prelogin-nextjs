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
    const isRegistrationComplete =
      localStorage.getItem("isRegistrationComplete");

    if (
      isRegistrationComplete === "true" &&
      (userToken || registerToken)
    ) {
      router.replace("/buyers/create");
    }
  }, [router]);
};

export default useRegistrationRedirect;
