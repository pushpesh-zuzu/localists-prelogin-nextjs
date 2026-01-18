
const Button = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
}) => {
  const variantClasses = {
    primary: "bg-[#00AFE3] text-white",
    secondary: "bg-black text-white",
    danger: "bg-[#DC2626] text-white",
    warning: "bg-[#FF9933] text-white",
    primary2: "bg-[#00AFE3] text-white px-[20px] py-[8px]",
    outlined: "bg-transparent text-[#828282] outline outline-1 outline-[#828282]",
    darkoutlined:
      "bg-transparent text-[#253238] outline outline-[4px] outline-black",
    darkoutlinedPrimary:
      "bg-transparent text-[#00AFE3] outline outline-[3.5px] outline-[#00AFE3]",
    green: "bg-[#10C87B] text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        rounded-full
        font-[Arial] font-bold
        tracking-[-0.03em]
        text-center align-middle
        border-none cursor-pointer
        leading-7
        text-[18px] px-[22px] py-[12px]
        max-[1024px]:text-[16px]
        max-[600px]:text-[16px]
        ${variantClasses[variant] || ""}
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
