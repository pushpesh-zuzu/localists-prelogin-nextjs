"use client";

import BlogCards from "./Blogcards";
import BlogHeroCard from "./BlogHeroCard";
import Button from "../../UI/Typography/Button";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";


const blogs = [
    {
        title: "How much does a plumber cost in 2026?",
        image: "/images/BlogPage/plumber.webp",
    },
    {
        title: "How much does an electrician cost in 2026?",
        image: "/images/BlogPage/electrician.webp",
    },
    {
        title: "How much does a tree surgeon cost in 2026?",
        image: "/images/BlogPage/surgeon.webp",
    },
    {
        title: "How much does a plumber cost in 2026?",
        image: "/images/BlogPage/plumber.webp",
    },
    {
        title: "How much does an electrician cost in 2026?",
        image: "/images/BlogPage/electrician.webp",
    },
    {
        title: "How much does a tree surgeon cost in 2026?",
        image: "/images/BlogPage/surgeon.webp",
    },
];

export default function BlogGridSection() {
    return (
        <WrapperBGWidth>
            <section className="max-w-[1320px] mx-auto px-4 md:px-8 xl:px-0 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <BlogHeroCard
                        title="A guide to Tree Preservation Orders"
                        image="/images/blogPage/guideTree.webp"
                    />

                    {blogs.map((item, index) => (
                        <BlogCards
                            key={index}
                            title={item.title}
                            image={item.image}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-6 xl:mt-12">
                    <Button className="bg-[#253238] px-4.5 py-1 md:px-9 md:py-2 xl:py-3.5 xl:px-[66px] text-white rounded-full">
                        Show More
                    </Button>
                </div>
            </section>
        </WrapperBGWidth>
    );
}
