import Image from "next/image";
import H3 from "../UI/Typography/H3";
import H5 from "../UI/Typography/H5";

export default function CarouselCard({ card }) {
  if (card.isSpecial) {
    return (
      //   <div className={`${card.bgColor} rounded-3xl p-8 h-[280px] flex flex-col justify-center items-start`}>
      //     <h2 className="text-4xl font-bold text-gray-800 mb-4">
      //       {card.title}
      //     </h2>
      //     <button className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition">
      //       View All
      //     </button>
      //   </div>
      <div className="select-none flex flex-col gap-6 text-center px-3 py-[22px] rounded-2xl xl:px-[51px] xl:py-[43px] max-w-[281px]   h-[132px]  sm:h-[235px] bg-[#7CD6F0] xl:rounded-[28px] font-bold">
        <H3>{card.title}</H3>
        <div className="flex justify-center">
          <button className="rounded-full mb- bg-black text-white px-[18px] xl:px-[35px] text-base xl:text-[20px] -tracking-[3%] mx-auto py-[3px] lg:py-[5px]">
            View All
          </button>
        </div>
      </div>
    );
  }

  // Normal image cards
  return (
    // <div className="relative rounded-3xl overflow-hidden h-[280px] group">
    //   <Image
    //     src={card.image}
    //     alt={card.title}
    //     fill
    //     className="object-cover group-hover:scale-105 transition-transform duration-300"
    //   />
    //   {/* Dark overlay */}
    //   <div className="absolute inset-0 bg-black/30"></div>

    //   {/* Title */}
    //   <div className="absolute bottom-6 left-6">
    //     <h3 className="text-white text-2xl font-bold">{card.title}</h3>
    //   </div>
    // </div>
    <div className="select-none h-[213px] sm:h-[235px] relative flex justify-center">
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
        <div className="absolute inset-0"></div>
        <H5 className="text-white text-center w-[90%] absolute bottom-5 left-1/2 -translate-x-1/2">
          {card.title}
        </H5>
      </div>
    </div>
  );
}
