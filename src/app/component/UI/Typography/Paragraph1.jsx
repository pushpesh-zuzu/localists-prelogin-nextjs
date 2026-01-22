export default function Paragraph1({ children, className = "", style = {} }) {
  return (
    <p
      className={`
        font-[Arial] font-bold tracking-[-0.03em] text-[18px] leading-[20px]
                      sm:text-base sm:leading-[18px]
                      lg:text-[20px] lg:leading-[22px]
        ${className}
      `}
      style={style}
    >
      {children}
    </p>
  );
}