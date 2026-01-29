"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getBarkToken, getCookie } from "@/utils/CookiesHelper";
import { useDispatch } from "react-redux";
import { setRequestId } from "@/lib/store/buyerslice/buyerSlice";

const STORAGE_KEY = "pendingBuyerModal";

const extractRouteFromUrl = (url) => {
  try {
    if (!url) return null;
    return new URL(url).pathname;
  } catch {
    return null;
  }
};

const normalizePath = (path = "") => path.replace(/\/+$/, "");

const usePendingBuyerRedirect = () => {
  console.log("called use pending");
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = getBarkToken();
    if (!token) return;

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    let pendingModal;
    try {
      pendingModal = JSON.parse(raw);
    } catch {
      return;
    }

    const storedUrl = pendingModal?.buyerRequest?.url;
    if (!storedUrl) return;

    const expectedPath = normalizePath(extractRouteFromUrl(storedUrl));
    const currentPath = normalizePath(pathname);

    if (expectedPath && currentPath !== expectedPath) {
      localStorage.removeItem("pendingBuyerModal");
      router.replace("/buyers/create");
    } else {
      const requestId = getCookie("requestId");
      dispatch(setRequestId(requestId));
    }
  }, [pathname, router]);
};

export default usePendingBuyerRedirect;
