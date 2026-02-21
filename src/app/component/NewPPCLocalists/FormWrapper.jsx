export default function FormWrapper({ children, paddingInline }) {
  return (
    <div
      className={`
        ${paddingInline}
         w-[970px]
        bg-white
        rounded-[20px]
        overflow-hidden

        max-[1024px]:w-full
        max-[1024px]:max-w-[970px]
        max-[1024px]:mx-auto`}
    >
      {children}
    </div>
  );
}
