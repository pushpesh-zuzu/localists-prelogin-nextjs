let gtm = null;

export const getGTM = async () => {
  if (typeof window === "undefined") return null;

  if (!gtm) {
    gtm = await import("react-gtm-module");

    gtm.initialize({
      gtmId: process.env.NEXT_PUBLIC_GTM_ID,
    });
  }

  return gtm;
};
