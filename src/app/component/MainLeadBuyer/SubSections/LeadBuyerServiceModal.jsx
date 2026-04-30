"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchService, setSelectedServiceId, setService } from "@/lib/store/findjobslice";
import { useParams, useRouter } from "next/navigation";
import { generateSlug } from "@/utils";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
import Paragraph from "../../UI/Typography/Paragraph";
import { X } from "lucide-react";
import RightArrowBlack from "../../common/icons/HomePageIcons/RightArrowBlack";

export default function LeadBuyerServiceModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { lang, country } = useParams();

  const modalRef = useRef(null);
  const debounceRef = useRef(null);

  const [input, setInput] = useState("");

  const { service, searchServiceLoader } = useSelector(
    (state) => state.findJobs,
  );

  const currentLang = lang || "en";
  const currentCountry = country || "gb";

  // ✅ Load default list on open
  useEffect(() => {
    if (isOpen) {
      dispatch(searchService({ search: "" }));
    }
  }, [isOpen, dispatch]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Cleanup
  useEffect(() => {
    if (!isOpen) {
      setInput("");
      dispatch(setService([]));
    }
  }, [isOpen, dispatch]);

  // Debounce search
  const triggerSearch = (value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      dispatch(searchService({ search: value.trim() }));
    }, 300);
  };

  // Select → redirect
  const handleSelect = (item) => {
    const slug = generateSlug(item.seo_title);
    router.push(
      `/${currentLang}/${currentCountry}/sellers/create-account/${slug}`,
    );
    dispatch(setSelectedServiceId(item.id));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      {/* ✅ Modal Box */}
      <div
        ref={modalRef}
        className="bg-white w-full max-w-[550px] h-[500px] md:h-[550px] rounded-xl px-5 py-7.5 md:px-12 md:py-7.5 relative flex flex-col"
      >
        {/* ❌ Close button */}
        <div className="flex items-start md:items-start justify-between  mb-7.5 md:mb-10">
          <div className="md:max-w-[70%]">
            <h4
              className={`font-Inter font-black tracking-[-0.03em] text-[24px] leading-[25px]
                    md:text-[24px] md:leading-[25px] lg:text-[30px] lg:leading-[30px] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]`}
            >
              What type of work do you do?
            </h4>
          </div>

          <button
            onClick={onClose}
            className={` ml-auto text-[white] bg-[#00afe3] max-h-9 min-h-9 min-w-9 rounded-full cursor-pointer p-1.5 transition-all`}
            aria-label="Close modal"
          >
            <X size={20} className="m-auto" />
          </button>
        </div>

        {/* Input */}
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            triggerSearch(e.target.value);
          }}
          placeholder="Search category"
          className="w-full border mb-6 border-[#D9D9D9] rounded-2xl px-3 py-[12px] text-sm text-[#555] placeholder:text-[#BDBDBD] outline-none focus:border-[#00AFE3] transition-colors"
        />

        {/* 🔥 Scrollable Content */}
        <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto pr-3">
          {/* Loader */}
          {searchServiceLoader && (
            <div className="flex justify-center py-6">
              <LoaderIndicator />
            </div>
          )}

          {/* 🔍 SEARCH RESULTS */}
          {input && !searchServiceLoader && (
            <div className="space-y-2">
              {service?.length > 0 ? (
                service.map((item) => (
                  <div
                    key={item.uuid}
                    onClick={() => handleSelect(item)}
                    className="flex items-center justify-between py-5 px-[18px]  border rounded-lg  
                     border-[#D9D9D9] text-sm md:text-[18px] font-normal text-[#253238] hover:border-[#00AFE3] 
                     hover:text-[#00AFE3] transition-colors duration-200 cursor-pointer"
                  >
                    <span className="text-base leading-[20px] font-medium">
                      {item.name}
                    </span>
                    {/* <span className="text-lg">›</span> */}
                    <RightArrowBlack className="h-4 w-4" />
                  </div>
                ))
              ) : (
                <Paragraph className="text-center py-4">
                  No results found
                </Paragraph>
              )}
            </div>
          )}

          {/* ⭐ DEFAULT LIST */}
          {!input && !searchServiceLoader && (
            <div>
              <Paragraph variant="small" className="text-sm font-semibold mb-4">
                Popular categories
              </Paragraph>

              <div className="space-y-2">
                {service?.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="flex items-center justify-between py-5 px-[18px]  border rounded-lg  
                     border-[#D9D9D9] text-sm md:text-[18px] font-normal text-[#253238] hover:border-[#00AFE3] 
                     hover:text-[#00AFE3] transition-colors duration-200 cursor-pointer"
                  >
                    <span className="text-base leading-[20px] font-medium">
                      {item.name}
                    </span>
                    {/* <span className="text-lg">›</span> */}
                    <RightArrowBlack className="h-3 w-3" />
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
