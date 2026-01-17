// app/[locale]/[country]/sellers/create-account/[serviceTitle]/page.js
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

export async function generateMetadata({ params }) {
  const { serviceTitle } = await params;
  
  const formattedTitle = serviceTitle
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} - Localists.com`,
    description: `Find trusted ${formattedTitle} near you. Tell us where you want to find new customers, share your coverage areas, and get matched with quality local leads today.`,
  };
}

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