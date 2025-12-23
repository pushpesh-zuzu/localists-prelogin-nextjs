const Button1 = ({
  children,
  onClick,
  variant = "primary", // primary | secondary | danger (future ready)
  type = "button",
  disabled = false,
  className = "",
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    rounded-sm
    font-semibold
    text-[20px]
    py-2.5 px-6
    max-w-fit
    transition
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: "bg-[#00afe3] text-white hover:bg-[#0096c4] text-[20px] max-[480px]:text-[14px] px-[9px] py-[8px] min-w-[98px rounded-[3px] font-medium hover:bg-[#0096c4] disabled:opacity-50",
    secondary: "bg-black text-white hover:bg-black/90 text-[20px] max-[480px]:text-[14px] px-[9px] py-[8px] min-w-[98px rounded-[3px] font-medium hover:bg-[#0096c4] disabled:opacity-50",
    danger: "bg-red-600 text-white hover:bg-red-700 text-[20px] max-[480px]:text-[14px] px-[9px] py-[8px] min-w-[98px rounded-[3px] font-medium hover:bg-[#0096c4] disabled:opacity-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button1;
