// components/NoscriptTags.js

const NoscriptTags = () => {
  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-TKD2TB3J"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=2857559571119727&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  )
}
export default NoscriptTags