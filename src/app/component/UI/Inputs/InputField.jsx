import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  name,
  id,
  className = "",
  onBlur,
  labelClass = "text-base text-[20px] mt-3 mb-4",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, "-");
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={`w-full ${className}`}>
      {/* Label with 12px gap (mb-3 = 12px) */}
      {label && (
        <label
          htmlFor={inputId}
          className={`block ${labelClass}  leading-[100%] tracking-[-0.03em] font-bold font-[Arial] text-[#253238] `}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <style>{`
                    .custom-placeholder::placeholder {
                        color: #959595;
                        opacity: 1; }
                        `}</style>

      {/* Input Container for Password Icon */}
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={onBlur}
          style={{ boxShadow: "0 0 2px .5px #0000001a" }}
          className={`
             relative w-full px-3 py-2 rounded-sm
            text-gray-900 text-base
            border border-[#ccc]
            transition-all duration-200
          placeholder:text-[#959595]
            focus:outline-1 focus:ring-1
            disabled:bg-gray-100 
            custom-placeholder
            ${error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "focus:ring-black"
            }
            ${isPassword ? "pr-10" : ""}
          `}
        />

        {/* Password Toggle Icon */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {/* Error Message with 5px gap (mt-1.5 ≈ 6px, close to 5px) */}
      {error && (
        <div className="mt-1.5 min-h-5">
          <p className="text-xs text-red-600 flex items-start">
            <span>{error}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default InputField;
