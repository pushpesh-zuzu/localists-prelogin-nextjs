import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInHalifax from '@/app/component/LocationPages/Halifax/RoofersInHalifax';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Trusted Roofers Halifax | Localists",
    description:
        "Looking for dependable Roofers Halifax homeowners recommend? Share the details of your job and hear back from experienced local professionals.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/halifax"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Halifax", path: "en/gb/roofers-near-me/halifax" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInHalifax />
            </Suspense></>
    )
}

export default page