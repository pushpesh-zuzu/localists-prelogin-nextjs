"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import HeadingWrapperMainLeadBuyer from "../HeadingWrapperMainLeadBuyer";
import Button from "../../UI/Typography/Button";
import H4 from "../../UI/Typography/H4";
import RequestBuyerModal from "../../common/ReqBuyerRegistration/Modal/RequestBuyerModal";
import {
  searchService,
  setSelectedServiceId,
  setService,
} from "@/lib/store/findjobslice";
import { generateSlug } from "@/utils";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";
import LeadBuyerServiceModal from "./LeadBuyerServiceModal";

const INITIAL_VISIBLE = 4;

function ChooseYourTrade({ trades = [], onTradeClick }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { lang, country } = useParams();

  const currentLang = lang || "en";
  const currentCountry = country || "gb";

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const debounceRef = useRef(null);
  const dropdownRef = useRef(null);

  const { service: searchResults, searchServiceLoader } = useSelector(
    (state) => state.findJobs,
  );

  const visibleTrades = trades.slice(0, INITIAL_VISIBLE);
  const remainingTrades = trades.slice(INITIAL_VISIBLE); // static, no filter
  const hasMore = trades.length > INITIAL_VISIBLE;

  // ✅ Click outside dropdown close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Modal close → sab clear
  const handleCloseModal = () => {
    setModalOpen(false);
    setSearch("");
    setIsDropdownOpen(false);
    dispatch(setService([]));
  };

  // ✅ Debounced API search — same as ConnectWithClients
  const triggerSearch = (value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch(searchService({ search: value.trim() }));
    }, 250);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    setIsDropdownOpen(true);
    triggerSearch(val);
  };

  // ✅ Dropdown item select → dispatch + redirect
  const handleSearchResultClick = useCallback(
    (item) => {
      const canContinue = checkAuthenticatedUser(router);
      if (!canContinue) return;

      dispatch(setSelectedServiceId(item.id));
      handleCloseModal();

      const slug = generateSlug(item.name);
      router.push(
        `/${currentLang}/${currentCountry}/sellers/create-account/${slug}`,
      );
    },
    [dispatch, router, currentLang, currentCountry],
  );

  // ✅ Static grid card click → dispatch + redirect
  const handleTradeClick = (e, trade) => {
    e.preventDefault();
    const canContinue = checkAuthenticatedUser(router);
    if (!canContinue) return;

    dispatch(setSelectedServiceId(trade.serviceId));
    onTradeClick && onTradeClick(trade);

    const slug = generateSlug(trade.label);
    router.push(
      `/${currentLang}/${currentCountry}/sellers/create-account/${slug}`,
    );
  };

  // ✅ Modal static grid item click
  const handleModalTradeClick = (e, trade) => {
    e.preventDefault();
    const canContinue = checkAuthenticatedUser(router);
    if (!canContinue) return;

    dispatch(setSelectedServiceId(trade.serviceId));
    onTradeClick && onTradeClick(trade);
    handleCloseModal();

    const slug = generateSlug(trade.label);
    router.push(
      `/${currentLang}/${currentCountry}/sellers/create-account/${slug}`,
    );
  };

  return (
    <WrapperBGWidth className="">
      <div className="px-7.5 sm:px-10 md:px-16 xl:px-[120px] pb-12 md:pb-15 xl:pb-[72px]">
        <HeadingWrapperMainLeadBuyer
          headdingblue="Choose Your"
          headingblack="Trade"
          description="Tell us what you do and start getting found by local customers."
        />

        {/* Trade Grid — first 4 only */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 lg:gap-12">
          {visibleTrades.map((trade, index) => (
            <Link
              key={`${trade.label}-${index}`}
              href={`/${currentLang}/${currentCountry}/sellers/create-account/${generateSlug(trade.label)}`}
              onClick={(e) => handleTradeClick(e, trade)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group md:w-[186px] md:h-[200px] xl:w-[264px] xl:h-[256px] w-[140px] h-[136px]"
            >
              <Image
                src={trade.image}
                alt={trade.label}
                width={264}
                height={256}
                className="md:w-[186px] md:h-[200px] xl:w-[264px] xl:h-[256px] w-[140px] h-[136px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                }}
              />
              <H4 className="absolute bottom-[10%] w-[90%] text-center left-1/2 transform -translate-x-1/2 text-white">
                {trade.label}
              </H4>
            </Link>
          ))}
        </div>

        {/* Load More → opens modal */}
        {hasMore && (
          <div className="flex justify-center mt-8 md:mt-12">
            <Button
              variant="primary"
              onClick={() => setModalOpen(true)}
              className="cursor-pointer rounded-full min-w-[116px] md:min-w-[143px] bg-[#253238] hover:bg-[#0099cc] text-white px-[15px] py-2 xl:py-[15px] xl:px-7 leading-normal!"
            >
              Load More
            </Button>
          </div>
        )}
      </div>

      {/* Modal */}
      {/* <RequestBuyerModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title="What type of work do you do?"
        showButtons={false}
        showProgressBar={false}
        showClosIcon={true}
        minHeight="min-h-[400px] md:min-h-[560px]"
        childrenMaxHeight=""
      >
        <div className="relative mb-7.5" ref={dropdownRef}>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            onFocus={() => {
              setIsDropdownOpen(true);
              if (!search.trim()) dispatch(searchService({ search: "" }));
            }}
            placeholder="Search Service here"
            className="w-full border border-[#D9D9D9] rounded-2xl px-3 py-[12px] text-sm text-[#555] placeholder:text-[#BDBDBD] outline-none focus:border-[#00AFE3] transition-colors"
          />

          {isDropdownOpen && searchResults?.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-[0px_0px_4px_0px_#00000033] z-20 rounded-xl mt-1 max-h-[200px] overflow-y-auto">
              {searchServiceLoader ? (
                <div className="flex justify-center py-4">
                  <Spin indicator={<LoadingOutlined spin />} />
                </div>
              ) : (
                searchResults.map((item) => (
                  <p
                    key={item.id}
                    onClick={() => handleSearchResultClick(item)}
                    className="px-[18px] py-[12px] text-[16px] font-[Arial] tracking-[-0.03em] text-[#848484] cursor-pointer hover:bg-gray-100"
                  >
                    {item.name}
                  </p>
                ))
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 px-1 max-h-[300px] md:max-h-[357px] overflow-y-auto">
          {remainingTrades.map((trade, index) => (
            <Link
              key={`modal-${trade.label}-${index}`}
              href={`/${currentLang}/${currentCountry}/sellers/create-account/${generateSlug(trade.label)}`}
              onClick={(e) => handleModalTradeClick(e, trade)}
              className="flex items-center px-5 md:3.5 py-4.25 md:py-[22px] min-w-[248px] md:min-w-[280px] rounded-[20px] border border-[#D9D9D9] text-sm md:text-[18px] font-normal text-[#253238] hover:border-[#00AFE3] hover:text-[#00AFE3] transition-colors duration-200 cursor-pointer"
            >
              {trade.label}
            </Link>
          ))}
        </div>
      </RequestBuyerModal> */}

      <LeadBuyerServiceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </WrapperBGWidth>
  );
}

export default ChooseYourTrade;
