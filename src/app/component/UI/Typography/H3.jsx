export default function H3({ children, className = "", style = {} }) {
  return (
    <h3
      className={`
        font-Inter font-black
        tracking-[-0.03em]
        text-[24px] leading-[22px]
        md:text-[22px] md:leading-[22px]
        lg:text-[35px] lg:leading-[30px] xl:text-[38px] xl:leading-[38px]
        ${className}
      `}
      style={style}
    >
      {children}
    </h3>
  );
}
