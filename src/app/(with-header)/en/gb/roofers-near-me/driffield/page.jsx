import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInDriffield from '@/app/component/LocationPages/Driffield/RoofersInDriffield/RoofersInDriffield';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Reliable Roofers Driffield | Localists.com",
    description:
        "Need roofing repairs, replacement or a new installation? Find high-quality, vetted roofers in Driffield. Get up to 5 free quotes to your inbox in minutes.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/driffield"
                bannerImage="/nearme/Roofing/wrexhamBanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Driffield", path: "en/gb/roofers-near-me/driffield" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>} >
                <RoofersInDriffield />
            </Suspense></>
    )
}

export default page