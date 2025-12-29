import Image from "next/image";
import H3 from "../UI/Typography/H3";
import H5 from "../UI/Typography/H5";

export default function CarouselCard({ card }) {
  if (card.isSpecial) {
    return (
      <div className="select-none flex flex-col gap-6 text-center px-3 py-[22px] lg:px-[32px]  rounded-2xl xl:px-[51px] xl:py-[43px] max-w-[281px]   h-[132px]  sm:h-[145px] lg:h-[200px] xl:h-[235px] bg-[#7CD6F0] xl:rounded-[28px] font-bold">
        <H3>{card.title}</H3>
        <div className="flex justify-center">
          <button className="rounded-full mb- bg-black text-white px-[18px] xl:px-[35px] text-base xl:text-[20px] -tracking-[3%] mx-auto py-[3px] lg:py-[5px]">
            View All
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="select-none h-[213px] sm:h-[145px] lg:h-[200px] xl:h-[235px] relative flex justify-center">
      <div className="relative w-full h-full max-w-[281px] rounded-[20px] xl:rounded-[28px] overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="w-[244px] h-[213px] md:w-[180px] md:h-[132px] xl:w-[297px]  max-w-[281px] xl:h-[248px]"
          sizes="(max-width: 768px) 90px,
               (max-width: 1024px) 133px,
               (max-width: 1280px) 195px,
               297px"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]"></div>
        <H5 className="text-white text-center w-[89%] absolute bottom-3 left-1/2 -translate-x-1/2">
          {card.title}
        </H5>
      </div>
    </div>
  );
}
