import React, { useState } from "react";

function DemoPhoneNumber({ onBack, onNext }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!phone.trim()) {
      setError("Please enter your phone number");
      return;
    }

    // simple phone validation (10 digits)
    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setError("");
    onNext?.({ phone }); // pass phone if needed
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Enter your phone number</h2>

      {/* Phone Number */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value.replace(/\D/g, ""))
          }
          maxLength={10}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter your phone number"
        />
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 border rounded"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DemoPhoneNumber;
