"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useUserInfo from "@/utils/getUserIp";
import FindLocalJobs from "@/app/component/SellerRegistrationForm/FindLocalJobs";
import GrowthSteps from "@/app/component/SellerRegistrationForm/GrowthSteps"
import { setSelectedServiceFormData } from "@/lib/store/findjobslice";

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
      <FindLocalJobs />;
      <GrowthSteps />
    </main>
  )




}

export default page;
