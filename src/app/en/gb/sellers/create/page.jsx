"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useUserInfo from "@/utils/getUserIp";
import FindLocalJobs from "@/app/component/SellerRegistrationForm/FindLocalJobs";
import GrowthSteps from "@/app/component/SellerRegistrationForm/GrowthSteps"
import { setSelectedServiceFormData } from "@/lib/store/findjobslice";
import Footer from "@/app/component/Footer/Footer";
import SEO from "@/app/component/common/seo/SEO";
import CustomerSuccessStories from "@/app/component/SellerRegistrationForm/CustomerSuccessStories";


function page() {
  const dispatch = useDispatch();
  const { ip, url } = useUserInfo();

  useEffect(() => {
    if (ip && url) {
      dispatch(
        setSelectedServiceFormData({
          entry_url: url,
          user_ip_address: ip,
        })
      );
    }
  }, [ip, url, dispatch]);

  return (
    <main>
      <SEO conversion />
      <FindLocalJobs />;
      <GrowthSteps />
      <CustomerSuccessStories />
      <Footer />
    </main>
  )
}

export default page;
