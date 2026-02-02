export default function H3({ children, className = "", style = {} }) {
  return (
    <h3
      className={`
        font-Inter font-black
        tracking-[-0.03em]
        text-[24px] leading-[24px]
        md:text-[22px] md:leading-[24px]
        lg:text-[35px] lg:leading-[35px] xl:text-[38px] xl:leading-[38px]
        ${className}
      `}
      style={style}
    >
      {children}
    </h3>
  );
}
