"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { showToast } from "@/utils";

export default function QueryToastHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status");
  const message = searchParams.get("message");

  useEffect(() => {
    if (message && status !== null) {
      const decodedMessage = decodeURIComponent(
        message.replace(/\+/g, " ")
      );

      if (status === "true") {
        showToast("success", decodedMessage);
      } else if (status === "false") {
        showToast("error", decodedMessage);
      }

      router.replace("/en/gb"); // replace ✔ better than push
    }
  }, [status, message, router]);

  return null;
}
