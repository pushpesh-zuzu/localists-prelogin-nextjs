import React from "react";
import Image from "next/image";
import H2 from "../UI/Typography/H2";

const projectImages = [
    "/roofing.webp",
    "/nearme/Roofing/rooferneatly.webp",
    "/nearme/Roofing/roofrepair.webp",
    "/nearme/Roofing/roofspecialist.webp",
    "/nearme/Roofing/rooferneatly.webp",
    "/nearme/Roofing/roofspecialist.webp",
    "/nearme/Roofing/roofrepair.webp",
    "/roofing.webp",
];

function ProjectDetails() {
    return (
        <div
            className="bg-[#f5f7fa]
        flex flex-col items-center justify-center
        text-center gap-[20px] px-[145px] pt-[48px] pb-[72px]
        max-[880px]:px-[60px] max-[880px]:pb-[40px]
        max-[520px]:px-[30px] max-[520px]:pb-[30px]"
        >
            <H2 variant="secondary" className="">
                We've Completed{" "}
                <span className="text-[#00afe3]">Over 2,700 Projects</span>
            </H2>
            <p
                className="
          font-[Arial] tracking-[-0.03em]
          text-[20px] leading-[20px]
          md:text-[15px] md:leading-[15px]
          lg:text-[25px] lg:leading-[25px]
        "
            >
                Here's some of our recent work
            </p>

            {/* IMAGE GRID */}
            <div
                className="
          mt-[20px]
          grid grid-cols-2 md:grid-cols-4
          gap-[12px] md:gap-[20px]
          w-full max-w-[1200px]
        "
            >
                {projectImages.map((src, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-[10px] aspect-[4/3]"
                    >
                        <Image
                            src={src}
                            alt="roofing"
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectDetails;