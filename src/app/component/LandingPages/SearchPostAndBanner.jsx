"use client"

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCityName,
  setbuyerRequestData,
  setBuyerStep,
  setcitySerach,
} from "@/lib/store/buyerslice/buyerSlice";
import { message, Spin } from "antd";
// import BuyerRegistrationLandingPage from "../BuyerRegistrationLandingPage/BuyerRegistrationLandingPage";
import { LoadingOutlined } from "@ant-design/icons";

const SearchPostAndBanner = ({
  title = "",
  defaultService,
  isNeedS = false,
  cancelHeading,
  cancelPara,
  serviceId,
  welcomModalTitle,
  welcomModalButtonText,
}) => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const { postCodeLoader, buyerRequest } = useSelector((state) => state.buyer);

  const [pincode, setPincode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isStartWithQuestionModal, setIsStartWithQuestionModal] =
    useState(false);

  const inputRef = useRef(null);
  const showToast = (type, content) => message[type](content);

  const handleClose = () => {
    setShowModal(false);
    setPincode("");
    setIsStartWithQuestionModal(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(true);
      setIsStartWithQuestionModal(true);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  const handleContinue = async () => {
    if (!pincode.trim()) {
      showToast("error", "Please enter a valid postcode or town.");
      return;
    }

    if (userToken?.active_status === 1) {
      showToast("error", "You are not a buyer.");
      return;
    }

    try {
      const response = await dispatch(getCityName({ postcode: pincode }));
      const data = response?.unwrap ? await response.unwrap() : response;

      if (data?.data?.valid) {
        dispatch(setcitySerach(data.data.city));
        dispatch(
          setbuyerRequestData({
            ...buyerRequest,
            postcode: data.data.postcode,
            city: data.data.city,
          })
        );
        setShowModal(true);
      } else {
        showToast("error", "Please enter a valid postcode!");
      }
    } catch {
      showToast("error", "Please enter a valid postcode!");
    }
  };

  return (
    <div className="w-[884px] mx-auto text-center">
      {/* Heading */}
      <h1
        className="
          text-[45px] font-semibold text-white mb-[15px]
          bg-black/50 inline-block px-2
          max-[768px]:text-[38px]
          max-[500px]:text-[32px] max-[500px]:leading-[40px]
        "
      >
        Compare{" "}
        <span className="text-[var(--primary-color)]">
          FREE QUOTES{isNeedS ? "s" : ""}
        </span>{" "}
        from local {title}!
      </h1>

      {/* Search Box */}
      <div
        className="
          flex flex-col items-center gap-[26px]
          px-[44px] py-[25px]
          rounded-[10px]
          mx-auto
          max-[768px]:px-[30px] max-[768px]:py-[50px]
          max-[500px]:px-[15px] max-[500px]:py-[20px] max-[500px]:gap-[6px]
        "
      >
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter Postcode (No Spaces)"
            className="
              w-[509px] h-[50px]
              border border-[#d9d9d9]
              shadow-[0px_0px_2px_0.5px_#0000001a]
              font-semibold text-[16px]
              pl-[18px]
              placeholder:text-[#959595]
              max-[980px]:w-full
              max-[500px]:h-[36px] max-[500px]:text-[12px]
              max-[400px]:pl-[12px]
            "
          />

          <button
            disabled={postCodeLoader}
            onClick={handleContinue}
            className="
              absolute right-[7px]
              w-[187px] h-[40px]
              bg-[var(--primary-color)] text-white
              rounded-[3px]
              text-[20px] font-medium
              shadow-[0px_0px_2px_0.5px_#0000001a]
              hover:bg-[#008cc0]
              max-[980px]:w-[157px]
              max-[768px]:w-[120px]
              max-[500px]:w-[60px] max-[500px]:h-[26px] max-[500px]:text-[12px]
            "
          >
            {postCodeLoader ? (
              <Spin
                indicator={
                  <LoadingOutlined spin style={{ color: "white" }} />
                }
              />
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (userToken?.active_status === 2 || !userToken) && (
        <BuyerRegistrationLandingPage
          closeModal={handleClose}
          postcode={pincode}
          postalCodeValidate
          serviceName={defaultService}
          cancelHeading={cancelHeading}
          cancelPara={cancelPara}
          isStartWithQuestionModal={isStartWithQuestionModal}
          serviceId={serviceId}
          welcomModalTitle={welcomModalTitle}
          welcomModalButtonText={welcomModalButtonText}
        />
      )}
    </div>
  );
};

export default SearchPostAndBanner;
