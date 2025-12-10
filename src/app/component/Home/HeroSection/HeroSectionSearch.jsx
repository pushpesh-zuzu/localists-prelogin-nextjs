"use client";
import React, { useState } from "react";
import SearchResults from "../../common/SearchResult";
import { useDispatch } from "react-redux";
// const SearchResults = lazy(() => import("../common/SearchResult"));

function HeroSectionSearch() {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() !== "") {
      // Defer non-critical updates
      setTimeout(() => dispatch(searchService({ query })), 0);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for a services"
        id="search-service"
        className="family-55 text-[#B3B3B3] font-bold px-4 py-2.5 md:px-[30px] md:py-[15px] xl:px-[57.5px] xl:py-[29.5px] mt-5 xl:mt-[50px] text-base xl:text-[29.54px] bg-white border-[1.5px] border-gray-300 rounded-[100px] transition-all duration-200 focus:border-[#00afe3] focus:ring-1 focus:ring-[#00afe3] focus:ring-opacity-20 focus:outline-none w-full"
        aria-label="Search for a services"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {searchQuery.length > 0 && (
        <Suspense fallback={null}>
          <SearchResults
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Suspense>
      )}
      <div className="absolute inset-y-0 -top-4 right-4 xl:right-10 flex items-center pointer-events-none">
        <svg
          className="w-6 h-6 xl:w-11 xl:h-11 text-[#00afe3] mt-5 xl:mt-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m1.77-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}

export default HeroSectionSearch;
