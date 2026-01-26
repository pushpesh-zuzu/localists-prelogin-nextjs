"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showToast } from "@/utils/toaster";
import axiosInstance from "../axios";
import {
  getcreateRequest,
  getCreateRequestToken,
  setCookie,
} from "@/utils/CookiesHelper";
import { setRegisterData, setRegisterToken } from "../findjobslice";
// import { setToken } from "../authSlice";
// import { updateLocalStorageValue } from "@/utils";
// import { safeLocalStorage } from "@/utils/localStorage";

const initialState = {
  resendOtpLoader: false,
  questionLoader: false,
  questionanswerData: [],
  buyerStep: 1,
  profileLoader: false,
  profileImageLoader: false,
  changePasswordLoader: false,
  requestId: "",
  citySerach: "",
  createRequestLoader: false,
  buyerRequest: {
    service_id: "",
    postcode: "",
    city: "",
    questions: [],
    phone: "",
    recevive_online: "",
    email: "",
    name: "",
    ip: "",
    entryUrl: "",
  },
  buyerRequestInternalQuestion: {
    questions: [],
  },
  questionsForProgress: [],
  qualityData: {},
  addDetailLoader: false,
  buyerrequestListLoader: false,
  buyerRequestList: [],
  // // requestDataList: safeLocalStorage.getItem("createRequest")
  // //   ? JSON.parse(safeLocalStorage.getItem("createRequest"))
  // //   : null,
  // requestDataList: null,
  // // createRequestToken: safeLocalStorage.getItem("createRequestToken")
  // //   ? JSON.parse(safeLocalStorage.getItem("createRequestToken"))
  // //   : null,
  // createRequestToken: null,
  requestDataList: getcreateRequest() || null,
  createRequestToken: getCreateRequestToken() || null,

  getuploadImg: [],
  requestUserId: null,
  requestUserPhone: "",
  infoLoader: false,
  requestLoader: false,
  submitImageLoader: false,
  notificationList: [],
  notificationLoader: false,
  addNotificationLoader: false,
  verifyPhoneNumberLoader: false,
  postCodeLoader: false,
  searchServiceLoader: false,
  redirectFromHome: false,
};

// ----------------------------
// Async Thunks
// ----------------------------

export const questionAnswerData = (questionData) => {
  return async (dispatch) => {
    dispatch(setquestionLoader(true));
    try {
      const response = await axiosInstance.post(
        `users/questions-answer`,
        questionData,
        {
          headers: {
            Authorization: null,
          },
        }
      );

      if (response) {
        dispatch(setQuestionAnswerData(response?.data?.data));
      }
    } catch (error) {
      console.error("Error fetching question answers:", error);
    } finally {
      dispatch(setquestionLoader(false));
    }
  };
};

export const getProgressPercentageAPI = (progressData) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post(
        `get-progress-percentage`,
        progressData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.data?.percentage !== undefined) {
        return response.data.data;
      }
    } catch (error) {
      console.error(
        "Error getting progress percentage:",
        error?.response?.data
      );
    }
  };
};

export const createRequestData = (requestData) => {
  return async (dispatch) => {
    dispatch(setCreateRequesLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/my-request/create-new-request`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        dispatch(setRequestUserId(response.data.data?.user_id));
        dispatch(setRequestUserPhone(response.data.data?.phone));
        dispatch(setRequestId(response?.data?.data?.request_id));
        return response.data;
      }
    } catch (error) {
      showToast("error", error?.message);
    } finally {
      dispatch(setCreateRequesLoader(false));
    }
  };
};

export const registerQuoteCustomer = (customerData) => {
  return async (dispatch) => {
    dispatch(setCreateRequesLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/register-quote-customer`,
        customerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        // console.log("ammmmmmmmm", response.data.data?.user_id)
        dispatch(setRequestUserId(response.data.data?.user_id));
        dispatch(setRequestUserPhone(response.data.data?.phone));
        return response.data;
      }
    } catch (error) {
      console.error("Error registering quote customer:", error?.response?.data);
      showToast("error", error?.response?.data?.message);
      throw error;
    } finally {
      dispatch(setCreateRequesLoader(false));
    }
  };
};

