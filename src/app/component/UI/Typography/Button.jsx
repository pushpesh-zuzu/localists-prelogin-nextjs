export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`
        font-[Arial] font-bold
        tracking-[-0.03em]
        text-[16px]
        lg:text-[18px]
        ${className}
      `}
    >
      {children}
    </button>
  );
}
