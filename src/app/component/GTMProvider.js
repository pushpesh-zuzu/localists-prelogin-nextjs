"use client";

import { useEffect } from "react";
import { getGTM } from "@/lib/store/gtm";

export default function GTMProvider() {
  useEffect(() => {
    getGTM();
  }, []);

  return null;
}
