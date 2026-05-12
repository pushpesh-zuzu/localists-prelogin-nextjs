// app/tree-surgeons-near-me/page.tsx

import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import AccountantsNearMe from "@/app/component/Nearme/AccountantsNearMe/AccountantsNearMe";

export const metadata = {
  title: "Find Accountants Near Me | Local Accounting Services | Localists",
  description:
    "Looking for expert accountants near you? Find qualified local accountants for tax returns, payroll, bookkeeping, business accounts, and more with Localists. Get free quotes in minutes.",
};
export default function Page() {
  return (
    <>
      {/* <StructuredData /> */}
      <SEO
        canonicalPath="/en/gb/accountants-near-me"
        bannerImage="/nearme/Accountants/AccountantHero.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Business",  },
          { title: "Accountants", path: "en/gb/accountants-near-me" },
        ]}
        conversion={true}
      />
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
            <LoadingIndicator size="large" />
          </div>
        }
      >
        <AccountantsNearMe />
      </Suspense>
    </>
  );
}
