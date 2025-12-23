"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { searchService } from "@/lib/store/searchSlice";
import { showToast } from "@/utils/toastify";
import { getCityName, setCitySearch } from "@/lib/store/postCodeSlice";
import GreenCheckIcon from "../../common/icons/GreenCheckIcon";
import Image from "next/image";

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
      showToast("error", "Please select a service from the suggestions.");
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
    <section className="relative flex flex-col items-center justify-center h-auto px-[208px] py-[65.5px] max-[1280px]:px-[100px] max-[980px]:px-[50px] max-[480px]:px-[10px] max-[480px]:py-[20px] lg:min-h-[633px]">
      
      <Image
        src="/images/HowItWorks/HowLocalistsWorksBg.webp"
        alt="Local service search form on localists.com"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[80%_center] sm:object-center"
      />

      <div className="relative flex flex-col items-center justify-center">
        <div className="flex flex-col items-center w-full">
          <h1 className="font-black text-[46px] md:text-[60px] lg:text-[81px] leading-[48px]  md:leading-[55px] lg:leading-[75px] tracking-[-0.03em] font-inter text-white text-center">
            How <span className="text-[#00AFE3]">localists.com</span> Works
          </h1>
          <div className="w-full xl:w-[1024px] bg-white/90 rounded-[10px] px-[30px] py-[32px] flex flex-col justify-center items-center mt-[20px] lg:mt-10px lg:mt-[22px]">

            <h2 className="font-black text-[30px] md:text-[35px] lg:text-[50px] leading-[34px] md:leading-[38px] lg:leading-[55px] tracking-[-0.01em] md:tracking-[-0.03em] font-inter text-black text-center">
              Now you know how it works, start looking for a professional.
            </h2>

            <form role="search" className="flex flex-col justify-between  mt-[30px] w-full">
              <div className="flex flex-col items-center">
                <div className="flex flex-col lg:flex-row gap-[18px] w-full">
                  <div className="flex flex-col flex-1 text-left relative">
                    <label htmlFor="service" className="font-bold text-[20px] leading-[22px] tracking-[-0.03em] text-black font-[Arial] mb-[7px]">
                      What service do you need?
                    </label>

                    <input
                      id="service"
                      type="text"
                      className="font-[Arial] font-bold !text-black border border-[#D9D9D9] rounded-[5px] pl-[12px] md:pl-[16px] pr-[22px] pt-[13px] pb-[13px] w-full shadow-[0_0_2px_0.5px_rgba(0,0,0,0.10)]"
                      placeholder="Architects, Landscaping, ..."
                      value={service}
                      onChange={(e) => {
                        setService(e.target.value);
                        setIsDropdownOpen(!!e.target.value);
                      }}
                    />

                    {isDropdownOpen && service?.length > 0 && (
                      <div className="absolute top-full mt-1 w-[420px] max-w-[240px] md:max-w-[420px] bg-white border border-[#ddd] rounded-[4px] max-h-[200px] overflow-y-auto z-10">
                        {loading ? (
                          <div className="flex items-center gap-2 p-2 text-sm text-gray-500">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#00AFE3] border-t-transparent" />
                          </div>
                        ) : (
                          services.map((item) => (
                            <p
                              key={item.id}
                              onClick={() => handleSelectService(item)}
                              className="text-black font-bold text-center px-2 py-2 text-[18px] cursor-pointer border-b border-[#eee] hover:bg-[#f0f0f0]">
                              {item.name}
                            </p>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 text-left relative">
                    <label htmlFor="postcode" className="font-bold text-[20px] leading-[22px] tracking-[-0.03em] text-black font-[Arial] mb-[7px]">
                      Where do you need it?
                    </label>
                    <input
                      id="postcode"
                      type="text"
                      className="font-[Arial] font-bold !text-black border border-[#D9D9D9] rounded-[5px] pl-[12px] md:pl-[16px] pr-[22px] pt-[13px] pb-[13px] w-full shadow-[0_0_2px_0.5px_rgba(0,0,0,0.10)]"
                      placeholder="Enter Postcode (No Spaces)"
                      ref={inputRef}
                      name="postcode"
                      value={postcode}
                      onChange={handlePostcodeChange}

                    />
                    {isCheckingPostcode ? (
                      <span
                        aria-hidden="true"
                        className="absolute right-[10px] top-[70%] -translate-y-1/2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#00AFE3] border-t-transparent"
                      />
                    ) : postalCodeValidate ? (
                      <div aria-hidden="true" className="absolute right-[10px] top-[56%]">
                        <GreenCheckIcon />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <button type="button" aria-haspopup="dialog" className="py-[13px] px-[33px] gap-[9.49px] rounded-[94.94px] bg-[#253238] text-white text-[16px] lg:text-[18px] font-[Arial] font-bold tracking-[-0.03em] shadow-[0px_1.9px_1.9px_rgba(0,0,0,0.1)] mt-[30px] cursor-pointer"
                  onClick={handleSubmit}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
