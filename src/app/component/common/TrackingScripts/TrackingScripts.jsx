// components/TrackingScripts.js
import Script from 'next/script'

const TrackingScripts = () => {
  return (
    <>
      {/* Step 1: Bing UET Tracking */}
      <Script
        id="bing-uet"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,t,r,u){
              var f,n,i;
              w[u]=w[u]||[],
              f=function(){
                var o={ti:"97207664",enableAutoSpaTracking:true};
                o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad");
              },
              n=d.createElement(t),n.src=r,n.async=1,
              n.onload=n.onreadystatechange=function(){
                var s=this.readyState;
                s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.readystatechange=null);
              },
              i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i);
            })(window,document,"script","//bat.bing.com/bat.js","uetq");
          `,
        }}
      />
      
      {/* Step 2: Bing Consent */}
      <Script
        id="bing-consent"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.uetq = window.uetq || [];
            window.uetq.push("consent", "default", {
              ad_storage: "denied",
            });
            window.uetq = window.uetq || [];
            window.uetq.push("consent", "update", {
              ad_storage: "granted",
            });
          `,
        }}
      />
      
      {/* Step 3: Google Delayed Loader */}
      <Script
        id="google-delayed-loader"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            function loadTrackingScripts() {
              // AW-17528251553
              const adScript = document.createElement("script");
              adScript.async = true;
              adScript.src = "https://www.googletagmanager.com/gtag/js?id=AW-17528251553";
              document.head.appendChild(adScript);
              
              const adConfig = document.createElement("script");
              adConfig.innerHTML = 'window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "AW-17528251553");';
              document.head.appendChild(adConfig);
              
              // G-QJ5NH8NF5Q
              const gaScript = document.createElement("script");
              gaScript.async = true;
              gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-QJ5NH8NF5Q";
              document.head.appendChild(gaScript);
              
              const gaConfig = document.createElement("script");
              gaConfig.innerHTML = 'window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "G-QJ5NH8NF5Q");';
              document.head.appendChild(gaConfig);
            }
            
            // Load after 500ms on window load
            window.addEventListener("load", () => {
              setTimeout(loadTrackingScripts, 500);
            });
          `,
        }}
      />
      
      {/* Step 4: Facebook SDK */}
      <Script
        id="facebook-sdk"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.fbAsyncInit = function () {
              FB.init({
                appId: "2143258269781131",
                cookie: true,
                xfbml: true,
                version: "v19.0",
              });
              window.isFacebookSdkReady = true;
            };
            
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.async = true;
              js.src = "https://connect.facebook.net/en_US/sdk.js";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `,
        }}
      />
      
      {/* Step 5: Image Enhancement Script */}
      <Script
        id="image-enhancer"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function enhanceImage(img) {
                if (!img) return;
                try { img.decoding = "async"; } catch (e) {}
                var rect = img.getBoundingClientRect ? img.getBoundingClientRect() : null;
                var inView = rect &&
                  rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                  rect.bottom > 0 &&
                  rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
                  rect.right > 0;
                
                if (!inView && !img.hasAttribute("loading")) {
                  try { img.loading = "lazy"; } catch (e) {}
                }
                
                if (inView && !img.hasAttribute("fetchpriority")) {
                  var w = rect && rect.width ? rect.width : img.width || 0;
                  var h = rect && rect.height ? rect.height : img.height || 0;
                  if (w * h > 40000) {
                    try { img.fetchPriority = "high"; } catch (e) {}
                  }
                }
              }
              
              function run() {
                var imgs = document.getElementsByTagName("img");
                for (var i = 0; i < imgs.length; i++) enhanceImage(imgs[i]);
                
                var mo = new MutationObserver(function(mutations) {
                  mutations.forEach(function(m) {
                    m.addedNodes.forEach(function(n) {
                      if (n && n.tagName === "IMG") {
                        enhanceImage(n);
                      } else if (n && n.querySelectorAll) {
                        n.querySelectorAll("img").forEach(enhanceImage);
                      }
                    });
                  });
                });
                mo.observe(document.documentElement, { childList: true, subtree: true });
              }
              
              if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", run, { once: true });
              } else {
                run();
              }
            })();
          `,
        }}
      />
      
      {/* Step 6: Hotjar */}
      <Script
        id="hotjar"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:6526155,hjsv:6};
              a=o.getElementsByTagName("head")[0];
              r=o.createElement("script");r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,"https://static.hotjar.com/c/hotjar-",".js?sv=");
          `,
        }}
      />
      
      {/* Step 7: Google Tag Manager */}
      <Script
        id="gtm"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TKD2TB3J');
          `,
        }}
      />
      
      {/* Step 8: Facebook Pixel */}
      <Script
        id="facebook-pixel"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;n=f.fbq=function(){
                n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)
              };
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s);
            }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','2857559571119727');
            fbq('track','PageView');
          `,
        }}
      />
    </>
  )
}

export default TrackingScripts