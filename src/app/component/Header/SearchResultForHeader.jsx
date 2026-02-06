"use client";

import { useSelector, useDispatch } from "react-redux";
import { clearSearch, setSelectedSearchService } from "@/lib/store/searchSlice";
import { useEffect, useRef } from "react";
import { questionAnswerData } from "@/lib/store/buyerslice/buyerSlice";
import LoaderIndicator from "../common/Loader/LoaderIndicatore";
import { serviceRouteMap } from "@/utils/allServicesRoute";
import { useRouter } from "next/navigation";

export default function SearchResultForHeader({
  setShow,
  searchQuery,
  setSearchQuery,
  setSelectedService,
}) {
  const { services, loading, error } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useRouter();
  useEffect(() => {
    if (searchQuery === "") {
      dispatch(clearSearch());
    }
  }, [searchQuery, dispatch]);
  const serviceRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (serviceRef.current && !serviceRef.current.contains(event.target)) {
        dispatch(clearSearch()); // hide the box
        setSearchQuery('')
        
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleServiceClick = (service) => {
    // dispatch(
    //   setSelectedSearchService({
    //     service: service.name,
    //     id: service?.id || null,
    //   })
    // );
    // setSearchQuery(service.name)
    // setSelectedService(service?.id)
    // setSearchQuery('');
    // setShow && setShow(true);
    const matchedRoute = serviceRouteMap[service?.id];
    if (matchedRoute) {
      navigate.push(`/en/gb${matchedRoute}`); // go to the route
      setSearchQuery("");
    }
    dispatch(clearSearch());

    service?.id && dispatch(questionAnswerData({ service_id: service?.id }));
  };

  if (loading) {
    return (
      <div className="absolute top-full z-50 w-full bg-white shadow-lg rounded-lg p-4">
        <div className="flex justify-center">
          {" "}
          <LoaderIndicator size="small" />
        </div>
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
      <div
        ref={serviceRef}
        className="absolute top-full z-50 w-full bg-white shadow-lg  rounded-lg  max-h-80 overflow-y-auto"
      >
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

  return null;
}
