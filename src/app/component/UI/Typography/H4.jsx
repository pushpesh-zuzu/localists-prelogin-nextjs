export default function H4({ children, className = "" }) {
  return (
    <h4
      className={`
        font-Inter font-black
        tracking-[-0.03em]
        text-[20px] leading-[20px]
        md:text-[16px] md:leading-[16px]
        lg:text-[30px] lg:leading-[30px]
        ${className}
      `}
    >
      {children}
    </h4>
  );
}
