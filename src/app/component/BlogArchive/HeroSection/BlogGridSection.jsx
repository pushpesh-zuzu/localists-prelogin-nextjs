"use client";
import Image from "next/image";

const blogs = [
  {
    title: "How much does a Plumber cost in 2026?",
    image: "/images/plumber.jpg",
  },
//   {
//     title: "How much does a electrician cost in 2026?",
//     image: "/images/electrician.jpg",
//   },
//   {
//     title: "How much does a tree surgeon cost in 2026?",
//     image: "/images/tree.jpg",
//   },
//   {
//     title: "How much does a Plumber cost in 2026?",
//     image: "/images/plumber.jpg",
//   },
//   {
//     title: "How much does a electrician cost in 2026?",
//     image: "/images/electrician.jpg",
//   },
//   {
//     title: "How much does a tree surgeon cost in 2026?",
//     image: "/images/tree.jpg",
//   },
];

export default function BlogGridSection() {
  return (
    <section className="max-w-[1320px] mx-auto px-4 md:px-8 xl:px-0 py-14">
      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LARGE CARD */}
        <div className="lg:col-span-3 relative h-[380px] rounded-[24px] overflow-hidden">
          <Image
            src="/homepage/tree-surgeon.webp"
            alt="Tree Preservation Orders"
            fill
            className="object-cover"
            priority
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Text */}
          <h2 className="absolute bottom-6 left-6 text-white text-[24px] md:text-[28px] font-bold leading-tight max-w-[520px]">
            A guide to Tree Preservation Orders
          </h2>
        </div>

        {/* SMALL CARDS */}
        {blogs.map((item, index) => (
          <div
            key={index}
            className="relative h-[210px] rounded-[20px] overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Text */}
            <p className="absolute bottom-4 left-4 right-4 text-white text-[16px] font-semibold leading-snug">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-10">
        <button className="bg-[#2E3A3F] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition">
          Show more
        </button>
      </div>
    </section>
  );
}
