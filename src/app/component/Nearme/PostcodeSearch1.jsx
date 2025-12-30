// 'use client'
// import React, { useState, useEffect } from 'react';
// import { CheckCircle, Loader2 } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCityName, setcitySerach } from '@/lib/store/buyerslice/buyerSlice';
// // import { getCityName, setcitySerach } from '@/lib/store/buyerslice/buyerSlice';

// const PostcodeSearch = ({
  // placeholder = "Enter Postcode",
  // buttonText = "Go",
  // debounceMs = 500,
  // className = "",
  // disabled = false,
  // onValidationSuccess, // Callback when validation succeeds: (data) => setShowState(true)
  // onValidationError, // Callback when validation fails: () => setShowState(false)
  // onSubmit, // Callback when Go button is clicked with valid data
// }) => {
//   const [postcode, setPostcode] = useState("");
//   const [isValidating, setIsValidating] = useState(false);
//   const [isValid, setIsValid] = useState(false);
//   const [city, setCity] = useState("");
//   const [error, setError] = useState("");

//   const dispatch = useDispatch();

//   // Debounced API validation
//   useEffect(() => {
//     if (!postcode.trim() || postcode.length < 3) {
//       setIsValid(false);
//       setCity("");
//       setError("");
//       if (onValidationError) onValidationError();
//       return;
//     }

//     const timer = setTimeout(async () => {
//       setIsValidating(true);
//       try {
//         const response = await dispatch(getCityName({ postcode: postcode }));
//         const newResponse = response?.payload || response;

//         if (newResponse?.data?.city) {
//           setIsValid(true);
//           setCity(newResponse.data.city);
//           dispatch(setcitySerach(newResponse.data.city));
//           setError("");
          
//           // Notify parent component - validation success
//           if (onValidationSuccess) {
//             onValidationSuccess({
//               postcode: postcode,
//               city: newResponse.data.city,
//               isValid: true
//             });
//           }
//         } else {
//           setIsValid(false);
//           setCity("");
//           setError("Please enter a valid postcode!");
          
//           // Notify parent component - validation failed
//           if (onValidationError) {
//             onValidationError();
//           }
//         }
//       } catch (err) {
//         setIsValid(false);
//         setCity("");
//         setError("Please enter a valid postcode!");
        
//         // Notify parent component - validation error
//         if (onValidationError) {
//           onValidationError();
//         }
//       } finally {
//         setIsValidating(false);
//       }
//     }, debounceMs);

//     return () => clearTimeout(timer);
//   }, [postcode, dispatch, debounceMs, onValidationSuccess, onValidationError]);

//   const handleChange = (e) => {
//     const value = e.target.value.trim().toUpperCase().slice(0, 10);
//     setPostcode(value);
//     setError("");
//   };

//   const handleSubmit = () => {
//     if (!postcode.trim()) {
//       setError("Please enter a postcode");
//       return;
//     }

//     if (!isValid) {
//       setError("Please wait for validation");
//       return;
//     }

//     // Call submit callback with postcode and city data
//     if (onSubmit) {
//       onSubmit({ 
//         postcode, 
//         city, 
//         isValid 
//       });
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSubmit();
//     }
//   };

//   return (
//     <div className={`w-full ${className}`}>
//       <div>
//         <div 
//           className="relative max-w-[254px] md:max-w-[246px] lg:max-w-[404px] mx-auto"
//           style={{
//             boxShadow: '0px 23.2px 38.66px 0px #005974E5'
//           }}
//         >
//           <div className="flex items-center bg-white rounded-full overflow-hidden">
//             {/* Input Field */}
//             <div className="flex-1 relative">
//               <input
//                 type="text"
//                 value={postcode}
//                 onChange={handleChange}
//                 onKeyPress={handleKeyPress}
//                 placeholder={placeholder}
//                 disabled={disabled}
//                 className="w-full px-6 py-3 md:py-4 text-gray-700 placeholder-gray-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//               />
              
//               {/* Validation Icons */}
//               {postcode && (
//                 <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                   {isValidating ? (
//                     <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
//                   ) : isValid ? (
//                     <CheckCircle className="w-5 h-5 text-green-500" />
//                   ) : null}
//                 </div>
//               )}
//             </div>

//             {/* Go Button */}
//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={disabled || !isValid || isValidating}
//               className="px-8 py-3 md:py-4 text-white font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
//               style={{ backgroundColor: '#7DD5F1' }}
//             >
//               {buttonText}
//             </button>
//           </div>
//         </div>

//         {/* City Display */}
//         {city && isValid && (
//           <p className="text-green-600 text-sm mt-2 text-center max-w-[254px] md:max-w-[246px] lg:max-w-[404px] mx-auto">
//             ✓ {city}
//           </p>
//         )}

//         {/* Error Message */}
//         {error && (
//           <p className="text-red-500 text-sm mt-2 text-center max-w-[254px] md:max-w-[246px] lg:max-w-[404px] mx-auto">
//             {error}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostcodeSearch

import React from 'react'

function PostCodeSearch() {
  return (
    <div>PostCodeSearch</div>
  )
}

export default PostCodeSearch