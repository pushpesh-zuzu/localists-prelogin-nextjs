"use client";

export default function FormWrapper({ children }) {
  return (
    <div
      className="
        w-[550px]
        bg-white
        rounded-[20px]
        overflow-hidden

        max-[1024px]:w-full
        max-[1024px]:max-w-[550px]
        max-[1024px]:mx-auto
      "
    >
      {children}
    </div>
  );
}
