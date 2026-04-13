import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInAshington from '@/app/component/LocationPages/Ashington/RoofersInAshington/RoofersInAshington';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Roofers Ashington | Free Quotes in Minutes| Localists.com",
    description:
        "Looking for trusted roofers in Ashington? Get 5 free, no-obligation quotes from vetted local experts near you. For repairs, replacements, and installations",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/ashington"
                bannerImage="/nearme/Roofing/wrexhamBanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Ashington", path: "en/gb/roofers-near-me/ashington" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>} >
                <RoofersInAshington />
            </Suspense></>
    )
}

export default page