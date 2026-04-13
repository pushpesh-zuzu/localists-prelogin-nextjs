import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInMiddlesbrough from '@/app/component/LocationPages/Middlesbrough/RoofersInMiddlesbrough/RoofersInMiddlesbrough';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Roofers Middlesbrough | Get Free Quotes Now| Localists.com",
    description:
        "Need a roofer in Middlesbrough? Click now. Get free, no-obligation quotes from local roofers in your area. Roof leaks, repairs, maintenance, & new installs",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/middlesbrough"
                bannerImage="/nearme/Roofing/wrexhamBanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Middlesbrough", path: "en/gb/roofers-near-me/middlesbrough" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>} >
                <RoofersInMiddlesbrough />
            </Suspense></>
    )
}

export default page