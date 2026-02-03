import Link from "next/link";
import RightArrowBlack from "../icons/HomePageIcons/RightArrowBlack";
import HomeIcon from "../icons/HomePageIcons/HomeIcon";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1 sm:gap-2 lg:gap-[17px]">
      {/* Home Icon */}
      <Link
        href="/en/gb"
        className="flex items-center text-[#959B9E] hover:opacity-80 transition"
      >
        <HomeIcon size={22} className="h-4 w-4 md:h-[22px] md:w-4 lg:h-6 lg:w-[31px]" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-1 sm:gap-2">
            {/* Arrow */}
            <RightArrowBlack
              color="#838383"
              className="h-4 w-3 md:h-4 md:w-3 lg:h-7 lg:w-4"
            />

            {isLast || !item.path ? (
              // ACTIVE / CURRENT PAGE
              <span
                className="
                  font-inter font-[900] text-[14px] sm:text-[16px]
                  lg:text-[25px] leading-[13px] sm:leading-[16px] xl:leading-[25px]
                  tracking-[-0.03em]
                  text-[#00AFE3]
                  whitespace-normal break-words"
              >
                {item.title}
              </span>
            ) : (
              <Link
                href={item.path}
                className="
                  font-inter font-[900] text-[14px] sm:text-[16px]
                  lg:text-[25px] leading-[13px] sm:leading-[16px] xl:leading-[25px]
                  tracking-[-0.03em]
                  text-[#959B9E]
                  hover:opacity-80 transition
                  whitespace-normal break-words
                "
              >
                {item.title}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
