export default function Paragraph({ children, className = "", bold = false }) {
  return (
    <p
      className={`
        font-[Arial] ${bold ? bold : "font-bold"}
        tracking-[-0.03em]
        text-[18px] leading-[18px]
        md:text-[16px] md:leading-[16px]
        lg:text-[20px] lg:leading-[24px]
        ${className}
      `}
    >
      {children}
    </p>
  );
}
