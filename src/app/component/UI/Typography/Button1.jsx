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
        text-base
        md:text-[16px]
        lg:text-[18px]
        px-6 py-2 xl:py-2 xl:px-7  rounded-full
        shadow-[0_0_4px_rgba(0,0,0,0.1)
    `,

    secondary: `
      bg-black text-white
      text-base
      md:text-[16px]
      lg:text-[18px]
      px-6 py-2 xl:py-2 xl:px-7 mt-8 xl:mt-12 rounded-full
      shadow-[0_0_4px_rgba(0,0,0,0.1)
    `,
    danger: `
      bg-red-600 text-white
      text-base
      md:text-[16px]
      lg:text-[18px]
      px-6 py-2 xl:py-2 xl:px-7 mt-4 xl:mt-8 rounded-full
      shadow-[0_0_4px_rgba(0,0,0,0.1)
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
