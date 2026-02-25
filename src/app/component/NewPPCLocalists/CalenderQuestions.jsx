"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, ArrowLeft } from "lucide-react";
import H5 from "../UI/Typography/H5";
import CardLayoutWrapper from "./CardLayoutWrapper";
import Paragraph from "../UI/Typography/Paragraph";

const TIME_SLOTS = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

export default function CalenderQuestions({ nextStep, onBack }) {
    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [error, setError] = useState("");
    const [showMobileSlots, setShowMobileSlots] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setShowMobileSlots(false);
        }
    }, [isMobile]);

    useEffect(() => {
        // Desktop & Tablet: auto-select today
        if (!isMobile && !selectedDate) {
            setSelectedDate(
                new Date(today.getFullYear(), today.getMonth(), today.getDate())
            );
        }

        // Mobile: ensure no default date
        if (isMobile && selectedDate) {
            setSelectedDate(null);
            setSelectedTime(null);
        }
    }, [isMobile]);

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const isPrevDisabled =
        currentYear < today.getFullYear() ||
        (currentYear === today.getFullYear() &&
            currentMonth <= today.getMonth());

    const prevMonth = () => {
        if (isPrevDisabled) return;

        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((y) => y - 1);
        } else {
            setCurrentMonth((m) => m - 1);
        }

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

    const isToday = (day) =>
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

    const isPast = (day) =>
        new Date(currentYear, currentMonth, day) <
        new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const isSelected = (day) =>
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;

    const handleDateClick = (day) => {
        if (isPast(day)) return;
        setSelectedDate(new Date(currentYear, currentMonth, day));
        setSelectedTime(null);
        setError("");

        if (isMobile) setShowMobileSlots(true);
    };

    const formatSelected = () => {
        if (!selectedDate) return "";
        return selectedDate.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const handleSubmit = () => {
        if (!selectedDate) return setError("Please select a date");
        if (!selectedTime) return setError("Please select a time");
        setError("");
        nextStep();
    };

    const handleBackClick = () => {
        onBack();
    };

    // console.log("showMobileSlots", isMobile)

    return (
        <div className=" w-[1070px]
        bg-white
        rounded-[20px]
        overflow-hidden
        max-[1024px]:w-full
        max-[1024px]:max-w-[1070px]
        max-[1024px]:mx-auto">
            <div className="pt-[20px] md:pt-[30px] lg:pt-[40px] pb-[20px] px-[20px] w-full mx-auto">
                <CardLayoutWrapper
                    // title="When do you need the work doing?"
                    onButtonClick={handleSubmit}
                    onBackClick={handleBackClick}
                    showBackButton={true}
                    buttonText="Next"
                    calendarQuestion={true}
                    buttonWrapperClassName=" lg:w-[535px] lg:mx-auto"
                >
                    <h4 className="text-[#00afe3] lg:pb-[30px] md:pb-[20px] pb-[10px]
                    font-Inter font-black tracking-[-0.03em] text-[20px] leading-[20px]
                    md:text-[25px] md:leading-[25px] lg:text-[30px] lg:leading-[30px]">
                        When do you need the work doing?
                    </h4>

                    {showMobileSlots && (
                        <div className="flex items-center gap-3 mb-4 md:hidden">
                            <button
                                onClick={() => {
                                    setShowMobileSlots(false),
                                        setSelectedTime(null)
                                }}
                                className="h-9 w-9
        flex items-center justify-center
        rounded-full
        border border-[#D1FAE5]
        text-[#00AEEF]
        hover:bg-[#EBF9F3]
        transition" aria-label="Back to calendar"
                            >
                                <ArrowLeft size={20} strokeWidth={2} />
                            </button>
                            <span className="font-medium text-[15px] text-[#253238]">
                                {formatSelected()}
                            </span>
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-5">
                        <div>
                            <H5 variant="optional" className="!font-medium text-left md:text-center">
                                Free Home Visit With Localitsts
                            </H5>
                            <Paragraph variant="optional" className="!font-medium lg:pt-[20px] pt-[10px] text-left">Book in with Localist at a time that suits you. We will visit your property and assess your roofing needs then provide you with a detailed free quote.</Paragraph>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5">
                            {/* Calendar Box */}
                            <div className={`${showMobileSlots ? "hidden md:block" : "block"} flex-1 bg-white rounded-[24px] h-fit md:min-w-[300px] lg:min-w-[400px] border-2 border-[#E5E7EB] p-5 shadow-sm`}>
                                {/* Month */}
                                <div className="flex items-center justify-between mb-5">
                                    <button
                                        onClick={prevMonth}
                                        disabled={isPrevDisabled}
                                        className={`
                                                    h-9 w-9 rounded-full flex items-center justify-center transition
                                                    ${isPrevDisabled
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "hover:bg-gray-100 text-[#253238] cursor-pointer"
                                            }
                                        `}
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <span className="font-bold font-[Arial] text-[16px] md:text-[18px] tracking-[-0.03em] text-[#253238]">
                                        {MONTHS[currentMonth]} {currentYear}
                                    </span>
                                    <button
                                        onClick={nextMonth}
                                        className="h-9 w-9 rounded-full flex items-center justify-center bg-[#EBF9F3] cursor-pointer hover:bg-[#00AEEF] hover:text-white transition text-[#00AEEF]"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>

                                {/* Day Headers */}
                                <div className="grid grid-cols-7 mb-2">
                                    {DAYS.map((d) => (
                                        <div
                                            key={d}
                                            className="text-center text-[11px] md:text-[13px] font-bold text-[#9CA3AF] py-1" >
                                            {d}
                                        </div>
                                    ))}
                                </div>

                                {/* Day Cells */}
                                <div className="grid grid-cols-7 gap-y-2">
                                    {/* Empty cells */}
                                    {Array.from({ length: firstDay }).map((_, i) => (
                                        <div key={`empty-${i}`} />
                                    ))}
                                    {Array.from({ length: daysInMonth }).map((_, i) => {
                                        const day = i + 1;
                                        const past = isPast(day);
                                        const selected = isSelected(day);
                                        const todayDay = isToday(day);
                                        return (
                                            <button
                                                key={day}
                                                disabled={past}
                                                onClick={() => handleDateClick(day)}
                                                className={`
                    mx-auto flex items-center justify-center
                    h-6.5 w-6.5 md:h-8.5 md:w-8.5 lg:h-10 lg:w-10 rounded-full
                    text-[13px] md:text-[15px] font-bold font-[Arial] transition-all
                    ${past ? "text-[#D1D5DB] cursor-not-allowed" : "cursor-pointer"}
                    ${selected ? "bg-[#00AEEF] text-white shadow-md scale-105" : ""}
                    ${todayDay && !selected ? "ring-2 ring-[#00AEEF] text-[#00AEEF]" : ""}
                    ${!selected && !past && !todayDay ? "bg-[#EBF9F3] hover:text-[#253238] text-[#00AEEF]" : ""}
                  `} >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Selected date pill */}
                                {selectedDate && (
                                    <div className="mt-4 flex items-center gap-2 bg-[#EBF9F3] rounded-full px-4 py-2 w-fit">
                                        <span className="text-[#00AEEF] text-[13px] font-bold font-[Arial]">
                                            {formatSelected()}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Time Slots */}
                            <div
                                className={`transition-all duration-300 w-full lg:w-[240px] md:w-[130px] ${showMobileSlots ? "block" : "hidden md:block"}`}
                            >
                                <div className="flex items-center gap-2 md:mb-2 mb-3.5 lg:mb-4">
                                    <Clock size={16} className="text-[#00AEEF]" />
                                    <span className="text-[14px] font-bold text-[#6B7280] tracking-[-0.03em] font-[Arial]">
                                        Available Times
                                    </span>
                                </div>
                                <div
                                    className="flex flex-row flex-wrap pb-1 md:flex-col gap-2 max-h-[300px] md:max-h-[360px] overflow-y-auto pr-1 cursor-pointer
            [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-4 [&::-webkit-scrollbar-track]:bg-gray-100 
            [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full"
                                >
                                    {TIME_SLOTS.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => {
                                                setSelectedTime(time);
                                                setError("");
                                            }}
                                            className={`
                  min-w-[110px] md:w-full py-2.5 px-4 rounded-xl border-2 text-[14px] font-bold font-[Arial] cursor-pointer
                  tracking-[-0.02em] transition-all
                  ${selectedTime === time
                                                    ? "bg-[#00AEEF] border-[#00AEEF] text-white shadow-md"
                                                    : "border-[#D1FAE5] text-[#00AEEF] hover:border-[#00AEEF] hover:bg-[#EBF9F3]"
                                                }
                `}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm font-medium lg:pt-3 md:pt-0 pt-2 text-left lg:text-center">
                            {error}
                        </p>
                    )}
                </CardLayoutWrapper>
            </div>
        </div>
    );
}
