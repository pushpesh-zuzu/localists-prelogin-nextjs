import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInConwy from '@/app/component/LocationPages/Conwy/RoofersInConwy/RoofersInConwy';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Find Skilled Roofers in Conwy | Localists.com",
    description:
        "Need a qualified Conwy roofer trusted by homeowners? Compare up to 5 free quotes from qualified, local roofing professionals near you.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/conwy"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Conwy", path: "en/gb/roofers-near-me/conwy" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >

                <RoofersInConwy />
            </Suspense></>
    )
}

export default page