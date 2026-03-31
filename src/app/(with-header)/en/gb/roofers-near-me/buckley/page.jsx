import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInBuckley from '@/app/component/LocationPages/Buckley/RoofersInBuckley/RoofersInBuckley';
import React, { Suspense } from 'react'
export const metadata = {
    title: "16 Trusted Roofers in Buckley | Quotes in 30 secs | Localists",
    description:
        "Get matched with professional and trusted roofers in Buckley, answer a few questions and get matched with the best local roofing contractors. Start now!",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/buckley"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Buckley", path: "en/gb/roofers-near-me/buckley" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >
                <RoofersInBuckley />
            </Suspense></>
    )
}

export default page