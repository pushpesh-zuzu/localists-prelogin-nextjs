export default function Paragraph({
  children,
  className = "",
  bold = false,
  variant = "primary",
}) {
  const variants = {
    primary: ` text-[18px] leading-[18px]
        md:text-[16px] md:leading-[16px]
        lg:text-[20px] lg:leading-[24px]`,

    secondary: `text-[18px] leading-[22px]
        md:text-[16px] md:leading-[16px]
        lg:text-[20px] lg:leading-[24px]`,

    medium: ` text-[18px] leading-[22px]
        md:text-[16px] md:leading-[16px]
        lg:text-[18px] lg:leading-[24px]`,

    small: ` text-[16px] leading-[20px]
        md:text-[14px] md:leading-[16px]
        lg:text-[16px] lg:leading-[20px]
        `,
  };
  return (
    <p
      className={`
        font-[Arial] ${bold ? bold : "font-bold"}
        tracking-[-0.03em]
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </p>
  );
}
