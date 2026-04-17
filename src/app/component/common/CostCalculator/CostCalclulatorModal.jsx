"use client";

import { useState, useEffect } from "react";
// import Button1              from "../../UI/Buttons/Button1";
// import Paragraph            from "../../UI/Typography/Paragraph";
// import NearmeH2Heading      from "../../Nearme/NearmeH2Heading";
// import H3                   from "../../UI/Typography/H3";
import DimensionsSection from "./DimensionsSection";
import MaterialSelector from "./MaterialSelector";
import RegionSelector from "./RegionSelector";
import EstimatedCostDisplay from "./EstimatedCostDisplay";
import Button1 from "../../UI/Typography/Button1";
import NearmeH2Heading from "../../Nearme/NearmeH2Heading";
import Paragraph from "../../UI/Typography/Paragraph";
import H3 from "../../UI/Typography/H3";
import H5 from "../../UI/Typography/H5";
import CloseSquareIcon from "../../../../../public/ReactIcons/CloseSquareIcon";
import { X } from "lucide-react";
import H4 from "../../UI/Typography/H4";

// ─── Constants ──────────────────────────────────────────────────────────────
const ROOF_MATERIALS = [
  { id: "felt", label: "Felt", pricePerSqm: 40 },
  { id: "rubber", label: "Rubber / EPDM", pricePerSqm: 70 },
  { id: "fibreglass", label: "Fibreglass", pricePerSqm: 90 },
  { id: "tiles", label: "Tiles", pricePerSqm: 120 },
  { id: "metal", label: "Metal Sheets", pricePerSqm: 100 },
];

const UK_REGIONS = [
  { id: "london", label: "London", multiplier: 1.3 },
  {
    id: "southeast",
    label: "South East or South West England",
    multiplier: 1.15,
  },
  { id: "midlands", label: "Midlands", multiplier: 1.0 },
  {
    id: "northwest",
    label: "North West or North East England",
    multiplier: 0.95,
  },
  { id: "wales", label: "Wales or Scotland", multiplier: 0.9 },
];

const BASE_LABOUR_COST = 300;

const STEPS = [
  { id: 1, label: "Dimensions", short: "Size" },
  { id: 2, label: "Material", short: "Material" },
  { id: 3, label: "Region", short: "Region" },
];

// ─── Trigger Button ──────────────────────────────────────────────────────────
export function OpenCalculatorButton({ onClick }) {
  return (
    <Button1 variant="primary" onClick={onClick}>
      Calculate Roof Cost
    </Button1>
  );
}

