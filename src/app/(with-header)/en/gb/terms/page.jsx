"use client";

import { useEffect, useState } from "react";
import ContentForProfessional from "@/app/component/TermsAndCondition/ContentForProfessional";
import ContentForConsumers from "@/app/component/TermsAndCondition/ContentForCustomer";
import SEO from "@/app/component/common/seo/SEO";
import Footer from "@/app/component/Footer/Footer";

export default function Page() {
  const [activeTab, setActiveTab] = useState("customers");

  // Read hash on load & hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "professionals" || hash === "customers") {
        setActiveTab(hash);
      }
    };

    handleHashChange(); // initial load
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Update hash on click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    window.history.pushState(null, "", `#${tab}`);
  };

  return (
    <>
      <SEO
        canonicalPath="/en/gb/terms"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Terms", path: "en/gb/terms" },
        ]}
        conversion={true}
      />
      <section className="text-[#253238]">
        {/* TABS */}
        <nav className="bg-[#f9f9fa] pt-[32px] mb-[24px]">
          <div className="relative mx-auto flex max-w-[970px] flex-col sm:flex-row justify-center">

            {/* CONSUMERS */}
            <button
              type="button"
              onClick={() => handleTabClick("customers")}
              className={`
                relative z-10 w-full sm:w-auto
                px-[32px] py-[18px] sm:py-[24px]
                font-[Arial] text-[18px] sm:text-[20px]
                leading-[24px] tracking-[-0.03em]
                transition-all duration-300 ease-in-out
                cursor-pointer
                ${activeTab === "customers"
                  ? "bg-white text-[#253238] sm:-translate-y-[1px]"
                  : "text-[#9da0b6]"
                }
                hover:text-[#253238]
                text-center
              `}
            >
              Consumers
            </button>

            {/* PROFESSIONALS */}
            <button
              type="button"
              onClick={() => handleTabClick("professionals")}
              className={`
                relative z-10 w-full sm:w-auto
                px-[32px] py-[18px] sm:py-[24px]
                font-[Arial] text-[18px] sm:text-[20px]
                leading-[24px] tracking-[-0.03em]
                transition-all duration-300 ease-in-out
                cursor-pointer
                ${activeTab === "professionals"
                  ? "bg-white text-[#253238] sm:-translate-y-[1px]"
                  : "text-[#9da0b6]"
                }
                hover:text-[#253238]
                text-center
              `}
            >
              Professionals
            </button>
          </div>
        </nav>

        {/* CONTENT */}
        <div className="mx-auto max-w-[970px] px-[15px] pt-[20px] md:pt-[30px] pb-[15px]">
          <div className="pb-[49px] animate-fadeIn">
            {activeTab === "customers" ? (
              <ContentForConsumers />
            ) : (
              <ContentForProfessional />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
