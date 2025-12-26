"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setSelectedServiceId } from "@/lib/store/findjobslice";

// Predefined service slugs
const serviceRouteMap = {
  49: "fence-gate-installation",
  51: "driveway-installation",
  52: "patio-laying",
  54: "artificial-grass-installation",
  43: "landscaping",
  112: "tree-surgery",
  53: "roofing",
};

// Example services list (replace with API call if needed)
const popularServices = [
  { id: 49, name: "Fence & Gate Installation" },
  { id: 51, name: "Driveway Installation" },
  { id: 52, name: "Patio Laying" },
  { id: 54, name: "Artificial Grass Installation" },
  { id: 43, name: "Landscaping" },
  { id: 112, name: "Tree Surgery" },
  { id: 53, name: "Roofing" },
];

const FindLocalJobs = ({ lang = "en", country = "gb" }) => {
  const [input, setInput] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredServices, setFilteredServices] = useState(popularServices);

  const dispatch = useDispatch();
  const router = useRouter();
  const divRef = useRef(null);

  // Filter services based on input
  useEffect(() => {
    if (input.trim() === "") setFilteredServices(popularServices);
    else
      setFilteredServices(
        popularServices.filter((s) =>
          s.name.toLowerCase().includes(input.toLowerCase())
        )
      );
  }, [input]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (divRef.current && !divRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectService = (service) => {
    setSelectedService(service);
    setInput(service.name);
    setDropdownOpen(false);
  };

  const handleGetStarted = (service) => {
    if (!service) return;

    const slug = serviceRouteMap[service.id];
    if (!slug) {
      alert("Service route not defined!");
      return;
    }

    dispatch(setSelectedServiceId(service.id));

    router.push(`/${lang}/${country}/sellers/create-account/${slug}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Connect with Clients Who Need You
      </h1>
      <div className="relative">
        <input
          type="text"
          placeholder="What service do you provide?"
          className="w-full max-w-[400px] border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onFocus={() => setDropdownOpen(true)}
          onChange={(e) => {
            setInput(e.target.value);
            setSelectedService(null);
            setDropdownOpen(true);
          }}
        />

        {dropdownOpen && filteredServices.length > 0 && (
          <div
            ref={divRef}
            className="absolute w-full bg-white border border-gray-300 rounded mt-1 z-10 max-h-60 overflow-y-auto"
          >
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleGetStarted(service)}
              >
                {service.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleGetStarted}
      >
        Get Started
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Popular Services</h2>
        <div className="flex flex-wrap gap-4">
          {popularServices.map((service) => (
            <button
              key={service.id}
              className="px-3 py-1 border rounded hover:bg-gray-100"
              onClick={() => handleGetStarted(service)} // direct service pass
            >
              {service.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindLocalJobs;
