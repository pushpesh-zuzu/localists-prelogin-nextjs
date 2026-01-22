"use client";
import Image from "next/image";

export default function BlogCards({ title, image, priority = false }) {
  return (
    <article className="relative rounded-[23px] overflow-hidden h-[300px] group cursor-pointer">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        quality={85}
        priority={priority}
        fetchPriority="high"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]" />

      <h3
        className="
          absolute bottom-7 left-7 right-4
          text-white font-black -tracking-[0.03em]
          text-[20px] leading-[25px]
           md:text-[25px] md:leading-[25px]
          lg:text-[25px] lg:leading-[28px]"
      >
        {title}
      </h3>
    </article>
  );
}
