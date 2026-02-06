import {
  getBarkToken,
  getBarkUserData,
  getCookie,
} from "@/utils/CookiesHelper";
import { showToast } from "@/utils";

export function checkAuthenticatedUser(router) {
  const token = getBarkToken();
  const isRegistrationComplete = getCookie("isRegistrationComplete");

  const userType = getBarkUserData()?.active_status || 0;
  const isBuyer = userType === 2;
  const isSeller = userType === 1;

  if (token && isRegistrationComplete && isBuyer) {
    showToast("info", "You are already logged in. Redirecting...");
    router.replace("/buyers/create");
    return false;
  }

  if (token && isRegistrationComplete && isSeller) {
    showToast("info", "You are already logged in. Redirecting...");
    router.replace("/sellers/leads");
    return false;
  }

  return true;
}

export function isRegistrationCompleted() {
  const isRegistrationComplete = getCookie("isRegistrationComplete");
  if (isRegistrationComplete) {
    return true;
  } else {
    return false;
  }
}
