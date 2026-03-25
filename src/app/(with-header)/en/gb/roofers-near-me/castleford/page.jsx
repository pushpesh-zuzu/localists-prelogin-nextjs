import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInCastleford from '@/app/component/LocationPages/Castleford/RoofersInCastleford';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Vetted Qualified Roofers in Castleford | Localists.com",
    description:
        "Searching for a professional roofer in Castleford? Tell us what you need and get up to 5 free quotes from roofers near you. Only on localists",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/castleford"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Castleford", path: "en/gb/roofers-near-me/castleford" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInCastleford />
            </Suspense></>
    )
}

export default page