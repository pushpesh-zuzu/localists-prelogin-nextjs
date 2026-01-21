export default function H5({ children, className = "", variant = "primary" }) {
  const variants = {
    primary: `text-[25px] leading-[25px]
        md:text-[25px] md:leading-[25px]
        lg:text-[25px] lg:leading-[25px]`,
        
    secondary: `text-[20px] leading-[25px]
        md:text-[25px] md:leading-[25px]
        lg:text-[25px] lg:leading-[25px]`,
    medium: `text-[25px] leading-[25px]
        md:text-[16px] md:leading-[16px]
        lg:text-[25px] lg:leading-[25px]`,
        
  };
  return (
    <h5
      className={`
        font-Inter font-black
        tracking-[-0.03em]
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </h5>
  );
}
