"use client";

import { useState } from "react";
import NearmeH2Heading from "../../Nearme/NearmeH2Heading";
import Paragraph from "../../UI/Typography/Paragraph";
import DimensionsSection from "./DimensionsSection";
import AreaPreview from "./AreaPreview";
import MaterialSelector from "./MaterialSelector";
import RegionSelector from "./RegionSelector";
import ActionButtons from "./ActionButtons";
import EstimatedCostDisplay from "./EstimatedCostDisplay";

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

export default function CostCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [material, setMaterial] = useState("");
  const [region, setRegion] = useState("");
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [errors, setErrors] = useState({});
  const [isCalculated, setIsCalculated] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!length || isNaN(Number(length)) || Number(length) <= 0)
      newErrors.length = "Please enter a valid length greater than 0";
    if (!width || isNaN(Number(width)) || Number(width) <= 0)
      newErrors.width = "Please enter a valid width greater than 0";
    if (!material) newErrors.material = "Please select a roof material";
    if (!region) newErrors.region = "Please select your region";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (!validate()) return;
    const area = Number(length) * Number(width);
    const sel = ROOF_MATERIALS.find((m) => m.id === material);
    const reg = UK_REGIONS.find((r) => r.id === region);
    setEstimatedCost(
      Math.round((area * sel.pricePerSqm + BASE_LABOUR_COST) * reg.multiplier),
    );
    setIsCalculated(true);
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setMaterial("");
    setRegion("");
    setEstimatedCost(null);
    setIsCalculated(false);
    setErrors({});
  };

  const formatCurrency = (n) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex items-start justify-center bg-gray-50">
      <div className="w-full max-w-3xl">
        {/* ── Header ── */}
        <div className="mb-7.5 md mb-12">
          <NearmeH2Heading headdingblue="Roof" headingblack="Cost Calculator" />
        </div>

        {/* ── Card ── */}
        <div className="bg-white border border-[#f7f7f7] rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6">
            {/* Dimensions */}
            <DimensionsSection
              length={length}
              setLength={setLength}
              width={width}
              setWidth={setWidth}
              errors={errors}
              setErrors={setErrors}
            />

            {/* Area preview */}
            {/* <AreaPreview length={length} width={width} /> */}

            {/* Material */}
            <MaterialSelector
              material={material}
              setMaterial={setMaterial}
              errors={errors}
              setErrors={setErrors}
            />

            {/* Region */}
            <RegionSelector
              region={region}
              setRegion={setRegion}
              errors={errors}
              setErrors={setErrors}
            />

            {/* Action Buttons */}
            <ActionButtons onCalculate={calculate} onReset={reset} />
          </div>

          {/* ── Result Panel ── */}
          <EstimatedCostDisplay
            isCalculated={isCalculated}
            estimatedCost={estimatedCost}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>
    </div>
  );
}
