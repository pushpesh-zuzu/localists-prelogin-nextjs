"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import {
  searchService,
  setSelectedServiceId,
  setService,
  getPopularServiceList,
} from "@/lib/store/findjobslice";
import { generateSlug } from "@/utils";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import Paragraph from "../../UI/Typography/Paragraph";
import Image from "next/image";
import LandscapIcon from "../../../../../public/ReactIcons/LandscapIcon";
import DrivewaysInstallIcon from "../../../../../public/ReactIcons/DrivewayInstallIcon";
import FencyGateIcon from "../../../../../public/ReactIcons/FencyGateIcon";
import RoofIcon from "../../../../../public/ReactIcons/RoofIcon";
import TreeSurgeryIcon from "../../../../../public/ReactIcons/TreeSurgeruIcon";
import ArtGrassIcon from "../../../../../public/ReactIcons/ArtGrassIcon";
import PatioIcon from "../../../../../public/ReactIcons/PatioIcon";
import H4 from "../../UI/Typography/H4";
import NearmeH2Heading from "../../Nearme/NearmeH2Heading";
import PainterAndDecoratorIcon from "../../../../../public/ReactIcons/PainterAndDecoratorIcon";

const CATEGORY_ICON_MAP = {
  Landscaping: LandscapIcon,
  "Driveway Installation": DrivewaysInstallIcon,
  "Fence & Gate Installation": FencyGateIcon,
  Roofing: RoofIcon,
  "Tree Surgery": TreeSurgeryIcon,
  "Artificial Grass Installation": ArtGrassIcon,
  "Patio Laying": PatioIcon,
  "Painter and Decorator": PainterAndDecoratorIcon,
};

function ConnectWithClients({
  image = "/mainLeadBuyer/connectClient.webp",
  mobileImage = "/mainLeadBuyer/connectClientMobile.webp",
  onGetStarted,
}) {
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

  const {
    service: searchResults,
    searchServiceLoader,
    popularList,
  } = useSelector((state) => state.findJobs);

  // Fetch popular services
  useEffect(() => {
    dispatch(getPopularServiceList());
    return () => dispatch(setService([]));
  }, [dispatch]);

  // Click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce search
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
    const canContinue = checkAuthenticatedUser(router);
    if (!canContinue) return;

    if (selectedService) {
      const slug = generateSlug(selectedService.name);
      if (!slug) return;

      dispatch(setSelectedServiceId(selectedService.id));
      router.push(
        `/${currentLang}/${currentCountry}/sellers/create-account/${slug}`
      );
    } else if (input.trim()) {
      if (onGetStarted) onGetStarted(input.trim());
    }
  };

  return (
    <WrapperBGWidth>
      <div className="px-7.5 sm:px-10 md:px-16 xl:px-[120px] py-12 md:py-15 xl:py-[72px] flex flex-col lg:flex-row items-start md:gap-10 lg:gap-17">
        {/* LEFT */}
        <div className="flex-1 w-full">
          <Image
            src={mobileImage}
            alt="Connect with clients"
            className="lg:hidden w-full h-full object-cover rounded-2xl max-w-[500px] max-h-[609px] mb-7.5"
            width={500}
            height={609}
          />

          <NearmeH2Heading
            headdingblue=" Connect with Clients Who"
            headingblack="Need You Now"
            className="mb-5 md:mb-8 lg:mb-12"
          />

          <Paragraph
            variant="primarySmall"
            className="font-normal text-[#253238]"
          >
            Get matched with 1000s of local customers who need your services
          </Paragraph>

          {/* SEARCH */}
          <div className="relative mt-5 md:mt-8 lg:mt-12" ref={dropdownRef}>
            <div
              className="flex items-center bg-white rounded-full p-1 border border-[#DBDFE4] overflow-hidden"
              style={{ boxShadow: "0px 3.65px 3.65px 0px #DBDFE4" }}
            >
              <input
                type="text"
                value={input}
                placeholder="Enter your service"
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
                className="flex-1 min-w-0 px-2 text-black font-bold placeholder:font-bold placeholder:text-[#A5B8E0] outline-none text-base"
              />

              <button
                onClick={handleGetStarted}
                className="bg-[#00AFE3] flex md:min-w-[169px] justify-center items-center hover:bg-[#0099cc] text-white p-2 text-xs md:text-[18px] font-extrabold md:px-4.25 md:py-3.5 lg:py-5 rounded-full"
              >
                Get Started
              </button>
            </div>

            {/* DROPDOWN */}
            {isDropdownOpen && searchResults?.length > 0 && (
              <div className="absolute max-h-[300px] overflow-y-auto top-full left-0 w-full bg-white shadow-[0px_0px_2px_0px_#00000033] z-10 rounded-b-xl mt-1 overflow-hidden">
                {searchServiceLoader ? (
                  <div className="flex justify-center py-4">
                    <Spin indicator={<LoadingOutlined spin />} />
                  </div>
                ) : (
                  searchResults.map((item) => (
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

          {/* ✅ POPULAR SERVICES (UPDATED LOGIC ONLY) */}
          <div
            style={{ boxShadow: "0px 3.65px 3.65px 0px #DBDFE4" }}
            className="mt-7.5 md:mt-10 lg:mt-12 p-7.5 md:p-9 border rounded-[15px] border-[#DBDFE4]"
          >
            <H4 className="text-[#00AFE3] mb-3">Popular services</H4>

            <ul className="grid grid-col-1 md:grid-cols-2 gap-y-[16px] gap-x-6">
              {popularList?.slice(0, 8).map((item) => {
                const Icon = CATEGORY_ICON_MAP[item.name];

                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      const canContinue = checkAuthenticatedUser(router);
                      if (!canContinue) return;

                      dispatch(setSelectedServiceId(item.id));

                      const slug = generateSlug(item.name);

                      router.push(
                        `/${currentLang}/${currentCountry}/sellers/create-account/${slug}`
                      );
                    }}
                  >
                    {Icon && <Icon />}

                    <Paragraph
                      variant="primarySmall"
                      className="!mt-0 font-normal text-[#253238] hover:text-[#00AFE3] transition-colors"
                    >
                      {item.name}
                    </Paragraph>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 w-full rounded-2xl overflow-hidden max-w-[500px]">
          <Image
            src={image}
            alt="Connect with clients"
            className="hidden lg:block w-full h-full object-cover rounded-2xl max-w-[500px] max-h-[609px]"
            width={500}
            height={609}
          />
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default ConnectWithClients;