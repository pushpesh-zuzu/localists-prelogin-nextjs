'use client'

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function Conversion() {
  const router = useRouter();
  const { requestId } = useParams();

  useEffect(() => {
    if (!requestId) return;

    const timer = setTimeout(() => {
      router.replace(`/bids-list/${requestId}`);
    }, 1000);

    return () => clearTimeout(timer);
  }, [router, requestId]);

  return null;
}

export default Conversion;
