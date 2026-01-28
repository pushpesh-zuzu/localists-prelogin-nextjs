"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchService } from "@/lib/store/searchSlice";
import dynamic from "next/dynamic";
import MegaMenu from "../common/MegaMenu";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import ArrowDownBlue from "../common/icons/HomePageIcons/ArrowDownBlue";
import SearchIcon from "../common/icons/HomePageIcons/SearchIcon";
import MobileMenuIcon from "../common/icons/HomePageIcons/MobileMenuIcon";
import { getBarkToken } from "@/utils/CookiesHelper";
import { useRouter } from "next/navigation";
import AuthenticatedHeader from "./AthenticatedHeader";
import MobileSlideInSearch from "./MobileSlideInSearch";
import LoaderIndicator from "../common/Loader/LoaderIndicatore";

const SearchResults = dynamic(() => import("../common/SearchResult"), {
  ssr: false,
  loading: () => <div className="hidden">Loading...</div>
});

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [mobileSearchText, setMobileSearchText] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const services = useSelector(
    (state) => state.search?.services || []
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setIsMobileSearchOpen(false);
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return getBarkToken() ? (
    <AuthenticatedHeader />
  ) : (
    <>
      <header
        className="w-full sticky top-0 left-0 border-b border-[#DEDEDE] bg-white z-50"
        role="banner"
      >
        <WrapperBGWidth>
          <div className="hidden lg:flex justify-between items-center px-[11px] sm:pb-4 sm:pt-5 sm:px-6 md:px-[46.93] lg:px-12 xl:px-30 xl:pb-6 xl:pt-[18px] ">
            <div className="flex items-center space-x-4  md:space-x-[11px] lg:space-x-[21px] ">
              <a
                href="/"
                aria-label="Go to Localists homepage"
                className="shrink-0"
              >
                <Image
                  src="/logodesktop.svg"
                  alt="Localists - Local Service Provider Directory"
                  width={168}
                  height={38}
                  className=" md:w-[89px] sm:h-5 lg:w-[168px] lg:h-7"
                  priority
                  fetchPriority="high"
                  loading="eager"
                />
              </a>

              <div className="flex items-center space-x-4 md:space-x-2 lg:space-x-2.5 lg:py-3">
                <MegaMenu>
                  <button className="flex items-center sm:gap-1 lg:gap-1.5  text-[12px] lg:text-base font-bold whitespace-nowrap text-[#253238]">
                    Explore Our Services
                    {/* <Image
                    src="/icons/downarrowblue.svg"
                    alt="down-arrow"
                    width={18}
                    height={12}
                    className="w-2 h-1.5 sm:w-3 sm:h-2 lg:w-[18px] lg:h-3 transition-transform duration-200"
                    priority
                    fetchPriority="high"
                    loading="eager"
                  /> */}
                    <ArrowDownBlue />
                  </button>
                </MegaMenu>

                <button className="flex items-center sm:gap-1 lg:gap-1.5  text-[12px] lg:text-base font-bold whitespace-nowrap text-[#253238]">
                  Advice
                  {/* <Image
                  src="/icons/downarrowblue.svg"
                  alt="down-arrow"
                  width={18}
                  height={12}
                  className="w-2 h-1.5 sm:w-3 sm:h-2 lg:w-[18px] lg:h-3 transition-transform duration-200"
                  priority
                  fetchPriority="high"
                  loading="eager"
                /> */}
                  <ArrowDownBlue />
                </button>
              </div>
            </div>

            <nav
              className="flex items-center space-x-4  md:space-x-2 lg:space-x-8"
              role="navigation"
              aria-label="User account navigation"
            >
              <div className="relative flex gap-1.5">
                <input
                  type="text"
                  placeholder="Search for a service"
                  className="text-base w-[207px] h-[34px]  px-2.5 py-2 font-bold bg-white border-[1.5px] border-[#CACACA] rounded-[100px] focus:outline-none"
                  value={searchQuery || ""}
                  onChange={(e) => {
                    const query = e.target.value;
                    setSearchQuery(query); // State update
                    if (query.trim() !== "") {
                      dispatch(searchService({ query }));
                    }
                  }}
                />
                {searchQuery.length ? (
                  <SearchResults
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                ) : (
                  ""
                )}
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4" />
                </div>
              </div>

              <div
                className="flex items-center space-x-1 lg:space-x-4"
                role="group"
                aria-label="User authentication"
              >
                <button
                  onClick={() => router.push("/en/gb/login")}
                  className="text-[14px] lg:text-base cursor-pointer font-normal text-[#1E2A2E] lg:py-[12.5px] md:px-1 lg:px-4 whitespace-nowrap"
                  aria-label="Login to your account"
                >
                  Login
                </button>
                <button
                  className="flex items-center cursor-pointer font-bold gap-2 px-2.5 py-1.5 lg:px-5 lg:py-3 text-[14px] lg:text-[16px] text-white bg-[#00AEEF] rounded-full whitespace-nowrap"
                  aria-label="Sign up for new account"
                  onClick={() => {
                    router.push("/en/gb/sellers/create");
                  }}
                >
                  {/* <Image
                    src="/icons/signup.webp"
                    alt="signup icon"
                    width={16.71}
                    height={18}
                    className="w-2 h-2  lg:w-[16.71px] lg:h-[18px]"
                    priority
                    fetchPriority="high"
                    loading="eager"
                  /> */}
                  Join as a Professional
                </button>
              </div>
            </nav>
          </div>

          <div className="flex lg:hidden items-center justify-between px-2.5 py-2.5 md:py-[9.5px] md:px-16">
            <MegaMenu>
              <button type="button" aria-label="Open mobile menu">
                <MobileMenuIcon className="" />
              </button>
            </MegaMenu>

            <>
              <div className="flex justify-center flex-1 max-w-[103px] max-h-[25px]">
                <a
                  href="/"
                  aria-label="Go to Localists homepage"
                  className="shrink-0"
                >
                  <Image
                    src="/logo.webp"
                    alt="Localists - Local Service Provider Directory"
                    width={103}
                    height={25}
                    className="w-[103px] h-[25px] md:w-[133px] md:w-8 ml-[25%]"
                    priority
                    fetchPriority="high"
                    loading="eager"
                    layout="intrinsic"
                  />
                </a>
              </div>
              <div className="flex items-center space-x-[4.34px]">
                <button type="button" aria-label="Search services"
                  onClick={() => setIsMobileSearchOpen(true)}
                >
                  <SearchIcon className="h-4 w-4 md:h-[18px] md:w-[18px] mr-1 md:mr-1" />
                </button>
                <button
                  onClick={() => router.push("/en/gb/login")}
                  className="px-2.5 md:px-4 leading-4 py-[5.66px] text-[16px] font-medium text-white bg-[#00AEEF] rounded-full transition-colors duration-200"
                  aria-label="Login to your account"
                >
                  Login
                </button>
              </div>
            </>
          </div>
        </WrapperBGWidth>
      </header>

      <MobileSlideInSearch
        isOpen={isMobileSearchOpen}
        setIsOpen={setIsMobileSearchOpen}
        services={services}
        dispatch={dispatch}
        searchService={searchService}
        mobileSearchText={mobileSearchText}
        setMobileSearchText={setMobileSearchText}
      />
    </>
  );
}
