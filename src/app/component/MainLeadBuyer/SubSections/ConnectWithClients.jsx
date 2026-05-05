"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import {
  setSelectedServiceId,
  setService,
  getPopularServiceList,
} from "@/lib/store/findjobslice";
import { generateSlug } from "@/utils";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";

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
import Link from "next/link";
import LeadBuyerServiceModal from "./LeadBuyerServiceModal";

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
  trades = [],
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { lang, country } = useParams();

  const currentLang = lang || "en";
  const currentCountry = country || "gb";

  // ❌ removed: search, dropdown, debounce, selectedService
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch popular services
  useEffect(() => {
    dispatch(getPopularServiceList());
    return () => dispatch(setService([]));
  }, [dispatch]);

  // ✅ Open modal (with auth check)
  const handleOpenModal = () => {
    const canContinue = checkAuthenticatedUser(router);
    if (!canContinue) return;
    setIsModalOpen(true);
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

          {/* 🔥 SEARCH (CLICKABLE ONLY) */}
          <div className="relative mt-5 md:mt-8 lg:mt-12 cursor-pointer">
            <div
              onClick={handleOpenModal}
              className="flex items-center bg-white rounded-full p-1 border border-[#DBDFE4] overflow-hidden cursor-pointer"
              style={{ boxShadow: "0px 3.65px 3.65px 0px #DBDFE4" }}
            >
              <input
                type="text"
                readOnly
                placeholder="Enter your service"
                className="flex-1 min-w-0 px-3.5 md:px-9 text-black font-bold placeholder:font-bold placeholder:text-[#A5B8E0]! outline-none text-base cursor-pointer"
              />

              <button
                onClick={handleOpenModal}
                className="cursor-pointer bg-[#00AFE3] flex md:min-w-[169px] justify-center items-center hover:bg-[#0099cc] text-white py-[9.15px] px-3.5 text-xs md:text-[18px] font-extrabold md:px-4.25 md:py-3.5 lg:py-5 rounded-full"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* POPULAR SERVICES (UPDATED LOGIC ONLY) */}
          <div
            style={{ boxShadow: "0px 3.65px 3.65px 0px #DBDFE4" }}
            className="mt-7.5 md:mt-10 lg:mt-12 p-7.5 md:p-9 border rounded-[15px] border-[#DBDFE4]"
          >
            <H4 className="text-[#00AFE3] mb-3">Popular services</H4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[16px] gap-x-6">
              {trades?.slice(0, 8).map((item) => {
                const Icon = CATEGORY_ICON_MAP[item.label];
                const slug = generateSlug(item.label);

                return (
                  <Link
                    key={item.id}
                    href={`/${currentLang}/${currentCountry}/sellers/create-account/${slug}`}
                    onClick={(e) => {
                      const canContinue = checkAuthenticatedUser(router);
                      if (!canContinue) {
                        e.preventDefault();
                        return;
                      }
                      dispatch(setSelectedServiceId(item.serviceId));
                    }}
                    className="flex items-center gap-2"
                  >
                    {Icon && <Icon />}
                    <Paragraph
                      variant="primarySmall"
                      className="!mt-0 font-normal text-[#253238] hover:text-[#00AFE3] transition-colors"
                    >
                      {item.label}
                    </Paragraph>
                  </Link>
                );
              })}
            </div>
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

      {/* ✅ MODAL */}
      <LeadBuyerServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </WrapperBGWidth>
  );
}

export default ConnectWithClients;