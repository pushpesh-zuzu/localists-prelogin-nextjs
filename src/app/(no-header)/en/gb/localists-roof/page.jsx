import React, { Suspense } from 'react'
import LocalistsRoof from '@/app/component/NewPPCLocalists/LocalistsRoof/LocalistsRoof'
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from '@/app/component/common/seo/SEO';


function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/localists-roof"
                bannerImage="/newppc/roofbanner.webp"
                conversion={true}
            />
            <Suspense
                fallback={
                    <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoadingIndicator size="large" />
                    </div>
                }
            >
                <LocalistsRoof />
            </Suspense>
        </>
    )
}

export default page