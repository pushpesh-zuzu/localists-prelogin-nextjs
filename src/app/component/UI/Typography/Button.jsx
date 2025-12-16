export default function Button({ children, onClick, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`
        font-[Arial] font-bold
        tracking-[-0.03em]
        text-base
        md:text-[16px]
        lg:text-[18px]
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
