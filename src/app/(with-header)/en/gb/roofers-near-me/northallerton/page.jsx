import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInNorthallerton from '@/app/component/LocationPages/Northallerton/RoofersInNorthallerton/RoofersInNorthallerton';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Discover Roofers Northallerton | Localists",
    description:
        "Looking to hire reliable roofers that Northallerton homeowners would recommend? Get 5 free quotes from local experts in the area today.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/northallerton"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Northallerton", path: "en/gb/roofers-near-me/northallerton" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >
                <RoofersInNorthallerton />
            </Suspense></>
    )
}

export default page