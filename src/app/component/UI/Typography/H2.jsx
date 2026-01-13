export default function H2({ children, className = "" }) {
  return (
    <h2
      className={`
        font-[Arial] font-black
        tracking-[-0.03em]
        text-[30px] leading-[32px]
        md:text-[35px] md:leading-[35px]
        lg:text-[50px] lg:leading-[55px]
        ${className}
      `}
    >
      {children}
    </h2>
  );
}
