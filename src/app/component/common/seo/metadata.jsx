const baseUrl = "https://www.localists.com";

export function getMetadata({
  title,
  description,
  path,
  image = "/images/Banners/Home.jpg",
}) {
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        "en-gb": `${baseUrl}${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      type: "website",
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}
