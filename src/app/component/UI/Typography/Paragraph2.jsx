export default function Paragraph2({ children, className = "", style = {} }) {
  return (
    <p
      className={`
        font-[Arial]
        font-normal
        tracking-[-0.03em]
        leading-[100%]
        text-black
        text-[20px]       
        max-[768px]:text-[18px]
        max-[480px]:text-[16px]

        ${className}
      `}
      style={style}
    >
      {children}
    </p>
  );
}
