"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const showToastWithLink = (
  type,
  message,
  redirectUrl,
  linkText,
  lastText = "",
  autoClose = true
) => {
  const options = {
    position: "top-right",
    autoClose: autoClose ? 3000 : 20000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
  };

  const ToastContent = () => {
    const router = useRouter();
    const [beforeText] = message.split(linkText);

    const handleNavigate = () => {
      // ✅ Close all active toasts
      toast.dismiss();

      // ✅ Remove beforeunload warning
      window.onbeforeunload = null;

      // ✅ Navigate
      router.replace(redirectUrl);
    };

    return (
      <div className="text-sm text-[#253238]">
        {beforeText}{" "}
        <button
          onClick={handleNavigate}
          className="text-[#00afe3] underline cursor-pointer font-semibold hover:opacity-80"
        >
          {linkText}
        </button>{" "}
        {lastText}
      </div>
    );
  };

  if (type === "success") toast.success(<ToastContent />, options);
  if (type === "error") toast.error(<ToastContent />, options);
  if (type === "info") toast.info(<ToastContent />, options);
  if (type === "warning") toast.warn(<ToastContent />, options);
};
