import React, { Suspense } from 'react'
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from '@/app/component/common/seo/SEO';
import LocalistsTreeSurgery from '@/app/component/NewPPCLocalists/LocalistsTreeSurgery/LocalistsTreeSurgery';


function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/localists-tree-surgery"
                bannerImage="/newppc/roofbanner.webp"
                conversion={false}
            />
            <Suspense
                fallback={
                    <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoadingIndicator size="large" />
                    </div>
                }
            >
                <LocalistsTreeSurgery />
            </Suspense>
        </>
    )
}

export default page