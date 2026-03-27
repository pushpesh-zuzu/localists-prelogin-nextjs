import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInNorthShields from '@/app/component/LocationPages/NorthShields/RoofersInNorthShields';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Trusted Roofers North Shields | Localists.com",
    description:
        "Got a roofing emergency or roof project? Find expert roofers near you in North Shield. Click now to get free quotes from trusted specialists within minutes.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/north-shields"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "North Shields", path: "en/gb/roofers-near-me/north-shields" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >
                <RoofersInNorthShields />
            </Suspense></>
    )
}

export default page