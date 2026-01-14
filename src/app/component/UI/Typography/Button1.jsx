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
  `;

  const variants = {
    primary: `
        bg-[#00afe3] text-white
        text-base
        md:text-[16px]
        lg:text-[18px]
        leading-7
        px-6 py-2 xl:py-2 xl:px-7 h-fit  rounded-full
        shadow-[0_0_4px_rgba(0,0,0,0.1)
    `,

    secondary: `
      bg-black text-white
      text-base
      md:text-[16px]
      lg:text-[18px]
      px-6 py-2 xl:py-2 xl:px-7 h-fit rounded-full
      shadow-[0_0_4px_rgba(0,0,0,0.1)
    `,
    danger: `
      bg-red-600 text-white
      text-base
      md:text-[16px]
      lg:text-[18px]
      px-6 py-2 xl:py-2 xl:px-7 h-fit rounded-full
      shadow-[0_0_4px_rgba(0,0,0,0.1)
    `,
    primary2: `
        bg-[#00afe3] text-white
        text-base
        md:text-[16px]
        lg:text-[18px]
        leading-7
        px-4 py-2 lg:py-2 lg:px-5 h-fit  rounded-full
        shadow-[0_0_4px_rgba(0,0,0,0.1)
    `,
    outlined: `
        text-[#828282]
        text-base
        md:text-[16px]
        lg:text-[18px]
        leading-7
        outline-1
       px-4 py-2 lg:py-2 lg:px-5 h-fit  rounded-full
        shadow-[0_0_4px_rgba(0,0,0,0.1)
    `,
    darkoutlined: `
        text-[#253238]
        text-base
        md:text-[16px]
        lg:text-[18px]
        outline-4
        outline-[#000]
       px-3.5 py-2 lg:py-2 lg:px-5 h-fit  rounded-full
        shadow-[0_0_4px_rgba(0,0,0,0.1)
    `,
    darkoutlinedPrimary: `
        text-[#00afe3]
        text-base
        md:text-[16px]
        lg:text-[18px]
        leading-7
        outline-[3.5px]
        outline-[#00afe3]
       px-4 py-2 lg:py-2 lg:px-5 h-fit  rounded-full
        shadow-[0_0_4px_rgba(0,0,0,0.1)
    `
    ,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className} disabled:opacity-90`}
    >
      {children}
    </button>
  );
};

export default Button1;
