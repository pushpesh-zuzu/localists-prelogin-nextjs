"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [service, setService] = useState("");
  const [postcode, setPostcode] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    if (!service || !postcode) {
      alert("Please enter service and postcode");
      return;
    }

    router.push(`/find?service=${service}&postcode=${postcode}`);
  };

  return (
    <section className="relative h-[633px] w-full">
      <div className="w-full h-full bg-[url('/images/HowLocalistsWorksBg.png')] bg-cover bg-center bg-no-repeat flex justify-center items-center">
        <div className="w-[1024px] h-[469px] flex justify-center flex-col">
          <h1 className="font-black text-[81px] leading-[75px] tracking-[-0.03em] font-inter text-white">
            How <span className="text-[#00AFE3]">localists.com</span> Works
          </h1>
          <div className="w-[1024px] h-[342px] bg-white/90 rounded-[10px] px-[33px] py-[32px] flex flex-col justify-center">
            <h3 className="font-black text-[38px] leading-[38px] tracking-[-0.03em] font-inter text-black text-center">
              Now you know how it works, start looking for a professional.
            </h3>

            <div className="flex gap-[10px] w-full">
              <div className="mt-4 w-1/2">
                <label className="font-semibold block mb-2">
                  What service do you need?
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-3 w-full shadow-[0_0_2px_0.5px_rgba(0,0,0,0.10)]"
                  placeholder="Landscaping, Driveway Installation, etc..."
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />
              </div>

              <div className="mt-4 w-1/2">
                <label className="font-semibold block mb-2">
                  Where do you need it?
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-3 w-full"
                  placeholder="Enter Postcode (No Spaces)"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-md"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      {/* Hero Background */}
      {/* <Image
        src="/images/HowLocalistsWorksBg.png" 
        alt="Localists hero banner"
        fill
        priority
        className="object-cover"
      /> */}

      {/* Overlay */}
      {/* <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center"> */}

      {/* Title */}
      {/* <h1 className="text-[40px] md:text-[55px] font-bold leading-tight">
          How <span className="text-sky-500">Localists.com</span> Works
        </h1> */}

      {/* Subtitle */}
      {/* <p className="text-lg font-semibold mt-4">
          Now you know how it works, start looking for a professional.
        </p> */}

      {/* Form Box */}
      {/* <div className="mt-10 w-full max-w-[1000px] bg-white py-6 px-8 rounded-xl shadow-xl flex flex-col md:flex-row gap-6">

          <div className="flex-1">
            <label className="font-semibold block mb-2">
              What service do you need?
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-3 w-full"
              placeholder="Landscaping, Driveway Installation, etc..."
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
          </div>

          <div className="flex-1">
            <label className="font-semibold block mb-2">
              Where do you need it?
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-3 w-full"
              placeholder="Enter Postcode (No Spaces)"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-md"
          >
            Continue
          </button>
        </div> */}
      {/* </div> */}
    </section>
  );
}