export const updateMobile = (phone) => {
  return async (dispatch) => {
    dispatch(setCreateRequesLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/update-register-phone-number`,
        phone,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        dispatch(setRequestUserId(response.data.data?.user_id));
        dispatch(setRequestUserPhone(response.data.data?.phone));
        return response.data;
      }
    } catch (error) {
      console.error("Error updating mobile:", error?.response?.data);
      showToast("error", error?.response?.data?.message);
      throw error;
    } finally {
      dispatch(setCreateRequesLoader(false));
    }
  };
};

export const updateProfileData = () => {
  return async (dispatch) => {
    dispatch(setProfileLoader(true));
    try {
      const response = await axiosInstance.get(
        `customer/setting/get-profile-info`
      );

      if (response) {
        dispatch(setGetUploadImgData(response?.data?.data));
        // updateLocalStorageValue(
        //   "barkUserToken",
        //   "profile_image",
        //   response?.data?.data?.[0]?.profile_image
        // );
        // updateLocalStorageValue(
        //   "registerDataToken",
        //   "profile_image",
        //   response?.data?.data?.[0]?.profile_image
        // );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      dispatch(setProfileLoader(false));
    }
  };
};

export const updateProfileImageData = (profileImageData) => {
  return async (dispatch) => {
    dispatch(setProfileImageLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/setting/update-profile-image`,
        profileImageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        dispatch(updateProfileData());
        return response.data;
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
    } finally {
      dispatch(setProfileImageLoader(false));
    }
  };
};

export const updatePasswordData = (changeData) => {
  return async (dispatch) => {
    dispatch(setChangePasswordLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/setting/change-password`,
        changeData
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
      dispatch(setChangePasswordLoader(false));
    }
  };
};

export const updateUserIfoData = (userData) => {
  return async (dispatch) => {
    dispatch(setChangeInfoLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/setting/update-profile-info`,
        userData
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    } finally {
      dispatch(setChangeInfoLoader(false));
    }
  };
};

export const addImageSubmittedData = (ImageData) => {
  return async (dispatch) => {
    dispatch(setSubmitImageLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/my-request/add-image-to-submitted-request`,
        ImageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error("Error submitting image:", error);
    } finally {
      dispatch(setSubmitImageLoader(false));
    }
  };
};

export const textQualityData = (qualityData) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post(
        `customer/my-request/check-paragraph-quality`,
        qualityData
      );

      if (response) {
        dispatch(setQualityData(response?.data?.data?.quality_score));
      }
    } catch (error) {
      console.error("Error checking text quality:", error);
    }
  };
};

export const getbuyerrequestList = () => {
  return async (dispatch) => {
    dispatch(setbuyerrequestListLoader(true));
    try {
      const response = await axiosInstance.get(
        `customer/my-request/get-submitted-request-list`
      );
      if (response) {
        dispatch(setbuyerRequestList(response?.data?.data));
      }
    } catch (error) {
      console.error("Error fetching buyer request list:", error);
    } finally {
      dispatch(setbuyerrequestListLoader(false));
    }
  };
};

export const addDetailsRequestData = (addDetailsData, router, requestId) => {
  return async (dispatch) => {
    dispatch(setAddDetailLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/my-request/add-details-to-request`,
        addDetailsData
      );

      if (response) {
        dispatch(getbuyerrequestList());
        router.push(`/conversion/${requestId}`);
        // router.push('/conversion/${requestId}')
        setTimeout(() => {
          return response.data;
        }, 5000);
      }
    } catch (error) {
      console.error("Error adding details to request:", error);
    } finally {
      // dispatch(setAuthToken());
      dispatch(setAddDetailLoader(false));
    }
  };
};

