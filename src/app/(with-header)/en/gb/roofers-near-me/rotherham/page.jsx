import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInRotherham from '@/app/component/LocationPages/Rotherham/RoofersInRotherham/RoofersInRotherham';
import React, { Suspense } from 'react'
export const metadata = {
    title: "Get Trusted Roofers Rotherham | Localists.com",
    description:
        "Do you need reliable Roofers in Rotherham? Get 5 free quotes from trusted local roofers in Rotherham. No obligation, No stress",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/roofers-near-me/rotherham"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Roofing", path: "en/gb/roofers-near-me" },
                    { title: "Rotherham", path: "en/gb/roofers-near-me/rotherham" },
                ]}
                conversion={true} /><Suspense
                    fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoaderIndicator size="large" />
                    </div>}
                >
                <RoofersInRotherham />
            </Suspense></>
    )
}

export default page