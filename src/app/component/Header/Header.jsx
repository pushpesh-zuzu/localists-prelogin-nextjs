"use client";

import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchService } from "@/lib/store/searchSlice";
import dynamic from "next/dynamic";
import MegaMenu from "../common/MegaMenu";
const SearchResults = dynamic(() => import("../common/SearchResult"), {
  ssr: false,
  loading: () => <div className="hidden">Loading...</div>,
});

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  return (
    <header
      className="w-full sticky top-0 left-0 border-b border-[#DEDEDE] bg-white z-50"
      role="banner"
    >
      <div className="hidden md:flex justify-between items-center px-[11px] sm:pb-4 sm:pt-5 sm:px-6 md:px-[46.93] lg:px-12 xl:px-30 xl:pb-6 xl:pt-[18px] ">
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
              <button className="flex items-center sm:gap-1 lg:gap-1.5  text-[12px] lg:text-base font-bold whitespace-nowrap">
                Explore Our Services
                <Image
                  src="/icons/downarrowblue.svg"
                  alt="down-arrow"
                  width={18}
                  height={12}
                  className="w-2 h-1.5 sm:w-3 sm:h-2 lg:w-[18px] lg:h-3 transition-transform duration-200"
                  priority
                  fetchPriority="high"
                  loading="eager"
                />
              </button>
            </MegaMenu>

            <button className="flex items-center sm:gap-1 lg:gap-1.5  text-[12px] lg:text-base font-bold whitespace-nowrap">
              Advice
              <Image
                src="/icons/downarrowblue.svg"
                alt="down-arrow"
                width={18}
                height={12}
                className="w-2 h-1.5 sm:w-3 sm:h-2 lg:w-[18px] lg:h-3 transition-transform duration-200"
                priority
                fetchPriority="high"
                loading="eager"
              />
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
              placeholder="Search for a services"
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
              <Image
                src="/icons/searchicon.svg"
                alt="search"
                width={16}
                height={16}
                className="w-4 h-4"
                priority
              />
            </div>
          </div>

          <div
            className="flex items-center space-x-1 lg:space-x-4"
            role="group"
            aria-label="User authentication"
          >
            <button
              className="text-[14px] lg:text-base font-normal text-[#1E2A2E] lg:py-[12.5px] md:px-1 lg:px-4 whitespace-nowrap"
              aria-label="Login to your account"
            >
              Login
            </button>
            <button
              className="flex items-center gap-2 px-2.5 py-1.5 lg:px-5 lg:py-3 text-[14px] lg:text-base text-white bg-[#00AEEF] rounded-full whitespace-nowrap"
              aria-label="Sign up for new account"
            >
              <Image
                src="/icons/signup.webp"
                alt="signup icon"
                width={16.71}
                height={18}
                className="w-2 h-2  lg:w-[16.71px] lg:h-[18px]"
                priority
                fetchPriority="high"
                loading="eager"
              />
              Sign Up
            </button>
          </div>
        </nav>
      </div>

      <div className="flex md:hidden items-center justify-between px-2.5 py-2.5">
        <MegaMenu>
          <button type="button" aria-label="Open mobile menu">
            <Image
              src="/mobilemenu.webp"
              alt="Mobile menu"
              width={20}
              height={20}
              className="w-5.5 h-3.5 text-[#00afe3]"
              priority
              fetchPriority="high"
              loading="eager"
              layout="intrinsic"
            />
          </button>
        </MegaMenu>
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
              className="w-[103px] h-[25px]"
              priority
              fetchPriority="high"
              loading="eager"
              layout="intrinsic"
            />
          </a>
        </div>

        <div className="family-55 flex items-center space-x-[4.34px]">
          <button type="button" aria-label="Search services">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px] text-[#00afe3]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m1.77-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <button
            className="family-55 px-2.5 py-[5.66px] text-[16px] font-medium text-white bg-[#00AEEF] rounded-full transition-colors duration-200"
            aria-label="Login to your account"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
