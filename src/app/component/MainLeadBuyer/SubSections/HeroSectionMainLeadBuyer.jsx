"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { setService } from "@/lib/store/findjobslice";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";

import Paragraph from "../../UI/Typography/Paragraph";
import TrustPoiletLeadBuyer from "../../../../../public/mainLeadBuyer/hero/TrustPoiletLeadBuyer";
import TilledArrow from "../../../../../public/mainLeadBuyer/hero/TilledArrow";
import SearchIcon from "../../common/icons/HomePageIcons/SearchIcon";
import ChevroliteDoubleDownIcon from "../../common/icons/HomePageIcons/ChevroliteDoubleDownIcon";
import TrustPoiletLeadBuyerMobile from "../../../../../public/mainLeadBuyer/hero/TrustPoiletLeadBuyerMobile";
import ChargingIcon from "../../../../../public/ReactIcons/ChargingIcon";

// ✅ NEW MODAL IMPORT
import LeadBuyerServiceModal from "./LeadBuyerServiceModal";

export default function HeroSectionMainLeadBuyer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { lang, country } = useParams();

  const currentLang = lang || "en";
  const currentCountry = country || "gb";

  // ❌ removed selectedService & dropdown
  const [input, setInput] = useState("");

  // ✅ NEW STATE
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cleanup
  useEffect(() => {
    return () => dispatch(setService([]));
  }, [dispatch]);

  // (optional) keep auth check if needed
  const handleOpenModal = () => {
    const canContinue = checkAuthenticatedUser(router);
    if (!canContinue) return;

    setIsModalOpen(true);
  };

  return (
    <section
      className="w-full bg-[linear-gradient(180deg,#0191D8_0%,#00CCFF_100%)] 
      md:bg-[linear-gradient(90deg,#00CCFF_0%,#0191D8_100%)]"
    >
      <div className="mx-auto max-w-[1536px] py-[22px] md:py-0 flex flex-col md:flex-row items-center md:gap-8 xl:gap-[70px] ">
        {/* LEFT */}
        <div className="md:w-1/2 md:w-[55%] xl:w-[55%] text-white px-[30px] md:px-0 md:pl-16 xl:pl-[120px] md:pt-[29px] md:pb-3 xl:pt-[42px] xl:pb-12">
          <TrustPoiletLeadBuyerMobile className="md:hidden mb-5" />
          <TrustPoiletLeadBuyer className="hidden md:block mb-4" />

          {/* Heading */}
          <h1
            className="font-Inter font-black tracking-[-0.03em]
            text-[46px] leading-[48px]
            md:text-[60px] md:leading-[55px]
            lg:text-[81px] lg:leading-[75px] text-white block drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]"
          >
            Real Leads.
            <br className="hidden md:block" />
            <span
              className="block text-black text-[42px] leading-[48px]
              md:text-[50px] md:leading-[55px]
              xl:text-[81px] lg:leading-[75px]"
            >
              On your Terms.
            </span>
          </h1>

          {/* Description */}
          <p
            className="font-[Arial] font-bold text-[18px] leading-[20px]
            sm:text-base sm:leading-[20px]
            lg:text-[20px] lg:leading-[24px]
            w-full max-w-full sm:max-w-[60%] md:max-w-[450px] lg:max-w-[722px]
            text-white pt-[19px] md:pt-4 lg:pt-[20px]
            drop-shadow-[0_0_4px_rgba(0,0,0,0.25)]"
          >
            Get access to 100's of leads in your area, with verified numbers,
            job details, and your own personal account manager.
          </p>

          {/* INPUT */}
          <div className="w-full max-w-[512px] mt-8 mt-5 lg:mt-8">
            <Paragraph className="mb-2">What service do you provide?</Paragraph>

            {/* 🔥 CLICK → OPEN MODAL */}
            <div onClick={handleOpenModal} className="relative cursor-pointer">
              <div
                className="flex items-center bg-white rounded-full p-1 shadow-lg w-full overflow-hidden"
                style={{ boxShadow: "0px 12.56px 20.94px 0px #005974E5" }}
              >
                <SearchIcon
                  color="#4B4B4B"
                  className="h-[18px] w-[18px] ml-4 shrink-0"
                />

                {/* Desktop input */}
                <input
                  type="text"
                  value={input}
                  readOnly
                  placeholder="Enter your service (e.g. Plumber)"
                  className="hidden md:flex cursor-pointer flex-1 min-w-0 px-2 text-black font-bold placeholder:font-bold! placeholder:text-[#C8C8C8] outline-none text-sm sm:text-base"
                />

                {/* Mobile input */}
                <div className="relative md:hidden flex-1 ">
                  <input
                    type="text"
                    value={input}
                    readOnly
                    className="pl-4 w-full bg-transparent outline-none text-black text-sm sm:text-base"
                  />
                  {!input && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8C8C8] text-xs md:text-[18px] font-bold leading-4 pointer-events-none">
                      Enter your service <br /> (e.g. Plumber)
                    </span>
                  )}
                </div>

                {/* Button (unchanged UI) */}
                <button className="cursor-pointer bg-green-500 hidden md:flex items-center gap-2 text-white p-2 text-xs md:text-[18px] font-extrabold md:px-4.25 md:py-3.5 lg:py-5 rounded-full">
                  <TilledArrow />
                  View Leads
                </button>

                <button className="bg-green-500 cursor-pointer flex md:hidden items-center gap-0 max-[360px]:gap-1 text-white p-2 text-xs font-extrabold rounded-full">
                  <TilledArrow />
                  View Leads
                </button>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="flex items-center justify-center mt-5 md:mt-2.5 gap-[6px] text-sm font-medium text-white text-center">
              <div className="flex items-center gap-1">
                <span>
                  <ChargingIcon />
                </span>
                <span>Takes 2 Minutes</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="mx-1 h-1.5 w-1.5 rounded-full bg-[#10C87B]" />
                <span>No Card Required</span>
              </div>
            </div>

            <ChevroliteDoubleDownIcon className="mx-auto mt-[22px] flex md:hidden" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 relative hidden pr-10 lg:pr-0 md:flex justify-start">
          <div className="absolute w-[200px] lg:w-[338px] lg:h-[454px] bg-[#0A6EBE] rounded-full blur-2xl opacity-40"></div>
          <Image
            src="/mainLeadBuyer/hero/leadbuyerhero.webp"
            alt="Hero"
            width={338}
            height={454}
            quality={90}
            className="relative z-10 lg:h-[454px]"
          />
        </div>
      </div>

      {/* ✅ MODAL */}
      <LeadBuyerServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
