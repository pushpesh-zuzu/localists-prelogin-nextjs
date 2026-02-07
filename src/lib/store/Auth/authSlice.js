import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { clearCookies, setCookie } from "@/utils/CookiesHelper";
import {
    clearAuthToken,
    clearBuyerRegisterFormData,
    clearServiceFormData,
    setAuthToken,
    setRegisterData,
    setRegisterStep,
    setRegisterToken,
    setSelectedServiceId,
    setselectedServices,
} from "../findjobslice";
import { setCreateRequestToken, setRequestData } from "../buyerslice/buyerSlice";
import { clearCompanyData } from "../companyJobSlice";
import { safeLocalStorage } from "@/utils/localStorage";
import { BASE_IMAGE_URL } from "@/utils";
import { extractEssentialUserData } from "@/utils/extractEssentialUserData";

/* -------------------------------------
   Helpers (SSR-safe)
------------------------------------- */

const getStoredItem = (key) => {
    if (typeof window === "undefined") return null;
    try {
        const value = safeLocalStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch {
        return null;
    }
};

/* -------------------------------------
   Initial State
------------------------------------- */

const initialState = {
    adminToken: getStoredItem("barkToken"),
    userToken: getStoredItem("barkUserToken"),
    loginLoader: false,
    logoutLoader: false,
    switchUserLoader: false,
    passwordlessLoader: false,
    currentUser: getStoredItem("barkUserToken")?.user_type || null,
    profile: null,
};

/* -------------------------------------
   Async Actions
------------------------------------- */

export const userLogin = (loginData) => {
  return async (dispatch) => {
    dispatch(setLoginLoader(true));
    try {
      const response = await axiosInstance.post(`users/login`, loginData);
        // console.log(response,'response login data')
        // localStorage.setItem('userDataLocalTesing',JSON.stringify(response))
      if (response?.data?.success) {
        dispatch(setToken(response?.data?.data?.remember_tokens));
        dispatch(setUserToken(response?.data?.data));
        dispatch(setCurrentUser(response?.data?.data?.user_type));
        dispatch(setAuthToken(response?.data?.data?.remember_tokens));
        setCookie("barkToken", response?.data?.data?.remember_tokens);
        setCookie("barkUserToken", extractEssentialUserData(response?.data?.data));
        setCookie('isRegistrationComplete',true)
        return response.data;
      } else {
        throw new Error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoginLoader(false));
    }
  };
};

export const sendPasswordlessLink = (data) => {
    return async (dispatch) => {
        dispatch(setPasswordlessLoader(true));
        try {
            const res = await axiosInstance.post(
                "/users/create-login-magic-link",
                data
            );

            if (!res?.data?.success) {
                throw new Error(res?.data?.message || "Failed to send magic link");
            }

            if (res?.data?.data?.magic_link) {
                console.log("Magiclink", res.data.data.magic_link);
            } else {
                console.warn("⚠️ Backend did not return magic link in response.");
            }

            return {
                success: true,
                message: res.data.message || "Magic link sent successfully",
            };
        } catch (error) {
            console.error("sendPasswordlessLink error:", error);
            throw new Error(
                error?.response?.data?.message ||
                error?.message ||
                "An error occurred while sending magic link"
            );
        } finally {
            dispatch(setPasswordlessLoader(false));
        }
    };
};

let magicLinkProcessed = false;

export const userLogout = () => {
    return async (dispatch) => {
        dispatch(setLogoutLoader(true));
        try {
            const response = await axiosInstance.post("users/logout");

            if (response) {
                dispatch(setToken());
                dispatch(setUserToken());
                dispatch(setRegisterToken());
                dispatch(setRegisterData());
                dispatch(setSelectedServiceId());
                dispatch(clearServiceFormData());
                dispatch(setselectedServices([]));
                dispatch(clearBuyerRegisterFormData());
                dispatch(setCreateRequestToken());
                dispatch(clearAuthToken());
                dispatch(setRequestData());
                dispatch(setRegisterStep(0));
                dispatch(clearCompanyData());
                clearCookies();
                safeLocalStorage.removeItem("barkToken");
                safeLocalStorage.removeItem("barkUserToken");
                safeLocalStorage.removeItem("registerDataToken");
                safeLocalStorage.removeItem("registerTokens");
                safeLocalStorage.removeItem("createRequestToken");
                safeLocalStorage.removeItem("createRequest");
                return true;
            }
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            dispatch(setLogoutLoader(false));
        }
    };
};


export const switchUser = (switchData) => {
    return async (dispatch) => {
        dispatch(setSwitchUserLoader(true));
        try {
            const response = await axiosInstance.post(
                `users/switch_user`,
                switchData
            );

            if (response?.data?.success) {
                return response.data;
            } else {
                throw new Error(response?.data?.message || "Switch User failed");
            }
        } catch (error) {
            throw error;
        } finally {
            dispatch(setSwitchUserLoader(false));
        }
    };
};

/* -------------------------------------
   Magic Link Profile Fetch
------------------------------------- */

export const fetchProfileFromMagicLink = (navigate) => {
    return async (dispatch, getState) => {
        try {
            if (magicLinkProcessed) return;
            magicLinkProcessed = true;

            const { user } = getState();
            if (user?.profile) return;

            const urlParams = new URLSearchParams(window.location.search);
            const clientIdBase64 = urlParams.get("client_id");

            if (!clientIdBase64) {
                throw new Error("client_id not found in URL");
            }

            const decodeBase64 = (str) => {
                try {
                    const base64Decoded = atob(str);

                    return decodeURIComponent(base64Decoded);
                } catch (err) {
                    console.error("Base64 decode failed:", err);
                    return null;
                }
            };

            const decodedClientId = decodeBase64(clientIdBase64);

            if (!decodedClientId) {
                throw new Error("Invalid client_id format");
            }

            const api = `${BASE_IMAGE_URL}users/get-seller-profile`;

            const res = await fetch(api, {
                method: "POST",

                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${decodedClientId}`,
                },
                body: JSON.stringify({
                    seller_id_magic: decodedClientId,
                }),
            });

            const profileResponse = await res.json();

            if (!profileResponse?.success) {
                throw new Error(
                    profileResponse?.message || "Failed to get seller profile"
                );
            }

            dispatch(setUserProfile(profileResponse.data));

            if (profileResponse.data) {
                dispatch(setToken(profileResponse.data?.remember_tokens));
                dispatch(setUserToken(profileResponse?.data));
                dispatch(setCurrentUser(profileResponse.data?.user_type));
                dispatch(setAuthToken(profileResponse.data?.remember_tokens));
                setCookie('isRegistrationComplete',true)
                setCookie("barkToken", profileResponse.data?.remember_tokens);
                setCookie("barkUserToken", extractEssentialUserData(profileResponse?.data));
                
                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${profileResponse.data?.remember_tokens}`;
            }

            return {
                success: true,
                profileData: profileResponse.data,
            };
        } catch (error) {
            console.error("fetchProfileFromMagicLink error:", error);
            throw new Error(
                error?.response?.data?.message ||
                error?.message ||
                "An error occurred while fetching profile"
            );
        }
    };
};

/* -------------------------------------
   Slice
------------------------------------- */

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action) {
            state.adminToken = action.payload;
            if (typeof window !== "undefined") {
                safeLocalStorage.setItem("barkToken", JSON.stringify(action.payload));
            }
        },
        setUserToken(state, action) {
            state.userToken = action.payload;
            if (typeof window !== "undefined") {
                safeLocalStorage.setItem(
                    "barkUserToken",
                    JSON.stringify(action.payload)
                );
            }
        },
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        setLoginLoader(state, action) {
            state.loginLoader = action.payload;
        },
        setLogoutLoader(state, action) {
            state.logoutLoader = action.payload;
        },
        setSwitchUserLoader(state, action) {
            state.switchUserLoader = action.payload;
        },
        setPasswordlessLoader(state, action) {
            state.passwordlessLoader = action.payload;
        },
        setUserProfile(state, action) {
            state.profile = action.payload;
        },
    },
});

export const {
    setToken,
    setUserToken,
    setCurrentUser,
    setLoginLoader,
    setLogoutLoader,
    setSwitchUserLoader,
    setPasswordlessLoader,
    setUserProfile,
} = authSlice.actions;

export default authSlice.reducer;
