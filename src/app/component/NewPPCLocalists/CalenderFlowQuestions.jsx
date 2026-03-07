"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, ArrowLeft } from "lucide-react";
import H5 from "../UI/Typography/H5";
import CardLayoutWrapper from "./CardLayoutWrapper";
import Paragraph from "../UI/Typography/Paragraph";

const TIME_SLOTS = [
    "09:00 AM - 12:00 PM",
    "12:00 PM - 03:00 PM",
    "03:00 PM - 06:00 PM",
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

function getTodayInLondon() {
    const londonDateStr = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());
    const [day, month, year] = londonDateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
}

export default function CalenderFlowQuestions({ nextStep, onBack }) {
    const today = getTodayInLondon();

    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());

    const [selectedDates, setSelectedDates] = useState([]);
    const [error, setError] = useState("");

    // const [showMobileSlots, setShowMobileSlots] = useState(false);
    // const [isMobile, setIsMobile] = useState(false);

    // useEffect(() => {
    //     const handleResize = () => setIsMobile(window.innerWidth < 768);
    //     handleResize();
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    // Today midnight & max allowed date (today + 28 days)
    const todayMidnight = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
    );
    const maxDate = new Date(todayMidnight);
    maxDate.setDate(maxDate.getDate() + 28);

    // Next month button disabled if entire next month is beyond maxDate
    const isNextDisabled = (() => {
        const nextMonthFirst = new Date(
            currentMonth === 11 ? currentYear + 1 : currentYear,
            currentMonth === 11 ? 0 : currentMonth + 1,
            1,
        );
        return nextMonthFirst > maxDate;
    })();

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
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((y) => y + 1);
        } else setCurrentMonth((m) => m + 1);
    };

    const isToday = (day) =>
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

    const isPast = (day) => {

        // new Date(currentYear, currentMonth, day) <=
        // new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const date = new Date(currentYear, currentMonth, day);
        return date <= todayMidnight || date > maxDate;
    }


    const isSelected = (day) =>
        selectedDates.some(
            (d) =>
                d.date.getDate() === day &&
                d.date.getMonth() === currentMonth &&
                d.date.getFullYear() === currentYear
        );

    const handleDateClick = (day) => {
        if (isPast(day)) return;

        const clickedDate = new Date(currentYear, currentMonth, day);

        const exists = selectedDates.find(
            (d) => d.date.getTime() === clickedDate.getTime()
        );

        if (exists) {
            setSelectedDates(
                selectedDates.filter((d) => d.date.getTime() !== clickedDate.getTime())
            );
            setError("");
            return;
        }

        if (selectedDates.length >= 3) {
            setError("You can select maximum 3 dates");
            return;
        }

        setSelectedDates([...selectedDates, { date: clickedDate, slots: [] }]);
        setError("");
    };

    const handleSlotSelect = (dateIndex, slot) => {
        const updated = [...selectedDates];

        const exists = updated[dateIndex].slots.includes(slot);

        if (exists) {
            updated[dateIndex].slots = updated[dateIndex].slots.filter(
                (s) => s !== slot
            );
        } else {
            updated[dateIndex].slots.push(slot);
        }

        setSelectedDates(updated);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const handleSubmit = () => {
        if (selectedDates.length === 0)
            return setError("Please select at least one date");

        const missingSlots = selectedDates.some((d) => d.slots.length === 0);

        if (missingSlots)
            return setError("Please select at least one slot for each date");

        setError("");
        nextStep(selectedDates);
    };

    const handleBackClick = () => {
        onBack();
    };

    return (
        <div className=" w-[970px]
        bg-white
        rounded-[20px]
        overflow-hidden
        max-[1024px]:w-full
        max-[1024px]:max-w-[970px]
        max-[1024px]:mx-auto">
            <div className="pt-[20px] md:pt-[30px] lg:pt-[40px] pb-[20px] px-[20px] md:px-[60px] w-full mx-auto">
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
                        When are you available?
                    </h4>

                    <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
                        <div>
                            <H5 variant="optional" className="!font-medium text-left md:text-center">
                                Free Home Visit With Localitsts
                            </H5>
                            <Paragraph variant="optional" className="!font-medium lg:pt-[20px] pt-[10px] text-left text-[#3A4B53]">Book in with Localist at a time that suits you. We will visit your property and assess your roofing needs then provide you with a detailed free quote.</Paragraph>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5">
                            {/* Calendar Box */}
                            <div className={` flex-1 bg-white rounded-[24px] h-fit md:min-w-[300px] lg:min-w-[400px] border-2 border-[#E5E7EB] p-5 shadow-sm`}>
                                {/* Month */}
                                <div className="flex items-center justify-between mb-5">
                                    <button
                                        onClick={prevMonth}
                                        disabled={isPrevDisabled}
                                        className={`h-9 w-9 rounded-full flex items-center justify-center bg-[#EBF9F3] cursor-pointer hover:bg-[#00AEEF] hover:text-white transition text-[#00AEEF]
                                        disabled:bg-white disabled:text-gray-300 disabled:cursor-not-allowed
                                        `}
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <span className="font-bold font-[Arial] text-[16px] md:text-[18px] tracking-[-0.03em] text-[#253238]">
                                        {MONTHS[currentMonth]} {currentYear}
                                    </span>
                                    <button
                                        onClick={nextMonth}
                                        disabled={isNextDisabled}
                                        className={`h-9 w-9 rounded-full flex items-center justify-center bg-[#EBF9F3] cursor-pointer hover:bg-[#00AEEF] hover:text-white transition text-[#00AEEF]
                                        disabled:bg-white disabled:text-gray-300 disabled:cursor-not-allowed
                                        `}
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
                    ${past ? "text-[#D1D5DB] bg-gray-100 cursor-not-allowed" : "cursor-pointer"}
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
                            </div>
                        </div>
                    </div>

                    {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5"> */}
                    <div className="
w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
gap-6 mt-5 max-h-[230px] md:max-h-[250px] lg:max-h-full
overflow-y-auto lg:overflow-visible pr-2 [&::-webkit-scrollbar]:w-1
[&::-webkit-scrollbar-thumb]:bg-gray-300
[&::-webkit-scrollbar-thumb]:rounded-full
">
                        {selectedDates.map((item, index) => (
                            <div key={index} className="">
                                <div className="flex items-center gap-2 md:mb-2 mb-2 lg:mb-1">
                                    <Clock size={16} className="text-[#00AEEF]" />
                                    <span className="text-[14px] font-bold text-[#6B7280] tracking-[-0.03em] font-[Arial]">
                                        Available Time Slots
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 bg-[#EBF9F3] rounded-full px-4 py-2 w-fit mb-3">
                                    <span className="text-[#00AEEF] text-[13px] font-bold">
                                        {formatDate(item.date)}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {TIME_SLOTS.map((slot) => (
                                        <button
                                            key={slot}
                                            onClick={() => handleSlotSelect(index, slot)}
                                            className={`w-full cursor-pointer py-2 px-4 rounded-xl border-2 text-[14px] font-bold
                          ${item.slots.includes(slot)
                                                    ? "bg-[#00AEEF] border-[#00AEEF] text-white"
                                                    : "border-[#D1FAE5] text-[#00AEEF]"
                                                }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}

                                </div>
                            </div>
                        ))}
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
