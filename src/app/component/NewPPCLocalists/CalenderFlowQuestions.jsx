"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, ArrowLeft } from "lucide-react";
// import H5 from "../UI/Typography/H5";
import CardLayoutWrapper from "./CardLayoutWrapper";
// import Paragraph from "../UI/Typography/Paragraph";

const TIME_SLOTS = [
    {
        label: "Morning",
        time: "09:00 AM - 12:00 PM",
    },
    {
        label: "Afternoon",
        time: "12:00 PM - 03:00 PM",
    },
    {
        label: "Evening",
        time: "03:00 PM - 06:00 PM",
    },
];

const SLOT_LABELS = {
    "09:00 AM - 12:00 PM": "Morning",
    "12:00 PM - 03:00 PM": "Afternoon",
    "03:00 PM - 06:00 PM": "Evening",
};

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

    const [activeDate, setActiveDate] = useState(null);
    const [showSlotsModal, setShowSlotsModal] = useState(false);

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
        const date = new Date(currentYear, currentMonth, day);
        return date <= todayMidnight || date > maxDate;
    }


    const isSelected = (day) =>
        selectedDates.some((d) => {
            const dateObj = new Date(d.date);
            return (
                dateObj.getDate() === day &&
                dateObj.getMonth() === currentMonth &&
                dateObj.getFullYear() === currentYear
            );
        });

    const handleDateClick = (day) => {
        if (isPast(day)) return;

        const clickedDate = new Date(currentYear, currentMonth, day);
        // const dateKey = clickedDate.toISOString();

        const dateKey = `${clickedDate.getFullYear()}-${String(clickedDate.getMonth() + 1).padStart(2, "0")}-${String(clickedDate.getDate()).padStart(2, "0")}`;

        const exists = selectedDates.find((d) => d.date === dateKey);

        if (!exists && selectedDates.length >= 3) {
            setError("You can select maximum 3 dates");
            return;
        }

        setError("");
        setActiveDate(clickedDate);
        setShowSlotsModal(true);
    };

    const toggleSlot = (time) => {

        // const dateKey = activeDate.toISOString();

        const dateKey = `${activeDate.getFullYear()}-${String(activeDate.getMonth() + 1).padStart(2, "0")}-${String(activeDate.getDate()).padStart(2, "0")}`;

        let updated = [...selectedDates];

        const existingDateIndex = updated.findIndex((d) => d.date === dateKey);

        setError("");

        if (existingDateIndex !== -1) {

            const existingDate = updated[existingDateIndex];

            if (existingDate.slots.includes(time)) {

                const newSlots = existingDate.slots.filter((s) => s !== time);

                if (newSlots.length === 0) {
                    // remove the whole date if no slots left
                    updated.splice(existingDateIndex, 1);
                } else {
                    existingDate.slots = newSlots;
                }

            } else {

                if (existingDate.slots.length >= 3) {
                    setError("Maximum 3 slots per date");
                    return;
                }

                existingDate.slots.push(time);
            }

        } else {

            if (updated.length >= 3) {
                setError("Maximum 3 dates allowed");
                return;
            }

            updated.push({
                date: dateKey,
                slots: [time],
            });

        }

        setSelectedDates(updated);
    };

    const isSlotSelected = (time) => {
        // const dateKey = activeDate?.toISOString();

        const dateKey = activeDate
            ? `${activeDate.getFullYear()}-${String(activeDate.getMonth() + 1).padStart(2, "0")}-${String(activeDate.getDate()).padStart(2, "0")}`
            : null;

        const found = selectedDates.find((d) => d.date === dateKey);

        if (!found) return false;

        return found.slots.includes(time);
    };

    const handleSubmit = () => {
        if (selectedDates.length === 0)
            return setError("Please select at least one date");

        const missingSlots = selectedDates.some((d) => d.slots.length === 0);

        if (missingSlots)
            return setError("Please select at least one slot for each date");

        const formattedDates = selectedDates.map((item) => ({
            date: item.date,
            slots: item.slots
        }));

        setError("");
        // console.log("selectedDates", formattedDates)
        nextStep(formattedDates);
    };

    const handleBackClick = () => {
        onBack();
    };

    const removeSlot = (date, slot) => {
        const updated = selectedDates.map((d) => {
            if (d.date === date) {
                return {
                    ...d,
                    slots: d.slots.filter((s) => s !== slot),
                };
            }
            return d;
        }).filter(d => d.slots.length > 0);

        setSelectedDates(updated);
    };

    const totalSelectedSlots = selectedDates.reduce(
        (acc, d) => acc + d.slots.length,
        0
    );

    const remainingSlots = 9 - totalSelectedSlots;
    const totalSelectedDates = selectedDates.length;
    const maxDatesReached = totalSelectedDates >= 3;

    return (
        <div className="w-[768px]
        bg-white
        rounded-[20px]
        overflow-hidden
        max-[1024px]:w-full
        max-[1024px]:max-w-[768px]
        max-[1024px]:mx-auto">
            <div className="pt-[20px] md:pt-[30px] lg:pt-[40px] pb-[20px] px-[20px] md:px-[60px] w-full mx-auto">
                <CardLayoutWrapper
                    // title="When do you need the work doing?"
                    onButtonClick={handleSubmit}
                    onBackClick={handleBackClick}
                    showBackButton={true}
                    buttonText="Next"
                    calendarQuestion={true}
                    buttonWrapperClassName="lg:w-[648px] lg:mx-auto">
                    <h4 className="text-[#00afe3] lg:pb-[20px] md:pb-[20px] pb-[10px]
                    font-Inter font-black tracking-[-0.03em] text-[20px] leading-[20px]
                    md:text-[25px] md:leading-[25px] lg:text-[32px] lg:leading-[32px]">
                        When would you like the job done?
                    </h4>

                    <div className="flex flex-col gap-5 lg:gap-7 mb-4">
                        {/* <div>
                            <H5 variant="optional" className="!font-bold text-left md:text-center">
                                Free Home Visit With Localitsts
                            </H5>
                            <Paragraph variant="optional" className="!font-medium pt-[10px] text-left md:text-center text-[#3A4B53] tracking-[0px]">Book in with Localist at a time that suits you. We will visit your property and assess your roofing needs then provide you with a detailed free quote.</Paragraph>
                        </div> */}
                        <div className="flex flex-col md:flex-row gap-5">
                            {/* Calendar Box */}
                            <div className={`flex-1 bg-white rounded-[24px] h-fit md:min-w-[300px] lg:min-w-[648px] border-2 border-[#E5E7EB] p-5 shadow-sm`}>
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
                                <div className="grid grid-cols-7 gap-y-3">
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
                                                disabled={past || (selectedDates.length >= 3 && !selected)}
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
                            </div>
                        </div>
                    </div>
                    <span className="tracking-[-0.03em] font-[Arial] text-[14px] text-[#6A7282]">Select 1-9 timeslots that suit you. We will email you to confirm the selected time and date.</span>

                    <div className="mt-4">
                        <p className="text-left tracking-[-0.03em] font-[Arial] text-[14px] mb-3">
                            Selected timeslots
                        </p>

                        <div className="flex flex-wrap gap-3">

                            {selectedDates.flatMap((d) =>
                                d.slots.map((slot, i) => {

                                    const monthDay = new Date(d.date + "T00:00:00").toLocaleDateString("en-GB", {
                                        month: "long",
                                        day: "numeric",
                                    });

                                    const label = SLOT_LABELS[slot];

                                    return (
                                        <div
                                            key={d.date + slot}
                                            className="flex items-center gap-2 bg-[#00AEEF] text-white font-medium px-4 py-2 rounded-full text-[14px]"
                                        >
                                            {label} - {monthDay}
                                            <button
                                                onClick={() => removeSlot(d.date, slot)}
                                                className="flex items-center justify-center w-4 h-4 rounded-full cursor-pointer hover:bg-white/20 transition-colors text-[16px]"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    );
                                })
                            )}

                            {Array.from({
                                length: Math.max(
                                    0,
                                    3 -
                                    selectedDates.reduce((acc, d) => acc + d.slots.length, 0)
                                ),
                            }).map((_, i) => (
                                <div
                                    key={"placeholder-" + i}
                                    className="border-2 border-dashed border-gray-300 text-gray-400 px-3 py-2 rounded-full text-[14px] tracking-[-0.03em]"
                                >
                                    Select a timeslot
                                </div>
                            ))}
                        </div>
                    </div>

                    {showSlotsModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                            <div className="bg-white rounded-xl p-5 w-[320px] shadow-xl">

                                <div className="flex justify-between mb-2">
                                    <h5 className="text-[16px]">Available time slots</h5>
                                    <span className="text-[12px] text-gray-500">
                                        {totalSelectedSlots === 0
                                            ? "Select 1 more"
                                            : `${remainingSlots} remaining`}
                                    </span>                                    <button
                                        onClick={() => setShowSlotsModal(false)}
                                        className="flex items-center justify-center w-7 h-7 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <p className="text-left text-sm text-gray-500 mb-5">
                                    {activeDate?.toLocaleDateString("en-GB", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>

                                <div className="flex flex-col gap-3">

                                    {TIME_SLOTS.map((slot) => {

                                        const selected = isSlotSelected(slot.time);

                                        return (

                                            <div
                                                key={slot.time}
                                                className="flex items-center justify-between p-4 rounded-xl bg-gray-100"
                                            >

                                                <div>
                                                    <p className="text-left font-semibold text-[#00AEEF]">
                                                        {slot.label}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        {slot.time}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => toggleSlot(slot.time)}
                                                    disabled={remainingSlots === 0 && !selected}
                                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition cursor-pointer
                                                    ${selected ? "bg-green-500" : "bg-gray-300"}
                                                    ${remainingSlots === 0 && !selected ? "opacity-50 cursor-not-allowed" : ""}`}
                                                >
                                                    <div
                                                        className={`bg-white w-4 h-4 rounded-full shadow transform transition
                                                ${selected ? "translate-x-6" : ""}`}
                                                    />
                                                </button>

                                            </div>

                                        );
                                    })}

                                </div>

                                {remainingSlots === 0 && (
                                    <p className="text-[#E99643] text-[12px] mt-3">
                                        Maximum selections reached. Remove a slot to add another.
                                    </p>
                                )}
                                {maxDatesReached && !selectedDates.some(d => d.date === `${activeDate?.getFullYear()}-${String(activeDate?.getMonth() + 1).padStart(2, "0")}-${String(activeDate?.getDate()).padStart(2, "0")}`
                                ) && (
                                        <p className="text-[#E99643] text-[12px] mt-3">
                                            Maximum dates reached. Remove a date to add another.
                                        </p>
                                    )}
                            </div>
                        </div>
                    )}

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
