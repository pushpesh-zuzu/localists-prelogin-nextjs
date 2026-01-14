"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  getPopularServiceList,
  searchService,
  setSelectedServiceId,
  setService,
} from "@/lib/store/findjobslice";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { generateSlug } from "@/utils";
// import { extractAllParams } from "@/utils/decodeURLParams";
import Image from "next/image";
import hiring from "../../../../public/images/ServicePanel/hiring.svg";
import rightArrow from "../../../../public//Images/ServicePanel/rightArrow.svg";
import H1 from "../UI/Typography/H1";
import Paragraph2 from "../UI/Typography/Paragraph2";
import H2 from "../UI/Typography/H2";


const FindLocalJobs = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const searchParams = useSearchParams();
  const { lang, country } = useParams();

  const currentLang = lang || "en";
  const currentCountry = country || "gb";

  const [input, setInput] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);

  const {
    popularList,
    service,
    popularLoader,
    searchServiceLoader,
  } = useSelector((state) => state.findJobs);

  /* Fetch popular services */
  useEffect(() => {
    dispatch(getPopularServiceList());
    return () => dispatch(setService([]));
  }, [dispatch]);


  /* Click outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  /* Debounced search */
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
    [dispatch]
  );

  const handleGetStarted = () => {
    if (!selectedService) return;
    const slug = generateSlug(selectedService.name);

    if (!slug) {
      alert("Service route not defined!");
      return;
    }

    dispatch(setSelectedServiceId(selectedService.id));
    router.push(
      `/${currentLang}/${currentCountry}/sellers/create-account/${slug}`
    );
  };

  return (

    <section className="bg-[#F9F9FA] px-[88px] py-[40px] flex gap-[5%] max-[1200px]:flex-col max-[980px]:px-[40px] max-[520px]:px-[26px] max-[380px]:px-[16px]">

      {/* LEFT */}
      <div className="w-full">
        <H1 className="max-[480px]:-mt-[15px]">
          Connect with Clients Who Need You Now
        </H1>

        <Paragraph2 className="font-bold mt-2 max-[480px]:mt-5">
          Get matched with 1000s of local customers who need your services
        </Paragraph2>

        <style>{`
                    .custom-placeholder::placeholder {
                        color: #C8C8C8;
                        opacity: 1; }
                        `}</style>

        {/* SEARCH */}
        <div className=" relative 
  mt-[50px] 
  max-[480px]:mt-[20px]
  mb-[40px] max-[480px]:mb-[25px]
  w-fit max-[620px]:w-full">
          <input
            value={input}
            placeholder="What service do you provide?"
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
            className="w-[513px] max-[620px]:w-full
      h-[50px] max-[480px]:h-[40px]
      px-[18px] pr-[48px]
      text-[16px]
      shadow-[0px_0px_2px_0px_#00000033]
      font-[Arial] tracking-[-0.03em]
      border-b-2 border-[#D9D9D9] focus:border-[#00AFE3]
      outline-none rounded-[10px]
      placeholder:text-[#C8C8C8]" />

          {/* DROPDOWN */}
          {isDropdownOpen && service?.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute w-full bg-white shadow-[0px_0px_2px_0px_#00000033] z-10"
            >
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

          {/* BUTTON */}
          <button
            onClick={handleGetStarted}
            className="absolute right-[7px] bottom-[7px] font-bold
              bg-[#00AFE3] text-white font-[Arial] tracking-[-0.03em]
              px-[20px] py-[5px] rounded-[3px]
              hidden min-[481px]:block hover:bg-[#008cc0]"
          >
            Get started
          </button>

          <button
            onClick={handleGetStarted}
            className="
      absolute right-[10px] top-1/2 -translate-y-1/2
      hidden max-[480px]:flex
      w-[32px] h-[32px]
      items-center justify-center
      bg-[#00AFE3] rounded-full 
    "
          >
            <Image
              src={rightArrow}
              alt="arrow"
              className="w-[16px] h-[16px]"
            />
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white rounded-[15px] p-[20px] min-w-fit shadow-[0px_0px_4px_0px_#00000033] h-fit max-[768px]:h-auto">
        <H2 className="text-[#00AFE3]">
          Popular Services
        </H2>

        {popularLoader ? (
          <div className="flex justify-center">
            <Spin indicator={<LoadingOutlined spin />} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-[13px] mt-5 mb-3 max-[620px]:grid-cols-1">
            {popularList?.map((item) => {
              const slug = generateSlug(item.name);
              return (
                <Link
                  key={item.id}
                  href={`/${currentLang}/${currentCountry}/sellers/create-account/${slug}`}
                  onClick={() => dispatch(setSelectedServiceId(item.id))}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={item.category_icon ? `${item.baseurl}/${item.category_icon}` : hiring}
                    alt={item.name}
                    width={20}
                    height={20}
                  />
                  <Paragraph2 className="hover:text-[#00AFE3]">{item.name}</Paragraph2>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FindLocalJobs;
