import InputLabel from "../../UI/InputLabel/InputLabel";




// ─── InputField ───────────────────────────────────────────────────────────────
const InputField = ({ label, id, value, onChange, placeholder, error, required }) => (
  <div>
    {label && (
    <InputLabel inputId={id} label={label} required={required} />
    )}
    <div className="relative">
      <input
        id={id}
        type="number"
        min="0"
        step="0.1"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
           relative w-full px-3 py-2 rounded-sm
            text-gray-900 text-base
            border border-[#ccc]
            transition-all duration-200
          placeholder:text-[#959595]
            
            disabled:bg-gray-100 
            custom-placeholder
          ${error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "focus:ring-black"
          }
        `}
      />
      {/* <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#959595] text-sm select-none">
        m
      </span> */}
    </div>
    {error && (
      <div className="mt-1.5 min-h-5">
        <p className="text-xs text-red-600 flex items-start">
          <span>{error}</span>
        </p>
      </div>
    )}
    <style>{`
      .custom-placeholder::placeholder {
        color: #959595;
        opacity: 1;
      }
    `}</style>
  </div>
);

const DimensionsSection = ({ length, setLength, width, setWidth, errors, setErrors, className="grid grid-cols-1 sm:grid-cols-2 gap-5" }) => (
  <div className={`${className}`}>
    <InputField
      label="Length (m)"
      id="garage-length"
      value={length}
      onChange={(e) => { setLength(e.target.value); setErrors((p) => ({ ...p, length: undefined })); }}
      placeholder="e.g. 5"
      error={errors.length}
      required
    />
    <InputField
      label="Width (m)"
      id="garage-width"
      value={width}
      onChange={(e) => { setWidth(e.target.value); setErrors((p) => ({ ...p, width: undefined })); }}
      placeholder="e.g. 3"
      error={errors.width}
      required
    />
  </div>
);

export default DimensionsSection;