import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInCongleton from '@/app/component/LocationPages/Congleton/RoofersInCongleton';
import React, { Suspense } from 'react'
export const metadata = {
    title: " Find Skilled Roofers in Congleton | Localists",
    description:
        "Discover competent roofers in Congleton. Give us details of your roof and get 5 free no-obligation quotes from the best roofers in Congleton.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/congleton"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Congleton", path: "en/gb/roofers-near-me/congleton" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInCongleton />
            </Suspense></>
    )
}

export default page