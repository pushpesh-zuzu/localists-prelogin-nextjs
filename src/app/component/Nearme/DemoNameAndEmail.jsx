import React, { useState } from "react";

function DemoNameAndEmail({ onBack, onNext }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    // simple email check
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    onNext?.({ name, email }); // pass data if needed
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Enter your details</h2>

      {/* Name */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter your name"
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter your email"
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

export default DemoNameAndEmail;
