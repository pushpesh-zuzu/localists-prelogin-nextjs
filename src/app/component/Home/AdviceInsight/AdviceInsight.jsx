import Image from "next/image";
import React from "react";
import H2 from "../../UI/Typography/H2";
import Button from "../../UI/Typography/Button";

function AdviceInsight() {
  const articles = [
    {
      id: 1,
      title: "Top 10 Interior Design Trends in 2025",
      image: "/homepage/image10.webp",
    },
    {
      id: 2,
      title: "How much does a painter and decorator cost in 2025?",
      image: "/homepage/image14.webp",
    },
    {
      id: 3,
      title: "Top tips to create your own allotment",
      image: "/homepage/image11.webp",
    },
    {
      id: 4,
      title: "The 2025 House Improvement Index",
      image: "/homepage/image12.webp",
    },
    {
      id: 5,
      title: "The best place to book your wedding in 2025",
      image: "/homepage/image13.webp",
    },
  ];

  return (
    <section className="h-auto min-h-[336px] lg:min-h-[687px] px-2.5 py-10 sm:px-10 xl:px-[120px] lg:pt-[72px] lg:pb-[86px]">
      {/* <h2 className="font-bold pb-14 text-2xl md:text-[40px] lg:text-[75px]">
        <span className="text-[#00afe3]">Advice &</span>
        <span className="text-[#1a1a1a]"> insight.</span>
      </h2> */}
      <H2 className="text-[#00afe3] pb-[53px]">
        Advice & <span className="text-black">insight.</span>
      </H2>

      <div className="hidden md:block space-y-6 mb-8">
        <div className="grid grid-cols-3 gap-[17px]">
          <article className="col-span-1 relative rounded-3xl overflow-hidden h-[336px] group cursor-pointer">
            <Image
              src={articles[0].image}
              alt={articles[0].title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              quality={85}
              priority={false}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <h3 className="absolute bottom-4 left-4 right-4 text-white text-sm font-black xl:text-[25px] -tracking-[3%]">
              {articles[0].title}
            </h3>
          </article>

          <article className="col-span-2 relative rounded-3xl overflow-hidden h-[336px] group cursor-pointer">
            <Image
              src={articles[1].image}
              alt={articles[1].title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              quality={85}
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <h3 className="absolute bottom-4 left-4 right-4 text-white text-sm font-black xl:text-[25px] -tracking-[3%] xl:max-w-[80%]">
              {articles[1].title}
            </h3>
          </article>
        </div>

        <div className="grid grid-cols-3 gap-[17px]">
          {articles.slice(2).map((article, index) => (
            <article
              key={article.id}
              className="relative rounded-3xl overflow-hidden h-[336px] group cursor-pointer"
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
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <h3 className={`absolute bottom-4 left-4 right-4 text-white text-sm font-black xl:text-[25px] -tracking-[3%] xl:max-w-[80%]`}>
                {article.title}
              </h3>
            </article>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-6">
        <article className="relative rounded-3xl overflow-hidden h-[336px] group cursor-pointer">
          <Image
            src={articles[1].image}
            alt={articles[1].title}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            quality={85}
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <h3 className="absolute bottom-4 left-4 right-4 text-white text-sm font-black xl:text-[25px] -tracking-[3%]">
            {articles[1].title}
          </h3>
        </article>

        {/* Second Row - 2 Small Cards */}
        <div className="grid grid-cols-2 gap-4">
          <article className="relative rounded-2xl overflow-hidden h-[200px] group cursor-pointer">
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
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <h3 className="absolute bottom-4 left-4 right-4 text-white text-sm font-black xl:text-[25px] -tracking-[3%] ">
              {articles[0].title}
            </h3>
          </article>

          <article className="relative rounded-2xl overflow-hidden h-[200px] group cursor-pointer">
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
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <h3 className="absolute bottom-4 left-4 right-4 text-white text-sm font-black xl:text-[25px] -tracking-[3%] xl:max-w-[70%]">
              {articles[2].title}
            </h3>
          </article>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <Button className="bg-[#253238] py-3.5 px-[66px] text-white rounded-full">
          Read More
        </Button>
      </div>
    </section>
  );
}

export default AdviceInsight;
