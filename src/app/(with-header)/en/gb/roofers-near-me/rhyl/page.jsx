import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInRhyl from '@/app/component/LocationPages/Rhyl/RoofersInRhyl/RoofersInRhyl';

import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Trusted Roofers Rhyl | Localists.com",
    description:
        "Looking to find the top roofers in Rhyl? Review free quotes from top roof experts in Rhyl today. Fully vetted and insured professionals near you.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/rhyl"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Rhyl", path: "en/gb/roofers-near-me/rhyl" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInRhyl />
            </Suspense></>
    )
}

export default page