"use client"

import dynamic from 'next/dynamic'
import React from 'react'


const CookieConsent = dynamic(
    () => import("./CookieConsent"),
    {
        ssr: false
    }
);

function CookiesWrapper() {
    return (
        <CookieConsent />
    )
}

export default CookiesWrapper