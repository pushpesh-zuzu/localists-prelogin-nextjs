import React, { useEffect } from "react";
import { getBarkToken, getBarkUserData } from "@/utils/CookiesHelper";
import DownArrowSoldiDown from "../../../../public/ReactIcons/DownArrowSoldiDown";
import HamburgerIcon from "./HumbergeIcon";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileData } from "@/lib/store/buyerslice/buyerSlice";

function BuyerDesktopMenu({
  isBuyer,
  router,
  menuRef,
  userDropdownOpen,
  setUserDropdownOpen,
  handleLogoutClick,
  handleNavigation,
  setMobileMenuOpen,
  mobileMenuOpen,
  pathname,
}) {
  const dispatch = useDispatch();
  const profileData = useSelector(
    (state) => state.buyer.getuploadImg
  );
  const userName = profileData?.[0]?.name || "";

  // console.log("userName", userName, getBarkUserData())

  useEffect(() => {
    dispatch(updateProfileData());
  }, [dispatch]);


  return (
    <div className="flex items-center gap-[10px] lg:gap-5">
      {/* Mobile Hamburger Button */}
      {isBuyer && (
        <button
          className="p-2 block lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <HamburgerIcon />
        </button>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && isBuyer && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg absolute right-[10%] w-[150px] top-[70%] z-50">
          <div className="px-4 py-3">
            <button
              onClick={() => {
                router.push("/buyers/create");
                setMobileMenuOpen(false);
              }}
              className={`block whitespace-nowrap max-w-fit mx-auto leading-6 text-xs text-center w-full border-b-2 border-[#00afe3] pb-[5px] ${pathname === "/buyers/create"
                ? "text-[#00aef3] bg-blue-50"
                : "text-gray-700 "
                }`}
            >
              My Request
            </button>
          </div>
        </div>
      )}

      {/* Desktop Button */}
      {isBuyer && (
        <button
          onClick={() => router.push("/buyers/create")}
          className="hidden lg:block cursor-pointer border-b-4 tracking-[0.01em] text-[16px] text-[#1e2a2e] font-medium border-[#00aef3] pb-[5px]"
        >
          My Request
        </button>
      )}

      {/* User Dropdown */}
      {getBarkToken() ? (
        <div className="relative" ref={menuRef}>
          <div
            className="flex items-center gap-1 cursor-pointer py-2"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
          >
            <span className="text-[#1e2a2e] text-[16px] font-medium tracking-[0.01em]">
              {/* {getBarkUserData()?.name} */}
              {userName}
            </span>
            {/* <ChevronDown className="w-4 h-4 text-gray-500" /> */}
            <DownArrowSoldiDown />
          </div>

          {/* User Dropdown Menu */}
          {userDropdownOpen && (
            <div className={`absolute right-2  lg:${isBuyer ? '-right-[36px]' : '-right-[16px]'} mt-1 z-50`}>
              <div className="relative bg-white rounded-lg p-3 shadow-[0_10px_24px_0_rgba(0,0,0,0.12),0_6px_12px_-4px_rgba(0,0,0,0.16),0_14px_40px_10px_rgba(0,0,0,0.08)]">
                {/* Arrow */}
                <div className="absolute -top-1 left-[90%] md:left-[80%]   xl:left-[70%] -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>

                {/* Menu - Only for Buyers */}
                {isBuyer && (
                  <>
                    <button
                      onClick={() => handleNavigation("/user/notification")}
                      className=" text-sm lg:text-base whitespace-nowrap cursor-pointer w-full text-left p-3 "
                    >
                      Notification
                    </button>

                    <button
                      onClick={() => handleNavigation("/user/settings")}
                      className="text-sm lg:text-base whitespace-nowrap cursor-pointer w-full text-left p-3 "
                    >
                      Account Settings
                    </button>
                  </>
                )}

                <button
                  onClick={handleLogoutClick}
                  className="text-sm lg:text-base whitespace-nowrap cursor-pointer w-full text-left p-3"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BuyerDesktopMenu;
