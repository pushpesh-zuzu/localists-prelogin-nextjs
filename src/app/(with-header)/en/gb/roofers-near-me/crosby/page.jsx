import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInCrosby from '@/app/component/LocationPages/Crosby/RoofersInCrosby/RoofersInCrosby';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Local Roofers in Crosby | Localists.com",
    description:
        "Looking for highly skilled roofers in Crosby? Click now. Receive and compare up to 5 free quotes from trusted roofing professionals near you.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/crosby"
                bannerImage="/nearme/Roofing/wrexhamBanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Crosby", path: "en/gb/roofers-near-me/crosby" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>} >
                <RoofersInCrosby />
            </Suspense></>
    )
}

export default page