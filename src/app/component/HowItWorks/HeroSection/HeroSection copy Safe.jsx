"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { searchService } from "@/lib/store/searchSlice";
import { showToast } from "@/utils/toastify";

import CheckIcon from "../../../assets/Icons/greenCheckBox.jpeg";
import { getCityName, setCitySearch } from "@/lib/store/postCodeSlice";

export default function HeroSection() {
  const [service, setService] = useState("")
  const [postcode, setPostcode] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [postalCodeValidate, setPostalCodeValidate] = useState(false);
  const [isCheckingPostcode, setIsCheckingPostcode] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const inputRef = useRef(null);

  const { services, loading } = useSelector((state) => state.search)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (service) {
        dispatch(searchService({ search: service }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [service, dispatch])

  const handleSubmit = () => {
    if (!service || !postcode) {
      alert("Please enter service and postcode");
      return;
    }

    router.push(`/find?service=${service}&postcode=${postcode}`);
  };

  const debounceTimer = useRef(null);
  const lastInvalidPinRef = useRef("");

  const handlePostcodeChange = (e) => {
    const value = e.target.value.trim().slice(0, 10);
    
    setPostcode(value);
    setPostalCodeValidate(false);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      if (value.length < 3) return;

      setIsCheckingPostcode(true);
      try {
        const newResponse = await dispatch(
          getCityName({ postcode: value })
        ).unwrap();
        if (newResponse?.data?.city) {
          setPostalCodeValidate(true);
          dispatch(setCitySearch(newResponse.data.city));
          lastInvalidPinRef.current = "";
        } else {
          if (lastInvalidPinRef.current !== value) {
            showToast("error", "Please enter a valid postcode!");
            lastInvalidPinRef.current = value;
          }
          setPostalCodeValidate(false);
        }
      } catch (error) {
        if (lastInvalidPinRef.current !== value) {
          showToast("error", "Please enter a valid postcode!");
          lastInvalidPinRef.current = value;
        }
        setPostalCodeValidate(false);
      } finally {
        setIsCheckingPostcode(false);
      }
    }, 500);
  };

  const handleSelectService = useCallback(
    (item) => {
      setService(item.name);
      setIsDropdownOpen(false);
    },
    [dispatch]
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (isDropdownOpen && service.trim()) {
        dispatch(searchService({ search: service }));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [service, isDropdownOpen, dispatch]);

  return (
    <>
      <section className="relative h-[633px] w-full">
        <div
          className="relative flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat h-auto px-[208px] py-[65.5px] max-[1280px]:px-[100px] max-[980px]:px-[50px] max-[480px]:px-[10px] max-[480px]:py-[20px]"
          style={{ backgroundImage: "url('/images/HowLocalistsWorksBg.png')" }}>

          {/* <div className="w-full h-full bg-[url('/images/HowLocalistsWorksBg.png')] bg-cover bg-center bg-no-repeat flex justify-center items-center"> */}
          <div className="flex flex-col items-center w-full">
            {/* <h1 className="font-black text-[81px] leading-[75px] tracking-[-0.03em] font-inter text-white">
              How <span className="text-[#00AFE3]">localists.com</span> Works
            </h1> */}
            <h1
              className="text-center text-[45px] leading-[45px] max-[768px]:text-[38px] max-[520px]:text-[32px]"
            >
              <span className="font-semibold text-[var(--text-color)]">
                How{" "}
              </span>

              <span className="font-bold text-[var(--primary-color)]">
                Localists.com{" "}
              </span>

              <span className="font-semibold text-[var(--text-color)]">
                Works
              </span>
            </h1>
            <div className="bg-[#ffffffe5] rounded-[10px] text-center w-full">
              <div className="pt-[32px] px-[33px] pb-[33.5px]">
                <p className="font-bold text-[22px] leading-[37px] text-center">
                  Now you know how it works, start looking for a professional.
                </p>

                <div className="flex justify-between gap-[18px] mt-[30px]">
                  <div className="flex flex-col flex-1 text-left relative">
                    <label className="font-semibold text-[16px] text-[var(--text-color)] mb-[16px]">
                      What service do you need?
                    </label>

                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-3 w-full shadow-[0_0_2px_0.5px_rgba(0,0,0,0.10)]"
                      placeholder="Landscaping, Driveway Installation, etc..."
                      value={service}
                      onChange={(e) => {
                        setService(e.target.value);
                        setIsDropdownOpen(!!e.target.value);
                        // setSelectedService(null);
                      }}
                    />


                    {isDropdownOpen && service?.length > 0 && (
                      <div className="absolute top-full mt-1 w-full bg-white border border-[#ddd] rounded-[4px] max-h-[200px] overflow-y-auto z-10">
                        {loading ? (
                          <div className="flex items-center gap-2 p-2 text-sm text-gray-500">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[var(--primary-color)]" />
                          </div>
                        ) : (
                          services.map((item) => (
                            <p
                              key={item.id}
                              onClick={() => handleSelectService(item)}
                              className="px-2 py-2 text-[14px] cursor-pointer border-b border-[#eee] hover:bg-[#f0f0f0]">
                              {item.name}
                            </p>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 text-left relative">
                    <label className="font-semibold text-[16px] text-[var(--text-color)] mb-[16px]">
                      Where do you need it?
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-3 w-full"
                      placeholder="Enter Postcode (No Spaces)"
                      ref={inputRef}
                      name="postcode"
                      value={postcode}
                      onChange={handlePostcodeChange}

                    />
                    {isCheckingPostcode ? (
                      <span
                        className="
                    absolute right-[10px] top-[70%] -translate-y-1/2
                    inline-block h-4 w-4
                    animate-spin
                    rounded-full
                    border-2 border-gray-300
                    border-t-[var(--primary-color)]
                  "
                      />
                    ) : postalCodeValidate ? (
                      <img
                        style={{
                          position: "absolute",
                          left: "92%",
                          top: "55%",
                          height: "20px",
                          width: "20px",
                        }}
                        src={CheckIcon.src || CheckIcon}
                        alt="Success"
                        className="absolute left-[92%] top-[55%] h-[20px] w-[20px]"
                      />
                    ) : (
                      ""
                    )}
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

    </>
  );
}
 