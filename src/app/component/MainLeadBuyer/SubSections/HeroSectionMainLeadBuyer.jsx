"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import {
  searchService,
  setSelectedServiceId,
  setService,
} from "@/lib/store/findjobslice";
import { generateSlug } from "@/utils";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import H1 from "../../UI/Typography/H1";
import Paragraph from "../../UI/Typography/Paragraph";
import TrustPoiletLeadBuyer from "../../../../../public/mainLeadBuyer/hero/TrustPoiletLeadBuyer";
import TilledArrow from "../../../../../public/mainLeadBuyer/hero/TilledArrow";
import SearchIcon from "../../common/icons/HomePageIcons/SearchIcon";
import ChevroliteDoubleDownIcon from "../../common/icons/HomePageIcons/ChevroliteDoubleDownIcon";
import TrustPoiletLeadBuyerMobile from "../../../../../public/mainLeadBuyer/hero/TrustPoiletLeadBuyerMobile";
import ChargingIcon from "../../../../../public/ReactIcons/ChargingIcon";

export default function HeroSectionMainLeadBuyer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { lang, country } = useParams();

  const currentLang = lang || "en";
  const currentCountry = country || "gb";

  const [input, setInput] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);

  const { service, searchServiceLoader } = useSelector(
    (state) => state.findJobs,
  );

  // Cleanup service list on unmount
  useEffect(() => {
    return () => dispatch(setService([]));
  }, [dispatch]);

  // Click outside — close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  const triggerSearch = (value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch(searchService({ search: value.trim() }));
    }, 250);
  };

  const handleSelectService = useCallback(
    (item) => {
      setInput(item.name);
      setSelectedService(item);
      setIsDropdownOpen(false);
      setTimeout(() => dispatch(setService([])), 100);
    },
    [dispatch],
  );

  const handleGetStarted = () => {
    const canContinue = checkAuthenticatedUser(router);
    if (!canContinue) return;
    if (!selectedService) return;

    const slug = generateSlug(selectedService.name);
    if (!slug) {
      alert("Service route not defined!");
      return;
    }

    dispatch(setSelectedServiceId(selectedService.id));
    router.push(
      `/${currentLang}/${currentCountry}/sellers/create-account/${slug}`,
    );
  };

  return (
    <section
      className="w-full bg-[linear-gradient(180deg,#0191D8_0%,#00CCFF_100%)] 
      md:bg-[linear-gradient(90deg,#00CCFF_0%,#0191D8_100%)]"
    >
      <div className="mx-auto max-w-[1536px] flex flex-col md:flex-row items-center pb-6 md:gap-8 xl:gap-[70px] pt-[30px]">
        {/* LEFT */}
        <div className="md:w-1/2 md:w-[55%] xl:w-[55%] text-white px-[30px] md:px-0 md:pl-16 xl:pl-[120px] md:pt-[29px] md:pb-3 xl:pt-[42px] xl:pb-12">
          <TrustPoiletLeadBuyerMobile className="md:hidden mb-3" />
          <TrustPoiletLeadBuyer className="hidden md:block mb-6" />

          {/* Heading */}
          <h1
            className="font-Inter font-black tracking-[-0.03em]
            text-[46px] leading-[48px]
            md:text-[60px] md:leading-[55px]
            lg:text-[81px] lg:leading-[75px] text-white block drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]"
          >
            <span className="hidden md:inline">Tap into real leads.</span>
            <span className="md:hidden inline">Real Leads.</span>
            <br className="hidden md:block" />
            <span
              className="block text-black text-[42px] leading-[48px]
              md:text-[50px] md:leading-[55px]
              xl:text-[81px] lg:leading-[75px]"
            >
              On your terms.
            </span>
          </h1>

          {/* Description */}
          <p
            className="font-[Arial] font-bold text-[18px] leading-[20px]
            sm:text-base sm:leading-[20px]
            lg:text-[20px] lg:leading-[24px]
            w-full max-w-full sm:max-w-[60%] md:max-w-[450px] lg:max-w-[722px]
            text-white pt-[11px] md:pt-4 lg:pt-[20px]
            drop-shadow-[0_0_4px_rgba(0,0,0,0.25)]"
          >
            Set up your profile today to get access to 100's of leads in your
            area, with verified numbers, job details, and your own personal
            account manager.
          </p>

          {/* INPUT */}
          <div className="w-full max-w-[512px] mt-5 mt-8 lg:mt-12">
            <Paragraph className="mb-2.5">
              What service do you provide?
            </Paragraph>

            {/* Search wrapper — relative parent for dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center bg-white rounded-full p-1 shadow-lg w-full overflow-hidden"
                style={{ boxShadow: "0px 12.56px 20.94px 0px #005974E5" }}
              >
                {/* Icon */}
                <SearchIcon
                  color="#4B4B4B"
                  className="h-[18px] w-[18px] ml-4 shrink-0"
                />

                {/* Desktop input */}
                <input
                  type="text"
                  value={input}
                  placeholder="Enter your service (e.g. Plumber)"
                  onFocus={() => {
                    setIsDropdownOpen(true);
                    if (!input.trim()) dispatch(searchService({ search: "" }));
                  }}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setIsDropdownOpen(true);
                    setSelectedService(null);
                    triggerSearch(e.target.value);
                  }}
                  className="hidden md:flex flex-1 min-w-0 px-2 text-black font-bold placeholder:font-bold! placeholder:text-[#C8C8C8] outline-none text-sm sm:text-base"
                />

                {/* Mobile input */}
                <div className="relative md:hidden flex-1 ">
                  {/* max-w-[200px] */}
                  <input
                    type="text"
                    value={input}
                    onFocus={() => {
                      setIsDropdownOpen(true);
                      if (!input.trim())
                        dispatch(searchService({ search: "" }));
                    }}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setIsDropdownOpen(true);
                      setSelectedService(null);
                      triggerSearch(e.target.value);
                    }}
                    className="pl-4 w-full bg-transparent outline-none text-black text-sm sm:text-base placeholder-transparent"
                  />
                  {!input && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8C8C8] text-xs md:text-[18px] font-bold leading-4 pointer-events-none">
                      Enter your service <br /> (e.g. Plumber)
                    </span>
                  )}
                </div>

                {/* Desktop button */}
                <button
                  onClick={handleGetStarted}
                  className="bg-green-500 cursor-pointer hidden md:flex items-center gap-2 hover:bg-green-600 text-white p-2 text-xs md:text-[18px] font-extrabold md:px-4.25 md:py-3.5 lg:py-5 rounded-full"
                >
                  <TilledArrow />
                  View Leads
                </button>

                {/* Mobile button */}
                <button
                  onClick={handleGetStarted}
                  className="bg-green-500 cursor-pointer flex md:hidden items-center gap-0 max-[360px]:gap-1 hover:bg-green-600 text-white p-2 text-xs font-extrabold rounded-full"
                >
                  <TilledArrow />
                  View Leads
                </button>
              </div>

              {/* Dropdown */}
              {isDropdownOpen && service?.length > 0 && (
                <div className="[&::-webkit-scrollbar]:w-0 md:[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full absolute max-h-[300px] overflow-y-auto top-full left-0 w-full bg-white shadow-[0px_0px_2px_0px_#00000033] z-10 rounded-xl mt-1 overflow-hidden">
                  {searchServiceLoader ? (
                    <div className="flex justify-center py-4">
                      <Spin indicator={<LoadingOutlined spin />} />
                    </div>
                  ) : (
                    service.map((item) => (
                      <p
                        key={item.id}
                        onClick={() => handleSelectService(item)}
                        className="px-[18px] py-[12px] text-[16px] font-[Arial] tracking-[-0.03em] text-[#848484] cursor-pointer hover:bg-gray-100"
                      >
                        {item.name}
                      </p>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Bottom Info */}
            <div className="flex items-center justify-center mt-5 gap-[6px] text-sm font-medium text-white text-center">
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
          <div className="absolute w-[200px]  lg:w-[400px]  lg:h-[535px] bg-[#0A6EBE] rounded-full blur-2xl opacity-40"></div>
          <Image
            src="/mainLeadBuyer/hero/leadbuyerhero1.webp"
            alt="Hero"
            width={400}
            height={535}
            quality={90}
            className="relative z-10"
          />
        </div>
      </div>
    </section>
  );
}
