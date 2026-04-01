import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInLeeds from '@/app/component/LocationPages/Leads/RoofersInLeeds/RoofersInLeeds';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Roofers Leeds | Localists.com",
    description:
        "Need trusted roofers in Leeds? Get free, no-obligation quotes from vetted local experts for repairs, replacements, and installations.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/leeds"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Leeds", path: "en/gb/roofers-near-me/leeds" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}>
                <RoofersInLeeds />
            </Suspense></>
    )
}

export default page