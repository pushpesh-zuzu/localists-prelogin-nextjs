import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const handleScrollToBottom = () => {
  typeof window !== undefined &&
    window.scrollTo({ top: 0, behavior: "smooth" });
};

export function useScrollToTop() {
  const pathname = usePathname();
// console.log('called use useScrollToTop')
  useEffect(() => {
    typeof window !== undefined &&
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
}