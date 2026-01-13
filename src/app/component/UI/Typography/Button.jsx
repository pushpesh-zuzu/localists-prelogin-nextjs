export default function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
  ...props
}) {
  const baseClasses = "font-[Arial] font-bold tracking-[-0.03em]";

  const variants = {
    primary: "text-base md:text-[16px] lg:text-[18px]",
    secondary: "text-sm md:text-[14px] lg:text-[18px]",
  };

  return (
    <button
      {...props}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
