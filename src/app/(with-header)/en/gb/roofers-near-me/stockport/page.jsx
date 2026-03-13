import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInStockport from '@/app/component/LocationPages/Stockport/RoofersInStockport';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Roofers Stockport | Free Quotes in Minutes| Localists.com.",
    description:
        "Need trusted roofers in Stockport? Get up to five free, no-obligation quotes from vetted local professionals for repairs, replacements, and installations.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/chester"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Stockport", path: "en/gb/roofers-near-me/stockport" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}>
                <RoofersInStockport />
            </Suspense></>
    )
}

export default page