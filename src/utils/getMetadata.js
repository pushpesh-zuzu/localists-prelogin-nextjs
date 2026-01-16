// import "server-only";

// export function getMetadata({
//   baseUrl,      // 👈 passed in
//   title,
//   description,
//   path,
//   imagePath,
// }) {
//   if (!baseUrl) {
//     throw new Error("getMetadata: baseUrl is required");
//   }

//   if (!imagePath) {
//     throw new Error("getMetadata: imagePath is required");
//   }

//   const pageUrl = `${baseUrl}${path}`;

//   const imageUrl = imagePath.startsWith("http")
//     ? imagePath
//     : `${baseUrl}${imagePath}`;

//   return {
//     title,
//     description,

//     metadataBase: new URL(baseUrl),

//     alternates: {
//       canonical: pageUrl,
//       languages: {
//         "en-GB": pageUrl,
//       },
//     },

//     openGraph: {
//       title,
//       description,
//       url: pageUrl,
//       type: "website",
//       siteName: "Localists",
//       images: [
//         {
//           url: imageUrl,
//           width: 1200,
//           height: 630,
//           alt: title,
//         },
//       ],
//     },

//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [imageUrl],
//     },
//   };
// }
