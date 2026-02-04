export default function H2({ children, className = "", variant = "primary" }) {
  const baseClasses = "font-Inter font-black tracking-[-0.03em]";

  const variants = {
    primary:
      "text-[30px] leading-[28px] md:text-[35px] md:leading-[35px] lg:text-[50px] lg:leading-[55px]",

    secondary:
      "text-[30px] leading-[34px] md:text-[35px] md:leading-[35px] lg:text-[50px] lg:leading-[55px]",
    tercery:
      "text-[26px] leading-[30px] md:text-[35px] md:leading-[35px] lg:text-[50px] lg:leading-[55px]",
  };

  return (
    <h2 className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </h2>
  );
}
