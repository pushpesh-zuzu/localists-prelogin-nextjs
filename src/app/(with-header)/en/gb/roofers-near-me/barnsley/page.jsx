import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInBarnsley from '@/app/component/LocationPages/Barnsley/RoofersInBarnsley/RoofersInBarnsley';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Roofers Barnsley |Free Quotes in Minutes |Localists.com",
    description:
        "Looking for reliable roofers in Barnsley? Compare free quotes now from trusted local roofing experts for repairs, replacements, and emergency callouts.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/barnsley"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Barnsley", path: "en/gb/roofers-near-me/barnsley" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInBarnsley />
            </Suspense></>
    )
}

export default page