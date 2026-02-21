import React, { Suspense } from 'react'
import LocalistsRoof from '@/app/component/NewPPCLocalists/LocalistsRoof/LocalistsRoof'
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";


function page() {
    return (
        <>
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