"use client";

import { useSelector, useDispatch } from "react-redux";
import { clearSearch, setSelectedSearchService } from "@/lib/store/searchSlice";
import { useEffect } from "react";

export default function SearchResults({ searchQuery, setSearchQuery }) {
  const { services, loading, error } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery === "") {
      dispatch(clearSearch());
    }
  }, [searchQuery, dispatch]);

  const handleServiceClick = (service) => {
    dispatch(
      setSelectedSearchService({
        service: service.name,
        id: service?.id || null,
      })
    );
    setSearchQuery(service?.name);

    dispatch(clearSearch());
  };

  if (loading) {
    return (
      <div className="absolute z-50 w-full bg-white shadow-lg rounded-lg mt-2 p-4">
        <p>Searching...</p>
      </div>
    );
  }

  // Agar error ho
  if (error) {
    return (
      <div className="absolute z-50 w-full bg-red-50 text-red-600 shadow-lg rounded-lg mt-2 p-4">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Agar services hain
  if (services.length > 0) {
    return (
      <div className="absolute z-50 w-full bg-white shadow-lg rounded-lg  max-h-80 overflow-y-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleServiceClick(service)}
          >
            <h3 className="font-semibold">{service.name || "Service"}</h3>
            {service.description && (
              <p className="text-sm text-gray-600">{service.description}</p>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Agar kuch bhi nahi hai
  return null;
}
