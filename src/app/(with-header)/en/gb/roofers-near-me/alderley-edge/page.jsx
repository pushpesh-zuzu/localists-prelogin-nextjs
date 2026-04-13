import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInAlderleyEdge from '@/app/component/LocationPages/AlderleyEdge/RoofersInAlderleyEdge/RoofersInAlderleyEdge';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Expert Roofers in Alderley Edge | Localists.com",
    description:
        "Looking to hire a reliable roofer in Alderley Edge? Get 5 free no-obligation quotes from local professional roofers near you.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/alderley-edge"
                bannerImage="/nearme/Roofing/wrexhamBanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Alderley Edge", path: "en/gb/roofers-near-me/alderley-edge" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>} >
                <RoofersInAlderleyEdge />
            </Suspense></>
    )
}

export default page