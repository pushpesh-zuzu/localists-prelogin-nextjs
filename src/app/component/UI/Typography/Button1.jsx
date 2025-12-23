const Button1 = ({
  children,
  onClick,
  variant = "primary", // primary | secondary | danger
  type = "button",
  disabled = false,
  className = "",
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    rounded-full
    font-[Arial] font-bold
    tracking-[-0.03em]
    text-center align-middle
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-[#00afe3] text-white
      text-[16px] leading-[100%] 
      px-[15px] py-[8px]      
      lg:px-[28px] lg:py-[15px]
      md:text-[18px] md:leading-[100%]
      md:px-[8px] md:py-[15px]
      rounded-full
    `,
    secondary: `
      bg-black text-white
      text-[16px] leading-[100%]
      px-[15px] py-[8px]
      lg:px-[28px] lg:py-[15px]
      md:text-[18px] md:leading-[100%]
      md:px-[8px] md:py-[15px]
      rounded-full
    `,
    danger: `
      bg-red-600 text-white
      px-[15px] py-[8px]
      text-[16px] leading-[100%]
      lg:px-[28px] lg:py-[15px]
      md:text-[18px] md:leading-[100%]
      md:px-[8px] md:py-[15px]
      rounded-full
    `,
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
