import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInWorkington from '@/app/component/LocationPages/Workington/RoofersInWorkington/RoofersInWorkington';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Discover Roofers Workington | Localists",
    description:
        "Looking to discover Roofers in Workington that residents recommend? Share a few details about your roof and get experienced local professionals.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/workington"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Workington", path: "en/gb/roofers-near-me/workington" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >
                <RoofersInWorkington />
            </Suspense></>
    )
}

export default page