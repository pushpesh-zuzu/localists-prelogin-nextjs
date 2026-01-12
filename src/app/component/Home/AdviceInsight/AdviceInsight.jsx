import Image from "next/image";
import React from "react";
import H2 from "../../UI/Typography/H2";
import Button from "../../UI/Typography/Button";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";

function AdviceInsight({ articles = [], maxWidth = false }) {
  return (
    <WrapperBGWidth>
      <section
        className={`${
          maxWidth ? "max-w-[95%]" : ""
        } mx-auto h-auto min-h-[336px] lg:min-h-[687px] px-7.5 py-12 sm:px-10 md:px-16 md:py-10 xl:px-[120px] lg:pt-[72px] lg:pb-[86px]`}
      >
        <H2 className="text-[#00afe3] pb-7.5 xl:pb-[53px]">
          Advice & <span className="text-[#253238]">insight.</span>
        </H2>

        <div className="hidden md:block space-y-2 xl:space-y-6 xl:mb-8">
          <div className="grid grid-cols-3 sm:gap-2 lg:gap-[17px]">
            <article className="col-span-1 relative rounded-3xl overflow-hidden h-[170px] lg:h-[336px] group cursor-pointer">
              <Image
                src={articles[0].image}
                alt={articles[0].title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                quality={85}
                priority={false}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]"></div>
              <h3 className="absolute bottom-4 left-4 right-4 text-white text-sm md:text-base sm:leading-4 xl:leading-7 font-black xl:text-[25px] -tracking-[3%]">
                {articles[0].title}
              </h3>
            </article>

            <article className="col-span-2 relative rounded-3xl overflow-hidden h-[170px] lg:h-[336px] group cursor-pointer">
              <Image
                src={articles[1].image}
                alt={articles[1].title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                quality={85}
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]"></div>
              <h3 className="absolute bottom-4 left-4 right-4 text-white text-sm md:text-base sm:leading-4 xl:leading-7 font-black xl:text-[25px] -tracking-[3%] xl:max-w-[79%]">
                {articles[1].title}
              </h3>
            </article>
          </div>

          <div className="grid grid-cols-3 sm:gap-2 lg:gap-[17px]">
            {articles.slice(2).map((article, index) => (
              <article
                key={article.id}
                className="relative rounded-3xl overflow-hidden h-[170px] lg:h-[336px] group cursor-pointer"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  quality={85}
                  priority={false}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]"></div>
                <h3
                  className={`absolute bottom-4 left-4 right-4 text-white text-sm md:text-base sm:leading-4 xl:leading-7 font-black xl:text-[25px] -tracking-[3%] xl:max-w-[80%]`}
                >
                  {article.title}
                </h3>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-1.5">
          <article className="relative rounded-3xl overflow-hidden h-[297px] group cursor-pointer">
            <Image
              src={articles[1].image}
              alt={articles[1].title}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              quality={85}
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]"></div>
            <h3
              className="absolute bottom-4 left-4 right-4 text-white leading-4 text-[12px]
              [@media(min-width:360px)]:text-[15px] font-black xl:text-[25px] -tracking-[3%]"
            >
              {articles[1].title}
            </h3>
          </article>

          {/* Second Row - 2 Small Cards */}
          <div className="grid grid-cols-2 gap-1.5">
            <article className="relative rounded-2xl overflow-hidden h-[120px] group cursor-pointer">
              <Image
                src={articles[0].image}
                alt={articles[0].title}
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                quality={85}
                priority={false}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]"></div>
              <h3
                className="absolute bottom-4 leading-4 left-4 right-4 text-white text-[12px]
                            [@media(min-width:360px)]:text-[15px] font-black xl:text-[25px] -tracking-[3%] "
              >
                {articles[0].title}
              </h3>
            </article>

            <article className="relative rounded-2xl overflow-hidden h-[120px] group cursor-pointer">
              <Image
                src={articles[2].image}
                alt={articles[2].title}
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                quality={85}
                priority={false}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]"></div>
              <h3
                className="absolute bottom-4 left-4 right-4 text-white leading-4 text-[12px]
                [@media(min-width:360px)]:text-[15px] font-black xl:text-[25px] -tracking-[3%] xl:max-w-[70%]"
              >
                {articles[2].title}
              </h3>
            </article>
          </div>
        </div>

        <div className="flex justify-center mt-6 xl:mt-12">
          <Button className="bg-[#253238] px-4.5 py-1 md:px-9 md:py-2 xl:py-3.5 xl:px-[66px] text-white rounded-full">
            Read More
          </Button>
        </div>
      </section>
    </WrapperBGWidth>
  );
}

export default AdviceInsight;
