// import RadioCard from "../UI/Inputs/RadioCard";
// import Paragraph from "../UI/Typography/Paragraph";

import InputLabel from "../../UI/InputLabel/InputLabel";
import RadioCard from "../../UI/Inputs/RadioCard";
import Paragraph from "../../UI/Typography/Paragraph";

const ROOF_MATERIALS = [
  { id: "felt", label: "Felt", pricePerSqm: 40 },
  { id: "rubber", label: "Rubber / EPDM", pricePerSqm: 70 },
  { id: "fibreglass", label: "Fibreglass", pricePerSqm: 90 },
  { id: "tiles", label: "Tiles", pricePerSqm: 120 },
  { id: "metal", label: "Metal Sheets", pricePerSqm: 100 },
];

const MaterialSelector = ({ material, setMaterial, errors, setErrors }) => (
  <div>
    <InputLabel label="What type of roof material do you want?" required/>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {ROOF_MATERIALS.map((mat) => (
        <RadioCard
          key={mat.id}
          label={mat.label}
          sublabel={`~£${mat.pricePerSqm}/m²`}
          selected={material === mat.id}
          onSelect={() => { setMaterial(mat.id); setErrors((p) => ({ ...p, material: undefined })); }}
        />
      ))}
    </div>
    {errors.material && (
       <div className="mt-1.5 min-h-5">
        <p className="text-xs text-red-600 flex items-start">
          <span>{errors.material}</span>
        </p>
      </div>
    )}
  </div>
);

export default MaterialSelector;