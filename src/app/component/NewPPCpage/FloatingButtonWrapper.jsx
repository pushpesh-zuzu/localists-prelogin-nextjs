"use client";

import { useEffect, useRef, useState } from "react";
import FloatingButton from "@/app/component/UI/FloatingButton/FloatingButton";

export default function FloatingButtonWrapper({ children }) {
  const heroRef = useRef(null);
  const sectionsStartRef = useRef(null);
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    if (!heroRef.current || !sectionsStartRef.current) return;

    // Hero section observer
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        // If Hero is visible → hide button
        if (entry.isIntersecting) {
          setShowFloating(false);
        }
      },
      { threshold: 0.5 } // 50% hero visible
    );

    // Sections (How It Works / content start) observer
    const sectionsObserver = new IntersectionObserver(
      ([entry]) => {
        // If section is visible → show button
        if (entry.isIntersecting) {
          setShowFloating(true);
        }
      },
      { threshold: 0.35 }
    );

    heroObserver.observe(heroRef.current);
    sectionsObserver.observe(sectionsStartRef.current);

    return () => {
      heroObserver.disconnect();
      sectionsObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Passing refs exactly as you designed */}
      {children(heroRef, sectionsStartRef)}

      {showFloating && (
        <div className="fixed bottom-[1%] mb-[10px] inset-x-0 flex justify-center z-50 md:hidden">
          <FloatingButton />
        </div>
      )}
    </>
  );
}
