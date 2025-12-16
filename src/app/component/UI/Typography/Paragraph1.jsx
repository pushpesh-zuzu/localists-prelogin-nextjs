export default function Paragraph1({ children, className = "" }) {
  return (
    <p
      className={`
        font-[Arial] font-bold tracking-[-0.03em] text-[18px] leading-[18px]
                      sm:text-base sm:leading-[18px]
                      lg:text-[20px] lg:leading-6
        ${className}
      `}
    >
      {children}
    </p>
  );
}
