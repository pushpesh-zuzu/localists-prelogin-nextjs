"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getBarkUserData } from "@/utils/CookiesHelper";
import LogoIcon from "../common/icons/HomePageIcons/LogoIcon";
import SellerDesktopMenu from "./SellerDesktopMenu";
import SellerMobileMenu from "./SellerMobileMenu";
import SellerMobileRightBellUser from "./SellerMobileRightBellUser";
import BuyerDesktopMenu from "./BuyerDesktopMenu";
import { resetProgress } from "@/lib/store/buyerslice/buyerSlice";
import { userLogout } from "@/lib/store/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@/utils/toaster";
import { getNotificationList, markNotificationsAsRead } from "@/lib/store/sellerSlice/notificationService";

const AuthenticatedHeader = () => {
  const dispatch = useDispatch();
  const { registerData } = useSelector((state) => state.findJobs);
  const userToken = getBarkUserData()?.id;
  const notifications = useSelector(
    (state) => state.notification?.notificationList,
  );

  const unreadCount = notifications?.filter(
    (n) => n.status === "unread",
  ).length;

  const lastId = useSelector((state) => state.notification?.lastId);

  const router = useRouter();
  const pathname = usePathname();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const wrapperRef = useRef(null);
  const menuRef = useRef(null);

  const getUserType = () => {
    return getBarkUserData()?.active_status || 0;
  };

  const isSeller = getUserType() === 1;
  const isBuyer = getUserType() === 2;

  const sellerLinks = [
    { href: "/sellers/dashboard", label: "Dashboard" },
    { href: "/sellers/leads", label: "New Leads" },
    { href: "/sellers/leads/save-for-later", label: "Saved Leads" },
    { href: "/sellers/leads/my-responses", label: "My Responses" },
    { href: "/settings", label: "Settings" },
    { href: "/en/gb/contact-us", label: "Help" },
  ];

  const handleNavigation = (href) => {
    router.push(href);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };


  const handleLogoutClick = async () => {
    try {
      const result = await dispatch(userLogout());
      if (result) {
        showToast("info", "Logout successful!");
        router.push("/en/gb/login");
        localStorage.removeItem("pendingBuyerModal");
        dispatch(resetProgress());
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  useEffect(() => {
    const payload = {
      user_id: userToken?.id || registerData?.id || "",
    };
    if (payload.user_id) {
      dispatch(getNotificationList(payload));

      const intervalId = setInterval(() => {
        dispatch(getNotificationList(payload));
      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, [dispatch, userToken, registerData]);

  const handleMarkAllAsRead = () => {
    const userId = userToken?.id || registerData?.id;
    if (!userId || unreadCount === 0) return;

    dispatch(
      markNotificationsAsRead({
        user_id: userId,
        last_id: lastId,
      }),
    );
  };

  // Close dropdowns on outside click and scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setPopoverVisible(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    const handleScroll = () => {
      setMobileMenuOpen(false);
      setPopoverVisible(false);
      setUserDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPopoverVisible(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  // Format notification time
  const formatNotificationTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      timeZone: "Europe/London",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <header
      className="w-full sticky top-0 left-0 border-b border-[#DEDEDE] bg-white z-50"
      role="banner"
    >
      <div className="flex justify-between items-center p-2.5 md:py-[18px] md:px-[30px] lg:pl-10 lg:pr-6 lg:pt-[10px] lg:pb-[24px] xl:px-[88px] xl:pb-6 xl:pt-[18px]">
        {/* Logo */}
        <a href="/" aria-label="Go to Localists homepage" className="shrink-0">
          <LogoIcon className="w-[90px] md:w-[115px] lg:w-[125px] xl:h-[38px] xl:w-[195px]" />
        </a>
        <div className="flex gap-2.5">
          <SellerMobileMenu
            isSeller={isSeller}
            sellerLinks={sellerLinks}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            pathname={pathname}
            handleNavigation={handleNavigation}
          />
          {/* Desktop Navigation - Only for Sellers - hidden on mobile (lg:flex) */}
          <SellerMobileRightBellUser
            isSeller={isSeller}
            notifications={notifications}
            unreadCount={unreadCount}
            popoverVisible={popoverVisible}
            setPopoverVisible={setPopoverVisible}
            wrapperRef={wrapperRef}
            formatNotificationTime={formatNotificationTime}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
          <SellerDesktopMenu
            isSeller={isSeller}
            sellerLinks={sellerLinks}
            notifications={notifications}
            unreadCount={unreadCount}
            popoverVisible={popoverVisible}
            setPopoverVisible={setPopoverVisible}
            wrapperRef={wrapperRef}
            onMarkAllAsRead={handleMarkAllAsRead}
            formatNotificationTime={formatNotificationTime}
          />
          <BuyerDesktopMenu
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            isBuyer={isBuyer}
            router={router}
            menuRef={menuRef}
            userDropdownOpen={userDropdownOpen}
            setUserDropdownOpen={setUserDropdownOpen}
            handleLogoutClick={handleLogoutClick}
            handleNavigation={handleNavigation}
          />
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedHeader;
