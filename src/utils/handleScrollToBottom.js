import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const handleScrollToBottom = () => {
  typeof window !== undefined &&
    window.scrollTo({ top: 0, behavior: "smooth" });
};

export function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}