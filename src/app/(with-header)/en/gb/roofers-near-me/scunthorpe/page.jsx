import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInScunthorpe from '@/app/component/LocationPages/Scunthorpe/RoofersInScunthorpe/RoofersInScunthorpe';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Discover Roofers Scunthorpe | Localists",
    description:
        "Looking to find reliable roofers in Scunthorpe? Share details about your roof project and get 5 free, tailored quotes from roofing experts in your area now.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/scunthorpe"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Scunthorpe", path: "en/gb/roofers-near-me/scunthorpe" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInScunthorpe />
            </Suspense></>
    )
}

export default page