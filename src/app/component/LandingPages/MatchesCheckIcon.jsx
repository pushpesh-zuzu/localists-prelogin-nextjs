const MatchesCheckIcon = ({
  size = 16,
  strokeColor = "white",
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="0.5"
        y="0.5"
        width="15"
        height="15"
        stroke={strokeColor}
      />
      <path d="M4 8.6902L6.66667 11.3569L12 5.64258" stroke="white" stroke-width="1.14286" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};

export default MatchesCheckIcon;
