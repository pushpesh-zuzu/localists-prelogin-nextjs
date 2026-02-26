"use client";

import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { clearSetbuyerRequestData, getAutoBid, questionAnswerData, addMultipleManualBid, setBuyerStep } from "@/lib/store/buyerslice/buyerSlice";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
import Image from "next/image";
import LocationMapIcon from "../../common/icons/SellerRegistration/LocationMapIcon";
import { getBarkToken } from "@/utils/CookiesHelper";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
import { useRouter } from "next/navigation";



function SeeMyMatchesModal({ onClose, nextStep, previousStep, progressPercent, setShowConfirmModal }) {
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
    //                 "avg_rating": 0,
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
    //                 "avg_rating": 0,
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
    //                 "avg_rating": 0,
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
    //                 "avg_rating": 0,
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
    //                 "avg_rating": 0,
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
    //                 "avg_rating": 0,
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
    //                 "avg_rating": 0,
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

    // ✅ Call API once
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
        if (selectedCompanies.length === 0) return;

        const manualBidPayload = {
            service_id: selectedCompanies.map((c) => c.service_id),
            seller_id: selectedCompanies.map((c) => c.user_id),
            bid: selectedCompanies.map((c) => c.credit_score),
            distance: selectedCompanies.map((c) => c.distance),
            lead_id: requestId,
            user_id: requestUserId,
        };

        const result = await dispatch(addMultipleManualBid(manualBidPayload));
        if (result) {
            // dispatch(setBuyerStep(0));
            router.push(`/conversion/${requestId}`);
        }

        // if (result) {
        //     // nextStep();
        // }
    };

    const handleCloseClick = () => {
        if (questionAnswerData?.length === 0) {
            onClose();
            dispatch(clearSetbuyerRequestData());
            dispatch(clearBuyerRegisterFormData());
        } else {
            if (!getBarkToken()) {
                setShowConfirmModal(true);
            } else {
                onClose();
                dispatch(clearSetbuyerRequestData());
                dispatch(clearBuyerRegisterFormData());
            }
        }
    };

    const handleBack = () => {
        previousStep();
    };

    return (
        <Modal
            onClose={() => {
                handleCloseClick();
            }}
            isOpen={true}
            title="Select up to 5 companies to get a quote"
            onNext={handleSubmit}
            onBack={handleBack}
            maxWidth="max-w-[90%] md:max-w-[80%] lg:max-w-[760px]"
            maxHeight="max-h-[80vh] lg:max-h-[90vh]"
            padding="pb-[20px] md:pb-[30px] lg:pb-[40px]"
            buyerStep={buyerStep}
            fixedHeight={true}
            showProgressBar={true}
            titleClassName="text-center"
            buttongroup="md:mx-[68.4px] mx-4"
            showButtons={true}
            disabled={selectedCompanies.length === 0}
            descriptionText="Unfortunately the company you selected doesn’t serve your postcode,
                    but why not select up to 5 companies below who do."
            progressPercent={progressPercent}
            nextButtonText={
                selectedCompanies.length > 0
                    ? `Send ${selectedCompanies.length}`
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

                            {visibleSellers.map((company) => {
                                const isSelected = selectedCompanies.some(
                                    (item) => item.id === company.id
                                );

                                const disableCheckbox =
                                    !isSelected && selectedCompanies.length >= 5;

                                return (
                                    <div
                                        key={company.id}
                                        onClick={() => {
                                            if (!disableCheckbox) {
                                                handleCheckboxChange(company);
                                            }
                                        }}
                                        className={`
                            w-full
                            p-4
                            rounded-xl
                            border
                            transition-all
                            cursor-pointer
                            ${isSelected
                                                ? "border-[#00afe3] bg-[#f0fbff]"
                                                : "border-[#e1e5e9] bg-white hover:border-[#00afe3]"
                                            }
                        `} >
                                        <div className="flex justify-between items-center gap-4">

                                            {/* LEFT SIDE */}
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

                                                    <div className="flex items-center gap-1 mt-1">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <span
                                                                key={i}
                                                                className="text-[#00c853] text-sm"
                                                            >
                                                                {i < Math.round(company.avg_rating || 0)
                                                                    ? "★"
                                                                    : "☆"}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                                                        <LocationMapIcon className="w-4 h-4" background="#00afe3" />
                                                        <span>Operates in {company.postcode}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CHECKBOX */}
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                readOnly
                                                disabled={disableCheckbox}
                                                className="w-5 h-5 accent-[#00afe3] pointer-events-none"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* ✅ Show More INSIDE scroll area */}
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