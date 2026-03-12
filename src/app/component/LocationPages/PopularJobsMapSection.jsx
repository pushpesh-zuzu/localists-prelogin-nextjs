import React, { useState, useEffect } from "react";

function PopularJobsMapSection({ location = "" }) {
  const [mapSrc, setMapSrc] = useState("");

  useEffect(() => {
    if (!location) return;

    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data[0]) {
          const { lat, lon } = data[0];
          // Coordinates se sirf red pin dikhega, text nahi
          setMapSrc(
            `https://maps.google.com/maps?q=${lat},${lon}&output=embed&z=14`
          );
        }
      });
  }, [location]);

  return (
    <div className="hidden md:flex align-middle justify-center max-w-[30%] lg:max-w-full lg:min-w-[34.55%] xl:min-w-[30%]">
      {mapSrc && (
        <iframe
        className="w-full h-full md:max-h-[300px] lg:max-h-full lg:min-h-[300px] rounded-tr-[30px] rounded-br-[30px]"
          src={mapSrc}
          loading="lazy"
          allowFullScreen
        />
      )}
    </div>
  );
}

export default PopularJobsMapSection;