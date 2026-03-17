import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInNantwich from '@/app/component/LocationPages/Nantwich/RoofersInNantwich';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Reliable Roofers in Nantwich | Localists.com",
    description:
        " Need roofing repairs or replacement in Nantwich? Find top roofing professionals in your area. Get 5 free to your inbox in minutes",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/nantwich"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Nantwich", path: "en/gb/roofers-near-me/nantwich" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInNantwich />
            </Suspense></>
    )
}

export default page