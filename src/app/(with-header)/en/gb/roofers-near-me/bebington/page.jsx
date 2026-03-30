import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInBebington from '@/app/component/LocationPages/Bebington/RoofersInBebington/RoofersInBebington';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Trusted Roofers in Bebington | Localists.com",
    description:
        "Looking for reliable Bebington roofers near you? Compare up to 5 free quotes from vetted local professionals today.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/bebington"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Bebington", path: "en/gb/roofers-near-me/bebington" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInBebington />
            </Suspense></>
    )
}

export default page