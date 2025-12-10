export default function H1({ children, className = "" }) {
  return (
    <h1
      className={`
        font-Inter font-black
        tracking-[-0.03em]
        text-[50px] leading-12
        lg:text-[81px] lg:leading-[75px]
        ${className}
      `}
    >
      {children}
    </h1>
  );
}
