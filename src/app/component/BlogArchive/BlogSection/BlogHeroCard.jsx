"use client";
import Image from "next/image";

export default function BlogHeroCard({ title, image }) {
  return (
    <article className="lg:col-span-3 relative h-[600px] rounded-[24px] overflow-hidden group cursor-pointer">
      <Image
        src={image || "/images/BlogPage/guideTree.webp"}
        alt={title || "Tree Preservation Orders"}
        fill
        sizes="100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        quality={90}
        priority
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]" />

      <h2
        className="
          absolute bottom-6 left-6 max-w-[520px]
          text-white font-black -tracking-[0.03em]
          text-[16px] leading-[18px]
          sm:text-[20px] sm:leading-[22px]
          xl:text-[25px] xl:leading-[25px]
        "
      >
        {title || "A guide to Tree Preservation Orders"}
      </h2>
    </article>
  );
}
