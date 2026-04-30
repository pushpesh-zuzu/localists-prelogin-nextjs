import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import H2 from "../UI/Typography/H2";
import Button from "../UI/Typography/Button";

function AdviceAndInsightBlog({ articles = [], maxWidth = false }) {
  if (!articles || articles.length === 0) return null;

  // Dynamic row logic
  const getRows = (articles) => {
    const rows = [];
    let i = 0;

    while (i < articles.length) {
      const remaining = articles.length - i;

      if (remaining === 4) {
        rows.push(articles.slice(i, i + 2));
        rows.push(articles.slice(i + 2, i + 4));
        break;
      }

      if (remaining === 5) {
        rows.push(articles.slice(i, i + 3));
        rows.push(articles.slice(i + 3, i + 5));
        break;
      }

      if (remaining >= 3) {
        rows.push(articles.slice(i, i + 3));
        i += 3;
      } else {
        rows.push(articles.slice(i, i + 2));
        break;
      }
    }

    return rows;
  };

  // Memoized rows (performance)
  const rows = useMemo(() => getRows(articles), [articles]);

  return (
    <WrapperBGWidth>
      <section
        className={`${maxWidth ? "max-w-[95%]" : ""
          } mx-auto h-auto min-h-[336px] lg:min-h-[635px] px-7.5 pb-12 sm:px-10 md:px-16 md:pb-10 xl:px-[120px] lg:pt-0 lg:pb-[86px]`}
      >
        {/* Heading */}
        <H2 className="text-[#00afe3] pb-7.5 xl:pb-[53px]">
          Read <span className="text-[#253238]">More.</span>
        </H2>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:block space-y-2 xl:space-y-6 xl:mb-8">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid ${row.length === 3 ? "grid-cols-3" : "grid-cols-2"
                } sm:gap-2 lg:gap-[17px]`}
            >
              {row.map((article, index) =>
                article.url ? (
                  <Link
                    href={article.url}
                    key={article.id}
                    aria-label={article.title || "blog link"}
                  >
                    <article className="relative rounded-3xl overflow-hidden h-[170px] lg:h-[336px] group cursor-pointer">
                      <Image
                        src={article.image}
                        alt={article.title || "blog image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        quality={85}
                        priority={rowIndex === 0 && index === 0}
                      />

                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.3)_100%)]"></div>

                      {article.title && (
                        <h3 className="absolute bottom-4 left-4 right-4 text-white text-sm md:text-base xl:text-[25px] font-black">
                          {article.title}
                        </h3>
                      )}
                    </article>
                  </Link>
                ) : (
                  <article
                    key={article.id}
                    className="relative rounded-3xl overflow-hidden h-[170px] lg:h-[336px] group"
                  >
                    <Image
                      src={article.image}
                      alt={article.title || "blog image"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      quality={85}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.3)_100%)]"></div>

                    {article.title && (
                      <h3 className="absolute bottom-4 left-4 right-4 text-white text-sm md:text-base xl:text-[25px] font-black">
                        {article.title}
                      </h3>
                    )}
                  </article>
                )
              )}
            </div>
          ))}
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden grid grid-cols-1 gap-3">
          {articles.map((article, index) =>
            article.url ? (
              <Link
                href={article.url}
                key={article.id}
                aria-label={article.title || "blog link"}
              >
                <article className="relative rounded-2xl overflow-hidden h-[200px] group cursor-pointer">
                  <Image
                    src={article.image}
                    alt={article.title || "blog image"}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    quality={85}
                    priority={index === 0}
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.3)_100%)]"></div>

                  {article.title && (
                    <h3 className="absolute bottom-4 left-4 right-4 text-white text-sm font-black">
                      {article.title}
                    </h3>
                  )}
                </article>
              </Link>
            ) : (
              <article
                key={article.id}
                className="relative rounded-2xl overflow-hidden h-[200px] group"
              >
                <Image
                  src={article.image}
                  alt={article.title || "blog image"}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  quality={85}
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.3)_100%)]"></div>

                {article.title && (
                  <h3 className="absolute bottom-4 left-4 right-4 text-white text-sm font-black">
                    {article.title}
                  </h3>
                )}
              </article>
            )
          )}
        </div>

        {/* ================= BUTTON ================= */}
        <div className="flex justify-center mt-6 xl:mt-12">
          <a href="/en/gb/blog" aria-label="Read roofing blog">
            <Button className="bg-[#253238] cursor-pointer hover:bg-[#00aef3] px-4.5 py-2 xl:py-[15px] md:px-9 xl:px-[66px] rounded-full text-white shadow-[0_0_4px_rgba(0,0,0,0.1)]">
              Read More
            </Button>
          </a>
        </div>
      </section>
    </WrapperBGWidth>
  );
}

export default AdviceAndInsightBlog;