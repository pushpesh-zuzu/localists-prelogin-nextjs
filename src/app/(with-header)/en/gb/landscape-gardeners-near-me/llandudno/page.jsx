import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import LandscapersInLlandudno from '@/app/component/LocationPages/Llandudno/LandscapersInLlandudno/LandscapersInLlandudno';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Local Landscapers Llandudno | Localists",
    description:
        "Need trusted local landscapers in Llandudno? Click now to get matched with highly skilled and qualified landscapers near you. Only on Localists.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/landscape-gardeners-near-me/llandudno"
                bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Landscaping", path: "en/gb/landscape-gardeners-near-me" },
                    { title: "Llandudno", path: "en/gb/landscape-gardeners-near-me/llandudno" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}>
                <LandscapersInLlandudno />
            </Suspense></>
    )
}

export default page