import React from "react";

function InputLabel({
  inputId = "",
  label = "",
  required = false,
  children,
  error = "",
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-base font-bold text-[#253238] mt-3 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <div className="mt-1.5 min-h-5">
          <p className="text-xs text-red-600 flex items-start">
            <span>{error}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default InputLabel;
