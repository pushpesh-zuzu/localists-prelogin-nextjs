import React, { Suspense } from 'react'
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from '@/app/component/common/seo/SEO';
import LocalistsRoofCalendar from '@/app/component/NewPPCLocalists/LocalistsRoof/LocalistsRoofCalendar';


function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/localists-roofing"
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
                <LocalistsRoofCalendar />
            </Suspense>
        </>
    )
}

export default page