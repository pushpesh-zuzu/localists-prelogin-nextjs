// import RadioCard from "../UI/Inputs/RadioCard";
// import Paragraph from "../UI/Typography/Paragraph";

import InputLabel from "../../UI/InputLabel/InputLabel";
import RadioCard from "../../UI/Inputs/RadioCard";
import Paragraph from "../../UI/Typography/Paragraph";

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

const RegionSelector = ({ region, setRegion, errors, setErrors }) => (
  <div>
    <InputLabel
      inputId={"location label"}
      label={"Where are you located in the UK?"}
      required
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {UK_REGIONS.map((reg) => (
        <RadioCard
          key={reg.id}
          label={reg.label}
          selected={region === reg.id}
          onSelect={() => {
            setRegion(reg.id);
            setErrors((p) => ({ ...p, region: undefined }));
          }}
        />
      ))}
    </div>
    {errors.region && (
    <div className="mt-1.5 min-h-5">
        <p className="text-xs text-red-600 flex items-start">
          <span>{errors.region}</span>
        </p>
      </div>
    )}
  </div>
);

export default RegionSelector;
