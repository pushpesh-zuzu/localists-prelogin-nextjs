// RequestInputField.jsx
import React from "react";

const RequestInputField = ({
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
  labelGap = "10px",    // space between label & input
  inputGap = "20px",    // space below input (before error or next element)
  ...props
}) => {
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`w-full ${className}`}>
      
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          style={{ marginBottom: labelGap }}
          className="block text-left text-base md:text-[20px] font-bold leading-[100%] tracking-[-0.03em] font-[Arial] text-[#253238]"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      <div style={{ marginBottom: error ? "0px" : label ? inputGap :"0px" }}>
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={onBlur}
          {...props}
          className={`
            w-full
            px-0 pt-[14px] pb-[13px]
            bg-transparent
            border-0 border-b-2
            text-[18px] max-[768px]:text-[16px]
            font-bold font-[Arial]
            text-[#253238]!
            placeholder:text-[#C5C7C8]!
            placeholder:text-[18px]! placeholder:max-[768px]:text-[16px]!
            placeholder:font-bold
            focus:outline-none focus:ring-0
            disabled:opacity-50
            transition-colors duration-200
            ${error
              ? "border-red-500"
              : "border-[#92999C4D]"
            }
          `}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ marginBottom: label ===""?  "20px" :"0px"}} className="mt-1.5 ">
          <p className="text-xs text-red-500 flex items-start">
            <span>{error}</span>
          </p>
        </div>
      )}

    </div>
  );
};

export default RequestInputField;