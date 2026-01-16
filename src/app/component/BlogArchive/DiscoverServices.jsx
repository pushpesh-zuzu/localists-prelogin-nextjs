"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "../common/icons/HomePageIcons/SearchIcon";
import { searchService } from "@/lib/store/searchSlice";
import {
    setbuyerRequestData,
    setBuyerStep,
    setcitySerach,
} from "@/lib/store/buyerslice/buyerSlice";
import { setSelectedServiceId } from "@/lib/store/findjobslice";
const SearchResults = dynamic(() => import("../common/SearchResult"), {
    ssr: false,
    loading: () => <div className="hidden">Loading...</div>,
});
const BuyerRegistration = dynamic(
    () => import("../common/BuyerRegistration/BuyerRegistration"),
    {
        ssr: false,
        loading: () => <div className="hidden">Loading...</div>,
    }
);
import H2 from "../UI/Typography/H2";
import HomeGardenCarousel from "../Carousel/HomeCarousel";
import {
    carouselData,
    carouselData1,
    carouselData2,
} from "@/constants/blogPageData";
import CarouselCard from "../Carousel/CarouselCard";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import LocationIcon from "../../../../public/ReactIcons/LocationIcon";


function DiscoverServices() {
    const dispatch = useDispatch();
    //  const [selectedServiceId, setSelectedServiceId] = useState({
    //     id: null,
    //     name: "",
    //   });
    const [searchQuery, setSearchQuery] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const { selectedSearchService } = useSelector((state) => state.search);

    useEffect(() => {
        const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
        if (pendingModal?.shouldOpen) {
            setSelectedServiceId({
                id: pendingModal.serviceId,
                name: pendingModal.serviceName,
            });
            dispatch(setbuyerRequestData(pendingModal.buyerRequest));
            dispatch(setcitySerach(pendingModal.city));
            setShow(true);
            dispatch(setBuyerStep(7));
        }
    }, [dispatch]);
    return (
        <WrapperBGWidth>
            <div className="md:block px-2.5 py-5 sm:px-10 md:px-16 md:py-10 xl:px-[120px] pt-10 xl:pt-12 xl:pb-[72px]">
                <H2 className="hidden lg:block text-[#00afe3] pb-4 xl:pb-10 text-start">
                    Discover <span className="text-[#253238]">services.</span>{" "}
                </H2>
                <div>
                    <div>
                        <div className="flex lg:hidden justify-between pt-5 md:pt-0 pb-12 md:pb-10 xl:pb-10">
                            <H2 className="text-[#00AFE3]">Plumbing</H2>{" "}
                            <button className="font-bold text-xs sm:text-base tracking-[0.03em] leading-[18px] whitespace-nowrap">
                                <span className="underline">See all</span>
                            </button>
                        </div>
                        <HomeGardenCarousel
                            data={carouselData}
                            renderCard={(card) => <CarouselCard card={card} />}
                            showSpecial={true}
                        />
                    </div>
                    <div className="mt-[30px]">
                        <div className="flex lg:hidden justify-between pt-5 pb-12 xl:pb-10">
                            <H2 className="text-[#00AFE3]">Painting & Decorating</H2>{" "}
                            <button className="font-bold text-xs sm:text-base tracking-[0.03em] leading-[18px] whitespace-nowrap">
                                <span className="underline">See all</span>
                            </button>
                        </div>
                        <HomeGardenCarousel
                            data={carouselData1}
                            renderCard={(card) => <CarouselCard card={card} />}
                            showSpecial={true}
                        />
                    </div>
                </div>
            </div>

            <div className="px-2.5 sm:px-10 md:px-16 xl:px-[125px] mt-6 xl:mt-10">
                <div
                    className="
      bg-[#7ED5F1]
      rounded-[24px]
      px-6 py-6
      md:px-10 md:py-8
      flex flex-col lg:flex-row
      items-start lg:items-center
      justify-start lg:justify-center
      gap-10
    "
                >
                    <div className="relative max-w-[254px] md:max-w-[246px] lg:max-w-[404px] w-full">
                        <input
                            type="text"
                            placeholder="Search for a service"
                            className="
          text-[#B3B3B3] font-bold
          px-4 py-2.5
          md:px-6 md:py-2.5
          xl:px-[43px] xl:py-4
          text-base xl:text-[25px]!
          placeholder:text-base xl:placeholder:text-[25px]!
          bg-white
          border-[1.5px] border-gray-300
          rounded-[100px]
          w-full
          shadow-[0px_20px_40px_0px_rgba(0,0,0,0.5)]
          focus:outline-none
          text-left xl:mb-[30px]
        "
                            aria-label="Search for a service"
                            value={searchQuery || ""}
                            onChange={(e) => {
                                const search = e.target.value;
                                setSearchQuery(search);
                                if (search.trim() !== "") {
                                    dispatch(searchService({ search }));
                                }
                            }}
                        />

                        {searchQuery.length ? (
                            <SearchResults
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                setShow={setShow}
                                setSelectedServiceId={setSelectedServiceId}
                            />
                        ) : (
                            ""
                        )}

                        <div className="absolute inset-y-0 right-4 xl:right-10 flex items-center pointer-events-none xl:mb-[30px]">
                            <SearchIcon className="w-5 h-5 md:w-5 md:h-5 lg:w-8 lg:h-8" />
                        </div>
                    </div>
                    {show && (
                        <BuyerRegistration
                            closeModal={handleClose}
                            service_Id={selectedSearchService?.id}
                            serviceName={selectedSearchService?.service || ""}
                            service_Name={selectedSearchService?.service || ""}
                        // postcode={pincode}
                        // postalCodeValidate={postalCodeValidate}
                        />
                    )}

                    <div
                        className="
        text-white font-extrabold
        tracking-[-0.03em]
        text-left
        text-[50px] leading-[55px] -mt-[20px] lg:mt-0
      "
                    >
                        Free quotes, with zero
                        <p className="block">obligation.</p>
                        <div className="flex justify-start lg:justify-end mt-[15px] lg:mt-0">
                            <LocationIcon />
                        </div>
                    </div>


                </div>
            </div>

            <div className="md:block px-2.5 py-5 sm:px-10 md:px-16 md:py-10 xl:px-[120px] pt-10 xl:pt-12 xl:pb-[72px]">
                <div>
                    <div>
                        <div className="flex lg:hidden justify-between pt-5 md:pt-0 pb-12 md:pb-10 xl:pb-10">
                            <H2 className="text-[#00AFE3]">Plumbing</H2>{" "}
                            <button className="font-bold text-xs sm:text-base tracking-[0.03em] leading-[18px] whitespace-nowrap">
                                <span className="underline">See all</span>
                            </button>
                        </div>
                        <HomeGardenCarousel
                            data={carouselData2}
                            renderCard={(card) => <CarouselCard card={card} />}
                            showSpecial={true}
                        />
                    </div>
                    <div className="mt-[30px]">
                        <div className="flex lg:hidden justify-between pt-5 pb-12 xl:pb-10">
                            <H2 className="text-[#00AFE3]">Painting & Decorating</H2>{" "}
                            <button className="font-bold text-xs sm:text-base tracking-[0.03em] leading-[18px] whitespace-nowrap">
                                <span className="underline">See all</span>
                            </button>
                        </div>
                        <HomeGardenCarousel
                            data={carouselData2}
                            renderCard={(card) => <CarouselCard card={card} />}
                            showSpecial={true}
                        />
                    </div>
                    <div className="mt-[30px]">
                        <div className="flex lg:hidden justify-between pt-5 pb-12 xl:pb-10">
                            <H2 className="text-[#00AFE3]">Painting & Decorating</H2>{" "}
                            <button className="font-bold text-xs sm:text-base tracking-[0.03em] leading-[18px] whitespace-nowrap">
                                <span className="underline">See all</span>
                            </button>
                        </div>
                        <HomeGardenCarousel
                            data={carouselData2}
                            renderCard={(card) => <CarouselCard card={card} />}
                            showSpecial={true}
                        />
                    </div>
                </div>
            </div>
        </WrapperBGWidth>
    );
}

export default DiscoverServices;
