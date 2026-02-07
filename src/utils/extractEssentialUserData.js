export const extractEssentialUserData = (userData) => {
  if (!userData) return null;

  const essentialFields = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    user_type: userData.user_type,
    active_status: userData.active_status,
    remember_tokens: userData.remember_tokens,
    city: userData.city,
    zipcode: userData.zipcode,
    profile_image: userData.profile_image,
    phone_verified: userData.phone_verified,
    status: userData.status,
    user_details: userData.user_details
      ? {
          id: userData.user_details.id,
          user_id: userData.user_details.user_id,
        }
      : null,
  };

  return essentialFields;
};
