export function GoogleAnalytics(){
  const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID
  const apiLink = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  return (
    <> 
    <script async src={apiLink}></script>
    <script>
      {/* window.dataLayer = window.dataLayer || []; */}
      function gtag(){window.dataLayer.push(arguments)}
      gtag('js', new Date()); 
      gtag('config', {GA_MEASUREMENT_ID});
    </script>
    </> 
  )
}

// export function FacebookPixel(){
//   const FACEBOOK_PIXEL_ID = process.env.FACEBOOK_PIXEL_ID
//   const apiLink = `https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`
//   return (
//     <>
//       <script>
//         !function(f, b, e, v, n, t, s) {
//           if (f.fbq) return;
//           n = f.fbq = function() {
//               n.callMethod ?
//                   n.callMethod.apply(n, arguments) : n.queue.push(arguments)
//           };
//           if (!f._fbq) f._fbq = n;
//           n.push = n;
//           n.loaded = !0;
//           n.version = '2.0';
//           n.queue = [];
//           t = b.createElement(e);
//           t.async = !0;
//           t.src = v;
//           s = b.getElementsByTagName(e)[0];
//           s.parentNode.insertBefore(t, s)
//         }(window, document, 'script','https://connect.facebook.net/en_US/fbevents.js');
//         fbq('init', '{FACEBOOK_PIXEL_ID}');
//         fbq('track', 'PageView'); 
//       </script>
//       <noscript>
//         <img height="1" width="1" style={{display:'none'}} src={apiLink} />
//       </noscript>
//     </>
//   )
// }

export default {
  GoogleAnalytics,
  // FacebookPixel
}