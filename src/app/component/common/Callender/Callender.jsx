"use client";
import { useState } from "react";
import Modal from "../Modal";
import CallenderLocationLeftSection from "./CallenderLocationLeftSection";
import CallenderLocationTimeSlot from "./CallenderLocationTimeSlot";
import { TIME_SLOTS } from "./CallenderLocation";
import { showToast } from "@/utils";
import CalendarPicker from "./CalendarPicker";
import { useSearchParams } from "next/navigation";
import { extractAllParams } from "@/utils/decodeURLParams";
import { useDispatch, useSelector } from "react-redux";
import { registerQuoteCustomer } from "@/lib/store/buyerslice/buyerSlice";
import useUserInfo from "@/utils/getUserIp";
import { ChevronLeft } from "lucide-react";

export default function Callender({ onSelect, nextStep, handleClose }) {
  const { buyerRequest, citySerach } = useSelector((state) => state.buyer);
  const dispatch = useDispatch();

  const { search } = useSearchParams();
  const allParams =
    typeof window !== "undefined" &&
    extractAllParams(search || window.location.search);
  const campaignid = allParams.campaign_id || "";
  const keyword = allParams.keyword || "";
  const gclid = allParams.gclid || "";
  const msclkid = allParams.msclkid || "";
  const adgroup_id = allParams.adgroup_id;
  const platform_source = allParams.source || "";
  const campaign = allParams.campaign || "";
  const adgroup = allParams.adgroup || "";
  const matchtype = allParams.matchtype || "";
  const device = allParams.device || "";
  const loc_physical_ms = allParams.loc_physical_ms || "";
  const utm_search_term = allParams.utm_search_term || "";
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [mobileStep, setMobileStep] = useState("calendar");

  const { ip, url } = useUserInfo();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else setCurrentMonth((m) => m - 1);
    setSelectedDate(null);
    setSelectedTime(null);
  };
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else setCurrentMonth((m) => m + 1);
    setSelectedDate(null);
    setSelectedTime(null);
  };
  console.log(buyerRequest, "buyerRequest");
  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      showToast("error", "Please select date and time");
      return;
    }
    onSelect?.({ date: selectedDate, time: selectedTime });

    console.log(selectedDate, "selectedDate", selectedTime, "selectedtime");
    const formData = new FormData();
    formData.append("name", buyerRequest?.name);
    formData.append("email", buyerRequest?.email);
    formData.append("phone", buyerRequest?.phone);
    formData.append("questions", JSON.stringify(buyerRequest?.questions));
    formData.append("service_id", buyerRequest?.service_id);
    formData?.append("city", citySerach);
    formData.append("postcode", buyerRequest?.postcode);
    formData.append("form_status", "1");
    formData.append("campaignid", campaignid || "");
    formData.append("gclid", gclid || "");
    formData.append("campaign", campaign || "");
    formData.append("adgroup", adgroup || "");
    formData.append("msclickid", msclkid || "");
    formData.append("adgroup_id", adgroup_id || "");
    formData.append("matchtype", matchtype || "");
    formData.append("device", device || "");
    formData.append("loc_physical_ms", loc_physical_ms || "");
    formData.append("utm_search_term", utm_search_term || "");
    formData.append("platform_source", platform_source);
    formData.append("keyword", keyword || "");

    formData.append("entry_url", url);
    formData.append("user_ip_address", ip);

    dispatch(registerQuoteCustomer(formData)).then((result) => {
      if (result) {
        nextStep();
      }
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setMobileStep("timeslot");
  };
  return (
    <Modal
      isOpen={true}
      onNext={handleConfirm}
      title="When do you need the work doing?"
      nextButtonText={"Continue"}
      // disableNext={loading || !selectedService || !postalCodeValidate}
      maxWidth="max-w-[95%] md:max-w-fit"
      onClose={() => {
        handleClose();
      }}
      padding="px-2.5 py-4 md:px-7.5 md:pt-3 pb-6"
    >
      {" "}
      <div className="flex flex-col md:flex-row gap-5">
        <CallenderLocationLeftSection />

        {/* Mobile: step-wise | Desktop: dono saath */}
        <div
          className={`${mobileStep === "calendar" ? "block" : "hidden"} md:block`}
        >
          <CalendarPicker
            currentYear={currentYear}
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
            onDateClick={handleDateClick}
          />
        </div>

        <div
          className={`${mobileStep === "timeslot" ? "block" : "hidden"} md:block`}
        >
          {/* Mobile Back Button */}
          <button
            onClick={() => setMobileStep("calendar")}
            className="flex md:hidden items-center gap-1 text-[#00AEEF] font-bold font-[Arial] text-sm mb-3"
          >
            <ChevronLeft size={18} /> Back to Calendar
          </button>

          <CallenderLocationTimeSlot
            TIME_SLOTS={TIME_SLOTS}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>
      </div>
    </Modal>
  );
}
