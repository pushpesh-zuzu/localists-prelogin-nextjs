"use client";
import Image from "next/image";

export default function BlogHeroCard({ title, image }) {
  return (
    <article className="lg:col-span-3 relative h-[600px] rounded-[24px] overflow-hidden group cursor-pointer">
      <Image
        src={image || "/images/BlogPage/Eco4.webp"}
        alt={title || "ECO4 Axe Will Trigger a Wave of Business Collapse and Job Carnage, Expert Warns"}
        fill
        sizes="100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        quality={90}
        priority
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]" />

      <h3
        className="
          absolute bottom-8 left-7
          text-white font-Inter font-black
        tracking-[-0.03em]
        text-[24px] leading-[24px]
        md:text-[22px] md:leading-[26px]
        lg:text-[35px] lg:leading-[30px] xl:text-[38px] xl:leading-[38px]
        "
      >
        {title || "ECO4 Axe Will Trigger a Wave of Business Collapse and Job Carnage, Expert Warns"}
      </h3>
    </article>
  );
}
