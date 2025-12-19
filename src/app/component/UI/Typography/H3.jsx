export default function H3({ children, className = "",style={} }) {
  return (
    <h3
      className={`
        font-Inter font-black
        tracking-[-0.03em]
        text-[24px] md:text-[20px] leading-[22px]
        lg:text-[38px] lg:leading-[38px]
        ${className}
      `}
      style={style}
    >
      {children}
    </h3>
  );
}
