"use client";

import BlogCards from "./Blogcards";
import BlogHeroCard from "./BlogHeroCard";
// import Button from "../../UI/Typography/Button";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import GetQuote from "../../common/GetQuotes/GetQuote";


const blogs = [
    {
        title: "Tree Removal Cost UK",
        image: "/images/BlogPage/garden_shrubs.webp",
    },
    {
        title: "New Roof Grants in 2026",
        image: "/images/BlogPage/shrub1.webp",
    },
    {
        title: "How long does a flat roof last",
        image: "/images/BlogPage/Howlong.webp",
    },
    {
        title: "Roof Replacement Cost in 2026: The full Breakdown",
        image: "/images/BlogPage/view.webp",
    },
    {
        title: "Roof repair cost in 2026: The full Breakdown",
        image: "/images/BlogPage/capMan.webp",
    },
    {
        title: "Roof cleaning cost in 2026: The full Breakdown",
        image: "/images/BlogPage/waterMan.webp",
    },
    {
        title: "Roof tile Replacement Costs in 2026: The full Breakdown",
        image: "/images/BlogPage/DrillMan.webp",
    },
    {
        title: "Roof inspection cost in 2026: The full Breakdown",
        image: "/images/BlogPage/planPeoples.webp",
    },
    {
        title: "Rubber roofing cost in 2026: The full Breakdown",
        image: "/images/BlogPage/plates.webp",
    },
    {
        title: "State vs tile roof: Which one is best for your home?",
        image: "/images/BlogPage/frame.webp",
    },
];

export default function BlogGridSection() {
    return (
        <WrapperBGWidth>
            <section className="max-w-[1320px] mx-auto px-4 md:px-8 xl:px-0 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <BlogHeroCard
                        title="ECO4 Axe Will Trigger a Wave of Business Collapse and Job Carnage, Expert Warns"
                        image="/images/BlogPage/Eco4.webp"
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
                    <GetQuote
                        text="Show More"
                        classGetQuote="py-[7px] xl:py-4 xl:px-[30px] hover:!bg-[#1b2326]"
                    />
                </div>


            </section>
        </WrapperBGWidth>
    );
}