// ─── Main Modal ──────────────────────────────────────────────────────────────
export default function CostCalculatorModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("forward");

  // Form state
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [material, setMaterial] = useState("");
  const [region, setRegion] = useState("");
  const [errors, setErrors] = useState({});

  // Result state
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) setTimeout(reset, 300);
  }, [isOpen]);

  // ── Per-step validation ─────────────────────────────────────────────────────
  const validateStep = (s) => {
    const newErrors = {};
    if (s === 1) {
      if (!length || isNaN(Number(length)) || Number(length) <= 0)
        newErrors.length = "Please enter a valid length greater than 0";
      if (!width || isNaN(Number(width)) || Number(width) <= 0)
        newErrors.width = "Please enter a valid width greater than 0";
    }
    if (s === 2 && !material)
      newErrors.material = "Please select a roof material";
    if (s === 3 && !region) newErrors.region = "Please select your region";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Navigation ──────────────────────────────────────────────────────────────
  const goTo = (next, dir = "forward") => {
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
    }, 220);
  };

  const handleNext = () => {
    if (validateStep(step) && step < 3) goTo(step + 1, "forward");
  };

  const handleBack = () => {
    if (step > 1) goTo(step - 1, "back");
    setIsCalculated(false)
  };

  // ── Calculate ───────────────────────────────────────────────────────────────
  const calculate = () => {
    if (!validateStep(3)) return;
    const area = Number(length) * Number(width);
    const sel = ROOF_MATERIALS.find((m) => m.id === material);
    const reg = UK_REGIONS.find((r) => r.id === region);
    setEstimatedCost(
      Math.round((area * sel.pricePerSqm + BASE_LABOUR_COST) * reg.multiplier),
    );
    setIsCalculated(true);
  };

  // ── Reset ───────────────────────────────────────────────────────────────────
  const reset = () => {
    setStep(1);
    setLength("");
    setWidth("");
    setMaterial("");
    setRegion("");
    setErrors({});
    setEstimatedCost(null);
    setIsCalculated(false);
  };

  const formatCurrency = (n) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(n);

  if (!isOpen) return null;

  const slideClass = animating
    ? direction === "forward"
      ? "opacity-0 translate-x-6"
      : "opacity-0 -translate-x-6"
    : "opacity-100 translate-x-0";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* ── Modal Shell ── */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] px-6 md:px-8 py-6 md:py-8">
        {/* ════ HEADER ════════════════════════════════════════════════ */}
        <div className="bg-white border-gray-100  text-center flex-shrink-0">
          {/* Title + close */}
          <div className="flex items-start justify-between mb-2 ">
            <H4 className="">Roof Cost Caluculator</H4>

           
              <X  onClick={onClose}
              aria-label="Close"
              className="p-1.5 h-8 w-8 cursor-pointer rounded-lg transition-colors"
              style={{ color: "#9ca3af" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#253238";
                e.currentTarget.style.backgroundColor = "#f3f4f6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9ca3af";
                e.currentTarget.style.backgroundColor = "transparent";
              }}/>
          </div>

          {/* ── Step Progress ── */}
          {/* <div className="flex items-center">
            {STEPS.map((s, i) => {
              const isCompleted = step > s.id;
              const isActive = step === s.id;
              return (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300"
                      style={{
                        borderColor:
                          isCompleted || isActive ? "#00AEEF" : "#d1d5db",
                        backgroundColor: isCompleted
                          ? "#00AEEF"
                          : isActive
                            ? "#ffffff"
                            : "#ffffff",
                        color: isCompleted
                          ? "#ffffff"
                          : isActive
                            ? "#00AEEF"
                            : "#9ca3af",
                      }}
                    >
                      {isCompleted ? (
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        s.id
                      )}
                    </div>
                    <span
                      className="text-[10px] mt-1 font-semibold transition-colors duration-300"
                      style={{
                        color: isActive || isCompleted ? "#00AEEF" : "#9ca3af",
                      }}
                    >
                      {s.short}
                    </span>
                  </div>

                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 mb-4 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: step > s.id ? "100%" : "0%",
                          backgroundColor: "#00AEEF",
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div> */}
        </div>

        {/* ════ BODY ══════════════════════════════════════════════════ */}
        <div className="flex-1 overflow-y-auto  min-h-0">
          {/* Step sub-label — uses Paragraph */}
          {/* <Paragraph className="mb-4 uppercase tracking-widest !text-xs font-semibold">
            Step {step} of 3 —{" "}
            <span style={{ color: "#00AEEF" }}>{STEPS[step - 1].label}</span>
          </Paragraph> */}
          {/* <H5 className="mb-4 ">{STEPS[step - 1].label} </H5> */}

          {/* Animated content */}
          <div
            className={``}
          >
            {/* Step 1 — Dimensions */}
            {step === 1 && (
              <div className="space-y-4">
                {/* <H3>Enter Roof Dimensions</H3> */}
                <DimensionsSection
                  length={length}
                  setLength={setLength}
                  width={width}
                  setWidth={setWidth}
                  errors={errors}
                  setErrors={setErrors}
                  className="grid grid-cols-1 gap-1"
                />
              </div>
            )}

            {/* Step 2 — Material */}
            {step === 2 && (
              <div className="space-y-4">
                <MaterialSelector
                  material={material}
                  setMaterial={setMaterial}
                  errors={errors}
                  setErrors={setErrors}
                />
              </div>
            )}

            {/* Step 3 — Region + Result */}
            {step === 3 && (
              <div className="space-y-4">
                <RegionSelector
                  region={region}
                  setRegion={setRegion}
                  errors={errors}
                  setErrors={setErrors}
                />

                {isCalculated && estimatedCost !== null && (
                  <div className="mt-4">
                    <EstimatedCostDisplay
                      isCalculated={isCalculated}
                      estimatedCost={estimatedCost}
                      formatCurrency={formatCurrency}
                      isForModal
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ════ FOOTER ════════════════════════════════════════════════ */}
        <div className={`flex-shrink-0 mt-6  md:mt-8 bg-gray-50 border-t border-gray-100 flex items-center ${step > 1 ? 'justify-between' : 'justify-end'} gap-3`}>
          {/* Left: Back / Cancel */}
          {step > 1 ? (
            <Button1 variant="outlined" onClick={handleBack}>
              Back
            </Button1>
          ) : null}

          {/* Right: action button changes per state */}
          {isCalculated && step === 3 ? (
            <Button1 variant="outlined" onClick={reset}>
              Reset
            </Button1>
          ) : step === 3 ? (
            <Button1 variant="primary" onClick={calculate}>
              Calculate Cost
            </Button1>
          ) : (
            <Button1 variant="primary" onClick={handleNext}>
              Continue
            </Button1>
          )}
        </div>
      </div>
    </div>
  );
}
