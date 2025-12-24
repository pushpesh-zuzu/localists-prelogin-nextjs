import Footer from "@/app/component/Footer/Footer";
import ServiceCreateAccount from "@/app/component/SellerRegistrationForm/ServiceCreateAccount";
import { notFound } from "next/navigation";

const ALLOWED_SERVICES = [
  "artificial-grass-installation",
  "driveway-installation",
  "fence-gate-installation",
  "landscaping",
  "patio-laying",
  "roofing",
  "tree-surgery",
];

export default async function Page({ params }) {
  const { serviceTitle } = await params;

  if (!ALLOWED_SERVICES.includes(serviceTitle)) {
    notFound();
  }

  return (
    <>
      <ServiceCreateAccount serviceTitle={serviceTitle} />
      <Footer />
    </>
  );
}
