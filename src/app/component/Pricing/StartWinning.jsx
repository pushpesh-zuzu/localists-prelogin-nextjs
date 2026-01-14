"use client";

import { useRouter } from "next/navigation";
import H3 from "../UI/Typography/H3";

const StartWinning = () => {
  const router = useRouter();

  const onSubmitPageChange = () => {
    router.push("/en/gb/sellers/create");
  };

  return (
    <section
      className="
        text-center
        px-[20px] py-[63px]
        max-[768px]:py-[50px]
        max-[480px]:py-[30px]
      "
    >
      <H3 className="mb-[20px]">
        Start winning new business today
      </H3>

      <button
        onClick={onSubmitPageChange}
        className="
          rounded-[10px]
          bg-[#00AFE3]
          px-[23px] py-[10px]
          text-[38px]
          leading-[38px]
          font-bold
          tracking-[-0.03em] font-[Arial]
          text-white
          rounded-full
          transition-colors duration-300
          hover:bg-[#0096c4]
          cursor-pointer
          max-[768px]:px-[20px] max-[768px]:text-[28px]
          max-[480px]:px-[16px] max-[480px]:py-[8px] max-[480px]:text-[16px]
        "
      >
        Join as a Professional
      </button>
    </section>
  );
};

export default StartWinning;
