import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InputLabel from "../InputLabel/InputLabel";

const Input = ({
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
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, "-");
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={`w-full ${className}`}>
      <InputLabel
        label={label}
        required={required}
        inputId={inputId}
        error={error}
      >
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
            placeholder:text-gray-400
            
            disabled:bg-gray-100 
            ${
              error
                ? "focus:outline-0 border-red-500 focus:ring-red-500 focus:border-red-500"
                : "focus:ring-black focus:outline-2 focus:ring-0"
            }
            ${isPassword ? "pr-10" : ""}
          `}
          />

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
      </InputLabel>
    </div>
  );
};

export default Input;
