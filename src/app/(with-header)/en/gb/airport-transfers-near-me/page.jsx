import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import AirportServices from "@/app/component/Nearme/TransportServices/AirportServices";
export const metadata = {
  title: "Free Quotes on Holiday Transfers and Airport Transfers Near You",
  description:
    "Need airport taxi or airport transfer service? Get instant quotes from trusted transport providers to all major UK airports. Start search at Localists.",
};
export default function Page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/airport-transfers-near-me"
        bannerImage="/nearme/AirportTransport/airportTransportBanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Transportation Services", path: "en/gb/transportation-services" },
          { title: "Airport Transfers", path: "en/gb/airport-transfers-near-me" },
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
        <AirportServices />
      </Suspense>
    </>
  );
}