export const getNotificationData = (NotificationData) => {
  return async (dispatch) => {
    dispatch(setNotificationLoader(true));
    try {
      const response = await axiosInstance.post(
        `notification/get-notification-settings`,
        NotificationData
      );

      if (response) {
        dispatch(setGetNotificationData(response?.data?.data));
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching notification data:", error);
    } finally {
      dispatch(setNotificationLoader(false));
    }
  };
};

export const addNotificationData = (addNotificationData) => {
  return async (dispatch) => {
    dispatch(setAddNotificationLoader(true));
    try {
      const response = await axiosInstance.post(
        `notification/add-update-notification-settings`,
        addNotificationData
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error("Error adding notification:", error);
    } finally {
      dispatch(setAddNotificationLoader(false));
    }
  };
};

export const verifyPhoneNumberData = (verifyData) => {
  return async (dispatch) => {
    dispatch(setVerifyPhoneNumberLoader(true));
    try {
      const response = await axiosInstance.post(
        `customer/verify-phone-number`,
        verifyData
      );
      if (response?.data?.success) {
        setCookie("barkToken", response?.data?.data?.remember_tokens);
        setCookie("barkUserToken", response?.data?.data);
        dispatch(setRequestData(response?.data?.data));
        dispatch(setCreateRequestToken(response?.data?.data?.remember_tokens));
        // dispatch(setRegisterData(response?.data?.data));
        // dispatch(setRegisterToken(response?.data?.data?.remember_tokens));
        // dispatch(setToken(response?.data?.data?.remember_tokens));
        return response.data;
      }
    } catch (error) {
      console.error("Error verifying phone number:", error);
    } finally {
      dispatch(setVerifyPhoneNumberLoader(false));
    }
  };
};

export const closeRequestData = (closeData) => {
  return async (dispatch) => {
    dispatch(setChangeInfoLoader(true));
    try {
      const response = await axiosInstance.post(
        `users/submit-leads`,
        closeData
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error("Error closing request:", error);
    } finally {
      dispatch(setChangeInfoLoader(false));
    }
  };
};

export const resendOtp = (data) => {
  return async (dispatch) => {
    dispatch(setResendOtpLoader(true));
    try {
      const response = await axiosInstance.post(`/resend-otp`, data);
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      dispatch(setResendOtpLoader(false));
    }
  };
};

export const getCityName = (postcodeData) => {
  return async (dispatch) => {
    dispatch(setPostCodeLoader(true));
    try {
      const response = await axiosInstance.post(`get-city-name`, postcodeData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response) {
        dispatch(
          setbuyerRequestData({
            city: response?.data?.data?.city,
            postcode: response?.data?.data?.postcode,
          })
        );
        return response.data;
      }
    } catch (error) {
      // showToast("error", error?.response?.data?.data.error);
      console.log("Error getting city name:", error?.response?.data);
      throw error;
    } finally {
      dispatch(setPostCodeLoader(false));
    }
  };
};

export const checkEmailIdApi = createAsyncThunk(
  "buyer/email-id",
  async (emailData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`check/email-id`, emailData);
      // console.log(response, "rrrrrrrrrr");
      return response.data.data;
    } catch (error) {
      showToast("error", error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ----------------------------
// Buyer Slice
// ----------------------------

const buyerSlice = createSlice({
  name: "buyer",
  initialState: initialState,
  reducers: {
    setPostCodeLoader: (state, action) => {
      state.postCodeLoader = action.payload;
    },
    setResendOtpLoader: (state, action) => {
      state.resendOtpLoader = action.payload;
    },
    setquestionLoader(state, action) {
      state.questionLoader = action.payload;
    },
    setQuestionAnswerData(state, action) {
      state.questionanswerData = action.payload;
    },
    setBuyerStep(state, action) {
      state.buyerStep = action.payload;
    },
    setProfileLoader(state, action) {
      state.profileLoader = action.payload;
    },
    setProfileImageLoader(state, action) {
      state.profileImageLoader = action.payload;
    },
    setChangePasswordLoader(state, action) {
      state.changePasswordLoader = action.payload;
    },
    setbuyerRequestData(state, action) {
      state.buyerRequest = { ...state.buyerRequest, ...action.payload };
    },
    setBuyerRequestInternalQuestion(state, action) {
      state.buyerRequestInternalQuestion = {
        ...state.buyerRequestInternalQuestion,
        ...action.payload,
      };
    },
    setRequestId(state, action) {
      state.requestId = action.payload;
    },
    setQualityData(state, action) {
      state.qualityData = action.payload;
    },
    setAddDetailLoader(state, action) {
      state.addDetailLoader = action.payload;
    },
    setbuyerrequestListLoader(state, action) {
      state.buyerrequestListLoader = action.payload;
    },
    setbuyerRequestList(state, action) {
      state.buyerRequestList = action.payload;
    },
    setGetUploadImgData(state, action) {
      state.getuploadImg = action.payload;
    },
    setChangeInfoLoader(state, action) {
      state.infoLoader = action.payload;
    },
    setCreateRequesLoader(state, action) {
      state.requestLoader = action.payload;
    },
    setSubmitImageLoader(state, action) {
      state.submitImageLoader = action.payload;
    },
    setGetNotificationData(state, action) {
      state.notificationList = action.payload;
    },
    setNotificationLoader(state, action) {
      state.notificationLoader = action.payload;
    },
    setAddNotificationLoader(state, action) {
      state.addNotificationLoader = action.payload;
    },
    setRequestData(state, action) {
      state.requestDataList = action.payload;
      // safeLocalStorage.setItem("createRequest", JSON.stringify(action.payload));
    },
    setRequestUserId: (state, action) => {
      state.requestUserId = action.payload;
    },
    setRequestUserPhone: (state, action) => {
      state.requestUserPhone = action.payload;
    },
    setCreateRequestToken(state, action) {
      state.createRequestToken = action.payload;
      // safeLocalStorage.setItem("createRequestToken", JSON.stringify(action.payload));
    },
    clearSetBuyerRequestInternalQuestion(state) {
      state.buyerRequestInternalQuestion = {
        questions: [],
      };
    },
    clearSetbuyerRequestData(state) {
      state.buyerRequest = {
        service_id: "",
        postcode: "",
        questions: [],
        phone: "",
        recevive_online: "",
        email: "",
        name: "",
      };
      state.buyerStep = 1
    },
    setVerifyPhoneNumberLoader(state, action) {
      state.verifyPhoneNumberLoader = action.payload;
    },
    setRedirectFromHome(state, action) {
      state.redirectFromHome = action.payload;
    },
    setcitySerach(state, action) {
      state.citySerach = action.payload;
    },
    setQuestionsForProgress(state, action) {
      state.questionsForProgress = action.payload;
    },
    resetProgress(state) {
      state.questionsForProgress = [];
    },
    setsearchServiceLoader(state, action) {
      state.searchServiceLoader = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // checkEmailIdApi
      .addCase(checkEmailIdApi.pending, (state) => {
        state.searchServiceLoader = true;
      })
      .addCase(checkEmailIdApi.fulfilled, (state) => {
        state.searchServiceLoader = false;
      })
      .addCase(checkEmailIdApi.rejected, (state) => {
        state.searchServiceLoader = false;
      });
  },
});

export const {
  setPostCodeLoader,
  setResendOtpLoader,
  setquestionLoader,
  setAddNotificationLoader,
  setcitySerach,
  clearSetbuyerRequestData,
  setCreateRequestToken,
  setRequestData,
  setVerifyPhoneNumberLoader,
  setQuestionAnswerData,
  setNotificationLoader,
  setBuyerStep,
  setProfileLoader,
  setProfileImageLoader,
  setSubmitImageLoader,
  setChangePasswordLoader,
  setbuyerRequestData,
  setRequestUserId,
  setRequestId,
  setQualityData,
  setAddDetailLoader,
  setbuyerrequestListLoader,
  setbuyerRequestList,
  setGetUploadImgData,
  setChangeInfoLoader,
  setCreateRequesLoader,
  setGetNotificationData,
  setRequestUserPhone,
  setRedirectFromHome,
  setQuestionsForProgress,
  setBuyerRequestInternalQuestion,
  clearSetBuyerRequestInternalQuestion,
  resetProgress,
  setsearchServiceLoader,
} = buyerSlice.actions;

export default buyerSlice.reducer;
