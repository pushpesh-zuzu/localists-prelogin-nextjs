import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInBlackpool from '@/app/component/LocationPages/Blackpool/RoofersInBlackpool';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Reliable Roofers Blackpool | Localists",
    description:
        "Need roofers Blackpool homeowners recommend? Enter your postcode and receive free quotes from local roofing professionals working near you.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/blackpool"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Blackpool", path: "en/gb/roofers-near-me/blackpool" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInBlackpool />
            </Suspense></>
    )
}

export default page