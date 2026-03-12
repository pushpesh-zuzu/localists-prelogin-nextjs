import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInStockport from '@/app/component/LocationPages/Stockport/RoofersInStockport';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Roofers Stockport | (18) roofers at  Localists.com",
    description:
        "Looking for trusted roofers in Stockport? Get 5 free no-obligation quotes from trusted local experts on localists today.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/stockport"
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
                    </div>}
                >

                <RoofersInStockport />
            </Suspense></>
    )
}

export default page