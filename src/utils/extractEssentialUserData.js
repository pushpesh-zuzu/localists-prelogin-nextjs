export const extractEssentialUserData = (userData) => {
  if (!userData) return null;

  const essentialFields = {
    id: userData?.id || null,
    name: userData?.name || null,
    email: userData?.email || null,
    phone: userData?.phone || null,
    // address:userData?.address || null,
    // apartment:userData?.apartment || null,
    // city:userData?.city || null,
    // postcode:userData?.postcode || null,
    // country:userData?.country || null,
    // billing_vat_register:userData?.billing_vat_register || null,
    user_type: userData?.user_type || null,
    active_status: userData?.active_status || null,
    remember_tokens: userData?.remember_tokens || null,
    // city: userData?.city || null,
    // zipcode: userData?.zipcode || null,
    // profile_image: userData?.profile_image || null ,
    // phone_verified: userData?.phone_verified || null,
    status: userData?.status || null,
    // user_details: userData?.user_details
    //   ? {
    //       id: userData?.user_details.id,
    //       user_id: userData?.user_details.user_id,
    //     }
    //   : null,
  };

  return essentialFields;
};
