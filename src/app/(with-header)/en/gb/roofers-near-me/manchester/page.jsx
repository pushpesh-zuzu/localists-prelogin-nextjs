import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInManchester from '@/app/component/LocationPages/Manchester/RoofersInManchester';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Roofers Manchester | Localists",
    description:
        "Looking for trusted roofers in Manchester? Get 5 free no-obligation quotes from trusted local experts on localists today.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/manchester"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Manchester", path: "en/gb/roofers-near-me/manchester" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInManchester />
            </Suspense></>
    )
}

export default page