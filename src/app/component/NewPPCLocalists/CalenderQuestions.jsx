"use client";
import { useState, useEffect } from "react";
import H5 from "../UI/Typography/H5";
import CardLayoutWrapper from "./CardLayoutWrapper";
import Paragraph from "../UI/Typography/Paragraph";

import MobileBackHeader from "./LocalistsRoof/MobileBackHeader";
import CalendarHeader from "./LocalistsRoof/CalendarHeader";
import CalendarGrid from "./LocalistsRoof/CalendarGrid";
import SelectedDatePill from "./LocalistsRoof/SelectedDatePill";
import TimeSlotsPanel from "./LocalistsRoof/TimeSlotsPanel";

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

export default function CalenderQuestions({ nextStep, onBack }) {
  const today = getTodayInLondon();
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
    if (!isMobile) setShowMobileSlots(false);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && selectedDate) {
      setSelectedDate(null);
      setSelectedTime(null);
    }
  }, [isMobile]);

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

  const isPrevDisabled =
    currentYear < today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth <= today.getMonth());

  // Next month button disabled if entire next month is beyond maxDate
  const isNextDisabled = (() => {
    const nextMonthFirst = new Date(
      currentMonth === 11 ? currentYear + 1 : currentYear,
      currentMonth === 11 ? 0 : currentMonth + 1,
      1,
    );
    return nextMonthFirst > maxDate;
  })();

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
    if (isNextDisabled) return;
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const isToday = (day) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  // Disabled: past dates OR dates beyond today + 28 days
  const isDisabled = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return date <= todayMidnight || date > maxDate;
  };

  const isSelected = (day) =>
    selectedDate &&
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === currentMonth &&
    selectedDate.getFullYear() === currentYear;

  const handleDateClick = (day) => {
    if (isDisabled(day)) return;
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

  return (
    <div
      className="w-[1070px] bg-white rounded-[20px] overflow-hidden
            max-[1024px]:w-full max-[1024px]:max-w-[1070px] max-[1024px]:mx-auto"
    >
      <div className="pt-[20px] md:pt-[30px] lg:pt-[40px] pb-[20px] px-[20px] w-full mx-auto">
        <CardLayoutWrapper
          onButtonClick={handleSubmit}
          onBackClick={onBack}
          showBackButton={true}
          buttonText="Next"
          calendarQuestion={true}
          buttonWrapperClassName="lg:w-[535px] lg:mx-auto"
        >
          <h4
            className="text-[#00afe3] lg:pb-[30px] md:pb-[20px] pb-[10px]
                        font-Inter font-black tracking-[-0.03em] text-[20px] leading-[20px]
                        md:text-[25px] md:leading-[25px] lg:text-[30px] lg:leading-[30px]"
          >
            When do you need the work doing?
          </h4>

          {/* Mobile: back arrow + selected date label */}
          {showMobileSlots && (
            <MobileBackHeader
              formattedDate={formatSelected()}
              onBack={() => {
                setShowMobileSlots(false);
                setSelectedTime(null);
              }}
            />
          )}

          <div className="flex flex-col lg:flex-row gap-5">
            {/* Intro text (hidden when mobile slots open) */}
            <div className={`${showMobileSlots ? "hidden" : ""}`}>
              <H5
                variant="optional"
                className="!font-medium text-left md:text-center"
              >
                Free Home Visit With Localitsts
              </H5>
              <Paragraph
                variant="optional"
                className="!font-medium lg:pt-[20px] pt-[10px] text-left text-[#3A4B53]"
              >
                Book in with Localist at a time that suits you. We will visit
                your property and assess your roofing needs then provide you
                with a detailed free quote.
              </Paragraph>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              {/* Calendar Box */}
              <div
                className={`${showMobileSlots ? "hidden md:block" : "block"} flex-1 bg-white rounded-[24px] h-fit md:min-w-[300px] lg:min-w-[400px] border-2 border-[#E5E7EB] p-5 shadow-sm`}
              >
                <CalendarHeader
                  currentMonth={currentMonth}
                  currentYear={currentYear}
                  isPrevDisabled={isPrevDisabled}
                  isNextDisabled={isNextDisabled}
                  onPrevMonth={prevMonth}
                  onNextMonth={nextMonth}
                />

                <CalendarGrid
                  daysInMonth={daysInMonth}
                  firstDay={firstDay}
                  isDisabled={isDisabled}
                  isSelected={isSelected}
                  isToday={isToday}
                  onDateClick={handleDateClick}
                />

                <SelectedDatePill formattedDate={formatSelected()} />
              </div>

              {/* Time Slots */}
              <TimeSlotsPanel
                selectedTime={selectedTime}
                showMobileSlots={showMobileSlots}
                onTimeSelect={(time) => {
                  setSelectedTime(time);
                  setError("");
                }}
              />
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
