import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInHolywell from '@/app/component/LocationPages/Holywell/RoofersInHolywell';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Reliable Roofers in Holywell | Localists.com",
    description:
        "Looking for trusted roofers in Holywell? Compare free quotes from vetted local roofing professionals. Share your postcode and get started today.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/holywell"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Holywell", path: "en/gb/roofers-near-me/holywell" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInHolywell />
            </Suspense></>
    )
}

export default page