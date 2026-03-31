import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInMacclesfield from '@/app/component/LocationPages/Macclesfield/RoofersInMacclesfield/RoofersInMacclesfield';
import React, { Suspense } from 'react'
export const metadata = {
    title: `Vetted Roofers Macclesfield | Free Quotes | Localists.com`,
    description:
        "Need a roofer in Macclesfield? Get free, no-obligation quotes from vetted local specialists for repairs, replacements, and installations.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/macclesfield"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "macclesfield", path: "en/gb/roofers-near-me/macclesfield" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInMacclesfield />
            </Suspense></>
    )
}

export default page