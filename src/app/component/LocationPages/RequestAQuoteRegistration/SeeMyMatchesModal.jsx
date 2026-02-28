"use client";

import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { clearSetbuyerRequestData, getAutoBid, addMultipleManualBid, setBuyerStep, setQualityData } from "@/lib/store/buyerslice/buyerSlice";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
import Image from "next/image";
import LocationMapIcon from "../../common/icons/SellerRegistration/LocationMapIcon";
// import { getBarkToken } from "@/utils/CookiesHelper";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
import { useRouter } from "next/navigation";
import StarIconFeature from "../../../../../public/ReactIcons/StarIconFeature";
import HalfStarIconFeature from "../../../../../public/ReactIcons/HalfStarIconFeature";

function SeeMyMatchesModal({ previousStep, progressPercent }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const {
        autoBidData,
        autoBidListLoader,
        buyerStep,
        requestId,
        requestUserId,
    } = useSelector((state) => state.buyer);

    // const autoBidData = [
    //     {
    //         "service_name": "Roofing",
    //         "sellersCount": 1,
    //         "sellers": [
    //             {
    //                 "id": 1701,
    //                 "name": "Bade67",
    //                 "email": "Bade@gmail.com",
    //                 "phone": "+447894561230",
    //                 "profile_image": "6989ee63d18a5_1770647139.jpg",
    //                 "total_credit": "966",
    //                 "avg_rating": 1,
    //                 "about_company": null,
    //                 "form_status": 1,
    //                 "business_profile_name": "BadeBusineed",
    //                 "company_logo": "6989ee63d0e4f_1770647139.jpg",
    //                 "is_autobid": 1,
    //                 "autobid_pause": 0,
    //                 "user_id": 1705,
    //                 "service_id": 113,
    //                 "miles": "20",
    //                 "nation_wide": 0,
    //                 "postcode": "E1 1AA",
    //                 "response_time": "15",
    //                 "lat": "51.519018",
    //                 "lng": "-0.058133",
    //                 "distance": 0,
    //                 "user_created_time": "2026-02-09 14:24:17",
    //                 "credit_score": 35,
    //                 "service_name": "Roofing",
    //                 "quicktorespond": 1
    //             },
    //             {
    //                 "id": 1702,
    //                 "name": "Bade67",
    //                 "email": "Bade@gmail.com",
    //                 "phone": "+447894561230",
    //                 "profile_image": "6989ee63d18a5_1770647139.jpg",
    //                 "total_credit": "966",
    //                 "avg_rating": "1.1",
    //                 "about_company": null,
    //                 "form_status": 1,
    //                 "business_profile_name": "BadeBusineed",
    //                 "company_logo": "6989ee63d0e4f_1770647139.jpg",
    //                 "is_autobid": 1,
    //                 "autobid_pause": 0,
    //                 "user_id": 1705,
    //                 "service_id": 113,
    //                 "miles": "20",
    //                 "nation_wide": 0,
    //                 "postcode": "E1 1AA",
    //                 "response_time": "15",
    //                 "lat": "51.519018",
    //                 "lng": "-0.058133",
    //                 "distance": 0,
    //                 "user_created_time": "2026-02-09 14:24:17",
    //                 "credit_score": 35,
    //                 "service_name": "Roofing",
    //                 "quicktorespond": 1
    //             },
    //             {
    //                 "id": 1703,
    //                 "name": "Bade67",
    //                 "email": "Bade@gmail.com",
    //                 "phone": "+447894561230",
    //                 "profile_image": "6989ee63d18a5_1770647139.jpg",
    //                 "total_credit": "966",
    //                 "avg_rating": "1.4",
    //                 "about_company": null,
    //                 "form_status": 1,
    //                 "business_profile_name": "BadeBusineed",
    //                 "company_logo": "6989ee63d0e4f_1770647139.jpg",
    //                 "is_autobid": 1,
    //                 "autobid_pause": 0,
    //                 "user_id": 1705,
    //                 "service_id": 113,
    //                 "miles": "20",
    //                 "nation_wide": 0,
    //                 "postcode": "E1 1AA",
    //                 "response_time": "15",
    //                 "lat": "51.519018",
    //                 "lng": "-0.058133",
    //                 "distance": 0,
    //                 "user_created_time": "2026-02-09 14:24:17",
    //                 "credit_score": 35,
    //                 "service_name": "Roofing",
    //                 "quicktorespond": 1
    //             },
    //             {
    //                 "id": 1704,
    //                 "name": "Bade67",
    //                 "email": "Bade@gmail.com",
    //                 "phone": "+447894561230",
    //                 "profile_image": "6989ee63d18a5_1770647139.jpg",
    //                 "total_credit": "966",
    //                 "avg_rating": "2.5",
    //                 "about_company": null,
    //                 "form_status": 1,
    //                 "business_profile_name": "BadeBusineed",
    //                 "company_logo": "6989ee63d0e4f_1770647139.jpg",
    //                 "is_autobid": 1,
    //                 "autobid_pause": 0,
    //                 "user_id": 1705,
    //                 "service_id": 113,
    //                 "miles": "20",
    //                 "nation_wide": 0,
    //                 "postcode": "E1 1AA",
    //                 "response_time": "15",
    //                 "lat": "51.519018",
    //                 "lng": "-0.058133",
    //                 "distance": 0,
    //                 "user_created_time": "2026-02-09 14:24:17",
    //                 "credit_score": 35,
    //                 "service_name": "Roofing",
    //                 "quicktorespond": 1
    //             },
    //             {
    //                 "id": 1705,
    //                 "name": "Bade67",
    //                 "email": "Bade@gmail.com",
    //                 "phone": "+447894561230",
    //                 "profile_image": "6989ee63d18a5_1770647139.jpg",
    //                 "total_credit": "966",
    //                 "avg_rating": 2.6,
    //                 "about_company": null,
    //                 "form_status": 1,
    //                 "business_profile_name": "BadeBusineed",
    //                 "company_logo": "6989ee63d0e4f_1770647139.jpg",
    //                 "is_autobid": 1,
    //                 "autobid_pause": 0,
    //                 "user_id": 1705,
    //                 "service_id": 113,
    //                 "miles": "20",
    //                 "nation_wide": 0,
    //                 "postcode": "E1 1AA",
    //                 "response_time": "15",
    //                 "lat": "51.519018",
    //                 "lng": "-0.058133",
    //                 "distance": 0,
    //                 "user_created_time": "2026-02-09 14:24:17",
    //                 "credit_score": 35,
    //                 "service_name": "Roofing",
    //                 "quicktorespond": 1
    //             },
    //             {
    //                 "id": 1706,
    //                 "name": "Bade67",
    //                 "email": "Bade@gmail.com",
    //                 "phone": "+447894561230",
    //                 "profile_image": "6989ee63d18a5_1770647139.jpg",
    //                 "total_credit": "966",
    //                 "avg_rating": 2.9,
    //                 "about_company": null,
    //                 "form_status": 1,
    //                 "business_profile_name": "BadeBusineed",
    //                 "company_logo": "6989ee63d0e4f_1770647139.jpg",
    //                 "is_autobid": 1,
    //                 "autobid_pause": 0,
    //                 "user_id": 1705,
    //                 "service_id": 113,
    //                 "miles": "20",
    //                 "nation_wide": 0,
    //                 "postcode": "E1 1AA",
    //                 "response_time": "15",
    //                 "lat": "51.519018",
    //                 "lng": "-0.058133",
    //                 "distance": 0,
    //                 "user_created_time": "2026-02-09 14:24:17",
    //                 "credit_score": 35,
    //                 "service_name": "Roofing",
    //                 "quicktorespond": 1
    //             },
    //             {
    //                 "id": 1707,
    //                 "name": "Bade67",
    //                 "email": "Bade@gmail.com",
    //                 "phone": "+447894561230",
    //                 "profile_image": "6989ee63d18a5_1770647139.jpg",
    //                 "total_credit": "966",
    //                 "avg_rating": 3.6,
    //                 "about_company": null,
    //                 "form_status": 1,
    //                 "business_profile_name": "BadeBusineed",
    //                 "company_logo": "6989ee63d0e4f_1770647139.jpg",
    //                 "is_autobid": 1,
    //                 "autobid_pause": 0,
    //                 "user_id": 1705,
    //                 "service_id": 113,
    //                 "miles": "20",
    //                 "nation_wide": 0,
    //                 "postcode": "E1 1AA",
    //                 "response_time": "15",
    //                 "lat": "51.519018",
    //                 "lng": "-0.058133",
    //                 "distance": 0,
    //                 "user_created_time": "2026-02-09 14:24:17",
    //                 "credit_score": 35,
    //                 "service_name": "Roofing",
    //                 "quicktorespond": 1
    //             },
    //         ],
    //         "displayCount": "5",
    //         "baseurl": "https://dev.localists.com/admin/storage/app/public/images/users",
    //         "w80": 4,
    //         "repliesListCount": 0
    //     }
    // ]

    const hasFetched = useRef(false);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [showAll, setShowAll] = useState(false);

    // Call API once
    useEffect(() => {
        if (!hasFetched.current && requestId && requestUserId) {
            dispatch(
                getAutoBid({
                    user_id: requestUserId,
                    lead_id: requestId,
                })
            );
            hasFetched.current = true;
        }
    }, [dispatch, requestId, requestUserId]);

    const serviceData = autoBidData?.[0];
    const sellers = serviceData?.sellers || [];
    const displayCount = Number(serviceData?.displayCount || 0);

    const visibleSellers = showAll
        ? sellers
        : sellers.slice(0, displayCount);

    const handleCheckboxChange = (company) => {
        const exists = selectedCompanies.find(
            (item) => item.id === company.id
        );

        if (exists) {
            setSelectedCompanies((prev) =>
                prev.filter((item) => item.id !== company.id)
            );
        } else {
            if (selectedCompanies.length < 5) {
                setSelectedCompanies((prev) => [...prev, company]);
            }
        }
    };

    const handleSubmit = async () => {
        if (!selectedCompanies.length) return;

        const manualBidPayload = {
            service_id: selectedCompanies.map((c) => c.service_id),
            seller_id: selectedCompanies.map((c) => c.user_id),
            bid: selectedCompanies.map((c) => c.credit_score),
            distance: selectedCompanies.map((c) => c.distance),
            lead_id: requestId,
            user_id: requestUserId,
        };

        try {
            // Wait for API dispatch
            await dispatch(addMultipleManualBid(manualBidPayload));

            // Clear redux state
            dispatch(clearSetbuyerRequestData());
            dispatch(clearBuyerRegisterFormData());
            dispatch(setQualityData());
            dispatch(setBuyerStep(10));
            localStorage.removeItem("pendingBuyerModal");
            // Navigate after everything
            router.push(`/conversion/${requestId}`);

        } catch (error) {
            console.error("Manual bid failed:", error);
        }
    };

    const handleBack = () => {
        previousStep();
    };

    return (
        <Modal
            showClosIcon={false}
            isOpen={true}
            title="Select up to 5 companies to get a quote"
            onNext={handleSubmit}
            onBack={handleBack}
            maxWidth="max-w-[90%] md:max-w-[80%] lg:max-w-[760px]"
            maxHeight="max-h-[95vh]"
            padding="pb-[20px] md:pb-[30px] lg:pb-[30px]"
            buyerStep={buyerStep}
            fixedHeight={true}
            showProgressBar={true}
            titleClassName="text-center"
            buttongroup="lg:mx-[75.4px] md:mx-[63px] mx-[18px]"
            showButtons={true}
            disabled={selectedCompanies.length === 0}
            descriptionText="Unfortunately the company you selected doesn’t serve your postcode,
                    but why not select up to 5 companies below who do."
            progressPercent={progressPercent}
            nextButtonText={
                selectedCompanies.length > 0
                    ? `(${selectedCompanies.length}) Send`
                    : "Send"
            }        >
            <div className="mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-[608px]">
                {/* Loader */}
                {autoBidListLoader && (
                    <div className="flex justify-center py-6">
                        <LoaderIndicator size="large" />
                    </div>
                )}

                {!autoBidListLoader && serviceData && (
                    <div className="overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {visibleSellers.map((company, index) => {
                                const isSelected = selectedCompanies.some(
                                    (item) => item.id === company.id
                                );

                                const disableCheckbox =
                                    !isSelected && selectedCompanies.length >= 5;

                                // RATING LOGIC
                                const rating = Number(company.avg_rating || 0);
                                const fullStars = Math.floor(rating);
                                const decimal = rating - fullStars;
                                const showHalf = decimal >= 0.5;
                                const emptyStars =
                                    5 - fullStars - (showHalf ? 1 : 0);

                                return (
                                    <div
                                        key={company.id}
                                        onClick={() => {
                                            if (!disableCheckbox) {
                                                handleCheckboxChange(company);
                                            }
                                        }}
                                        className={`
                                                        relative
                                                         w-full
                                                p-4
                                                    rounded-[20px]
                                                        border
                                                transition-all
                                                        cursor-pointer
                                                        ${isSelected
                                                ? "border-[#00afe3] bg-[#f0fbff]"
                                                : "border-[#e1e5e9] bg-white hover:border-[#00afe3]"
                                            }
                                              ${
                                            /* If last item AND total count is odd */
                                            sellers.length % 2 !== 0 &&
                                                index === visibleSellers.length - 1
                                                ? "md:col-span-2 md:max-w-[300px] md:mx-auto"
                                                : ""
                                            }`}
                                    >
                                        {/* Custom Checkbox Top Right */}
                                        <div
                                            className={`
      absolute top-1 right-2
      h-5 w-5
      rounded-[5px]
      border-2
      flex items-center justify-center
      transition-all duration-300
      ${isSelected
                                                    ? "bg-[#00afe3] border-[#00afe3] scale-100"
                                                    : "bg-white border-[#d9d9d9] scale-95"
                                                }
      ${disableCheckbox ? "opacity-40" : ""}
    `}
                                        >
                                            <svg
                                                className={`h-3.5 w-3.5 text-white transition-opacity duration-200 ${isSelected ? "opacity-100" : "opacity-0"
                                                    }`}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 relative">
                                                <Image
                                                    src={
                                                        company.company_logo
                                                            ? `${serviceData.baseurl}/${company.company_logo}`
                                                            : ""
                                                    }
                                                    alt={company.business_profile_name}
                                                    fill
                                                    className="object-cover rounded-md"
                                                    sizes="56px"
                                                />
                                            </div>

                                            <div>
                                                <p className="font-bold text-[#253238]">
                                                    {company.business_profile_name}
                                                </p>

                                                {/* STARS */}
                                                <div className="flex items-center gap-2 text-sm mt-1">
                                                    <div className="flex text-emerald-500">
                                                        {[...Array(fullStars)].map((_, i) => (
                                                            <StarIconFeature
                                                                key={`full-${i}`}
                                                                className="h-[14px] w-[14px]"
                                                            />
                                                        ))}

                                                        {showHalf && (
                                                            <HalfStarIconFeature
                                                                className="h-[14px] w-[14px]"
                                                            />
                                                        )}

                                                        {[...Array(emptyStars)].map((_, i) => (
                                                            <StarIconFeature
                                                                background1="#dfdfe8"
                                                                background2="#dfdfe8"
                                                                key={`empty-${i}`}
                                                                className="h-[14px] w-[14px]"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                                                    <LocationMapIcon
                                                        className="w-4 h-4"
                                                        background="#00afe3"
                                                    />
                                                    <span>Operates in {company.postcode}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Show More Button */}
                        {!showAll && sellers.length > displayCount && (
                            <div className="text-center pt-[25px]">
                                <button
                                    onClick={() => setShowAll(true)}
                                    className="
            bg-[#253238]
            text-white
            px-6
            py-2
            rounded-full
            font-semibold
            transition-all
            duration-300
            hover:bg-[#1b262c]
            hover:shadow-md
            cursor-pointer
        " >
                                    Show More
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default SeeMyMatchesModal;