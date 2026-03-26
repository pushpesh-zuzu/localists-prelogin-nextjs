import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInFormby from '@/app/component/LocationPages/Formby/RoofersInFormby';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Trusted Roofers Formby | Localists.com",
    description:
        "Need reliable roofers Formby homeowners recommend? Enter your postcode and receive free quotes from local roofing professionals working in your area.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/formby"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Formby", path: "en/gb/roofers-near-me/formby" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInFormby />
            </Suspense></>
    )
}

export default page