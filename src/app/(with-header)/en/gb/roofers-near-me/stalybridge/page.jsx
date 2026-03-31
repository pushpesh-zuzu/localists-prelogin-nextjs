import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInStalybridge from '@/app/component/LocationPages/Stalybridge/RoofersInStalybridge/RoofersInStalybridge';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Vetted Roofers in Stalybridge | Localists.com",
    description:
        "Need skilled and qualified roofers in Stalybridge? Get free quotes from already vetted local roofers near you. Only on localists today.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/stalybridge"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Stalybridge", path: "en/gb/roofers-near-me/stalybridge" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInStalybridge />
            </Suspense></>
    )
}

export default page