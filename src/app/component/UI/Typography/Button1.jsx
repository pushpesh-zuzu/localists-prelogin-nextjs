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
    primary: "bg-[#00afe3] text-white hover:bg-[#0096c4]",
    secondary: "bg-black text-white hover:bg-black/90",
    danger: "bg-red-600 text-white hover:bg-red-700",
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
