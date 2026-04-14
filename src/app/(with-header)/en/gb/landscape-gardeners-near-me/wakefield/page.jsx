import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import LandscapersInWakefield from '@/app/component/LocationPages/Wakefield/LandscapersInWakefield/LandscapersInWakefield';
import React, { Suspense } from 'react'
export const metadata = {
    title: "17 Local Skilled Landscapers Wakefield | Localists",
    description:
        "Looking for trusted landscapers in Wakefield? Get up to 5 free no-obligation quotes from qualified, vetted landscapers now. Only on Localists.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/landscape-gardeners-near-me/wakefield"
                bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Landscaping", path: "en/gb/landscape-gardeners-near-me" },
                    { title: "Wakefield", path: "en/gb/landscape-gardeners-near-me/wakefield" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}>
                <LandscapersInWakefield />
            </Suspense></>
    )
}

export default page