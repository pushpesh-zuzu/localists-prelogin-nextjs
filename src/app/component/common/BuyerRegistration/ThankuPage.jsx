"use client";

import { useRouter } from "next/navigation";
// import Script from "next/script";
import { CheckCircle, CheckIcon } from "lucide-react"; 
import H4 from "../../UI/Typography/H4";
import { useSelector } from "react-redux";
import { setCookie } from "@/utils/CookiesHelper";

const ThankuPage = () => {
  const router = useRouter();

  const { buyerStep } = useSelector((state) => state.buyer);
  //   useEffect(() => {
  //     // Track conversion
  //     if (typeof window !== "undefined" && window.gtag) {
  //       window.gtag('event', 'conversion', {
  //         'send_to': 'AW-17528251553/iVB9CJjZsZMbEKHJj6ZB',
  //         'value': 1.0,
  //         'currency': 'GBP'
  //       });
  //     }
  //   }, []);

  const handleSubmit = () => {
    if (typeof window !== "undefined") {
      const pendingModal = JSON.parse(
        localStorage.getItem("pendingBuyerModal") || "null",
      );
      localStorage.setItem("isRegistrationComplete", "false");
      setCookie('isRegistrationComplete',false)

      let redirectPath = "/";

      if (
        pendingModal?.baseRedirectPath &&
        pendingModal.baseRedirectPath !== "root"
      ) {
        const lang = "en";
        const country = "gb";
        redirectPath = `/${lang}/${country}/${pendingModal.baseRedirectPath}`;
      }

      router.push(redirectPath);
    }
  };

  return (
    <>
      {/* Google Analytics Script */}
      {/* <Script
        id="google-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('event', 'conversion', {
              'send_to': 'AW-17528251553/iVB9CJjZsZMbEKHJj6ZB',
              'value': 1.0,
              'currency': 'GBP'
            });
          `,
        }}
      />

      <Script
        id="microsoft-uet"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,t,r,u){
              var f,n,i;
              w[u]=w[u]||[],
              f=function(){
                var o={ti:"97207664",enableAutoSpaTracking:true};
                o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad");
              },
              n=d.createElement(t),
              n.src=r,
              n.async=1,
              n.onload=n.onreadystatechange=function(){
                var s=this.readyState;
                (s&&s!=="loaded"&&s!=="complete")||(f(),n.onload=n.onreadystatechange=null);
              },
              i=d.getElementsByTagName(t)[0],
              i.parentNode.insertBefore(n,i);
            })(window,document,"script","//bat.bing.com/bat.js","uetq");
          `,
        }}
      />

      <Script
        id="consent-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.uetq = window.uetq || [];
            window.uetq.push("consent", "default", {
              ad_storage: "denied",
            });
            window.uetq = window.uetq || [];
            window.uetq.push("consent", "update", {
              ad_storage: "granted",
            });
          `,
        }}
      /> */}

      <div className="min-h-screen bg-gray-50 flex items-start justify-center p-5 md:p-10">
        <div className="w-full max-w-[500px] bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-[#e3f6fc] p-4 md:p-8 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-[#00afe3] rounded-full flex items-center justify-center">
              <CheckIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>

            <H4 className="text-[#253238] mt-4 md:mt-6">
              Thank You! Your number has been verified.
            </H4>
          </div>

          <div className="p-4 md:p-8">
            <div className="flex justify-center mb-8">
              <button
                onClick={handleSubmit}
                className="cursor-pointer rounded-full bg-[#00afe3]  text-white px-8 py-3 flex items-center gap-2.5 font-medium text-sm md:text-base transition-colors duration-200"
              >
                {/* Checkbox icon image */}
                <div className="w-4 h-4 bg-[#00afe3]  flex items-center justify-center ">
                  <CheckIcon
                    color="white"
                    className="w-4 h-4 border border-white  text-white"
                  />
                </div>
                <span className="font-[Arial]">View your matches now.</span>
              </button>
            </div>

            <div className="mt-6">
              <p className="font-[Arial] text-[10px] md:text-[11px] text-gray-500 leading-relaxed text-left">
                Localists may share your information with up to five relevant
                service providers, who may contact you by phone, text or email
                to discuss your request. By submitting this form, you agree that
                professionals can contact you via phone, text or email to offer
                their services. Your consent to be contacted is not a condition
                for purchasing or receiving any services. All data will be
                handled in accordance with our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankuPage;
