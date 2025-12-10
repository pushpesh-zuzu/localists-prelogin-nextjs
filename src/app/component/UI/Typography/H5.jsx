export default function H5({ children, className = "" }) {
  return (
    <h5
      className={`
        font-Inter font-black
        tracking-[-0.03em]
        text-[18px] leading-[18px]
        lg:text-[25px] lg:leading-[25px]
        ${className}
      `}
    >
      {children}
    </h5>
  );
}
