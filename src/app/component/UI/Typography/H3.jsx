export default function H3({ children, className = "" }) {
  return (
    <h3
      className={`
        font-Inter font-black
        tracking-[-0.03em]
        text-[24px] leading-[22px]
        lg:text-[38px] lg:leading-[38px]
        ${className}
      `}
    >
      {children}
    </h3>
  );
}
