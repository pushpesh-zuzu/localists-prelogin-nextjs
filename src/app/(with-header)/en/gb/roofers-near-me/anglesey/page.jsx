import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInAnglesey from '@/app/component/LocationPages/Anglesey/RoofersInAnglesey/RoofersInAnglesey';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Vetted Roofers in Anglesey | Localists.com",
    description:
        "Looking for trusted roofers in Anglesey? Compare free quotes from vetted local roofing professionals. Enter your postcode and get started today.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/anglesey"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Anglesey", path: "en/gb/roofers-near-me/anglesey" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInAnglesey />
            </Suspense></>
    )
}

export default page