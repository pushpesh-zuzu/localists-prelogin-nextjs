export default function GalleryIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 122 123"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="122" height="123" rx="14" fill="#fff" />

      {/* Image frame */}
      <rect
        x="20"
        y="28"
        width="82"
        height="60"
        rx="10"
        fill="white"
        stroke="#000"
        strokeWidth="2"
      />

      {/* Mountain */}
      <path d="M28 80L50 55L66 72L82 50L100 80H28Z" fill="#000" />

      {/* Sun */}
      <circle cx="45" cy="45" r="6" fill="#000" />

      {/* Small dots */}
      <circle cx="75" cy="45" r="3" fill="#E4E7EC" />
      <circle cx="85" cy="45" r="3" fill="#E4E7EC" />
    </svg>
  );
}
