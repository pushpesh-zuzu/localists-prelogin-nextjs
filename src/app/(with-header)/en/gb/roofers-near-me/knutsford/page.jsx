import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInKnutsford from '@/app/component/LocationPages/Knutsford/RoofersInKnutsford';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Discover Vetted Roofers in Knutsford | Localists.com",
    description:
        "Discover skilled roofers in Knutsford. Give us details of your roof, and you will receive up to 5 free quotes from local roofers near you.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/knutsford"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Knutsford", path: "en/gb/roofers-near-me/knutsford" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInKnutsford />
            </Suspense></>
    )
}

export default page