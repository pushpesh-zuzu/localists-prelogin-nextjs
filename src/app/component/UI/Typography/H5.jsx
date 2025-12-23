export default function H5({ children, className = "" }) {
  return (
    <h5
      className={`
        font-Inter font-black
        tracking-[-0.03em]
        text-[25px] leading-[25px]
        md:text-[25px] md:leading-[25px]
        lg:text-[25px] lg:leading-[25px]
        ${className}
      `}
    >
      {children}
    </h5>
  );
}
