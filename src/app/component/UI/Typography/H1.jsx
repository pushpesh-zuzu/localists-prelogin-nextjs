export default function H1({ children, className = "" }) {
  return (
    <h1
      className={`
        font-[Arial] font-black
        tracking-[-0.03em]
        text-[46px] leading-[48px]
        md:text-[60px] md:leading-[55px]
        lg:text-[81px] lg:leading-[75px]
        ${className}
      `}
      style={{ textShadow: "0px 3.65px 3.65px #0000001A" }}
    >
      {children}
    </h1>
  );
}
