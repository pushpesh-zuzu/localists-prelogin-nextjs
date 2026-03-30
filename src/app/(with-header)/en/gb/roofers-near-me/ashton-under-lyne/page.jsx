import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInAshtonUnderLyne from '@/app/component/LocationPages/Ashton-under-Lyne/RoofersInAshtonUnderLyne/RoofersInAshtonUnderLyne';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Local Roofers in Ashton-under-Lyne | Localists.com",
    description:
        "Need a roofer in Ashton-under-Lyne? Compare up to 5 free quotes from vetted local professionals across Ashton and the surrounding areas.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/ashton-under-lyne"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Ashton-under-Lyne", path: "en/gb/roofers-near-me/ashton-under-lyne" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInAshtonUnderLyne />
            </Suspense></>
    )
}

export default page