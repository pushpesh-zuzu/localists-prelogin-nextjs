
function PaddingWrapper({
  children,
  background = "#fff",
  className = "",
}) {
  return (
    <section
      style={{ background }}
      className={`
        px-[120px] py-[56px]
        
        max-[768px]:px-[56px]
        max-[768px]:pt-[30px]
        max-[768px]:pb-[48px]

        max-[600px]:px-[10px]
        max-[600px]:pt-[30px]
        max-[600px]:pb-[48px]

        ${className}
      `}
    >
      {children}
    </section>
  );
}

export default PaddingWrapper;
