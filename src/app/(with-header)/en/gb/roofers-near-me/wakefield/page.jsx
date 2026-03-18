import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInWakefield from '@/app/component/LocationPages/Wakefield/RoofersInWakefield';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Trusted Roofers Wakefield | Localists.com",
    description:
        "Looking to hire trusted local Roofers in Wakefield? Enter your postcode and receive free, no-obligation quotes from vetted experts today.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/wakefield"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Wakefield", path: "en/gb/roofers-near-me/wakefield" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInWakefield />
            </Suspense></>
    )
}

export default page