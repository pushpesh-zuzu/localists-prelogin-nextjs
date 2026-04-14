import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import LandscapersInStockport from '@/app/component/LocationPages/Stockport/LandscapersInStockport/LandscapersInStockport';
import React, { Suspense } from 'react'
export const metadata = {
    title: "25 Trusted Local Landscapers Stockport| Localists.com",
    description:
        "Need professional landscapers for a garden project in Stockport? Get 5 free quotes directly to your inbox from qualified landscapers only on Localists.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/landscape-gardeners-near-me/stockport"
                bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Landscaping", path: "en/gb/landscape-gardeners-near-me" },
                    { title: "Stockport", path: "en/gb/landscape-gardeners-near-me/stockport" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}>
                <LandscapersInStockport />
            </Suspense></>
    )
}

export default page