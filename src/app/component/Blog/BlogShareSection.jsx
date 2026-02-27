"use client";

import { usePathname } from "next/navigation";
import XWithArrowIcon from "../../../../public/ReactIcons/XWithArrowIcon";
import FacebookWithArrowIcon from "../../../../public/ReactIcons/FacebookWithArrowIcon";
import AttachFileWithArrowIcon from "../../../../public/ReactIcons/AttachFileWithArrowIcon";
import LinkeInWithArrowIcon from "../../../../public/ReactIcons/LinkeInWithArrowIcon";

function BlogShareSection({ readTime = "" }) {
  const pathname = usePathname();
  const BaseURL = new URL(process.env.NEXT_PUBLIC_CANNONICAL_SITE_URL).hostname
  const blogUrl =
    `${BaseURL}${pathname}`;

  return (
    <div>
      <p className="text-base font-bold mb-3">Share</p>

      <div className="flex gap-3">

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkeInWithArrowIcon className="h-6 w-14 md:h-9 md:w-[90px]" />
        </a>

        {/* Twitter / X */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <XWithArrowIcon className="h-6 w-14 md:h-9 md:w-[90px]" />
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookWithArrowIcon className="h-6 w-14 md:h-9 md:w-[90px]" />
        </a>

        {/* Copy Link */}
        <button
        className="cursor-pointer"
          onClick={() => {navigator.clipboard.writeText(blogUrl); alert('Link copied to clipboard!')}}
        >
          <AttachFileWithArrowIcon className="h-6 w-14 md:h-9 md:w-[90px]" />
        </button>

      </div>
        <div className={`flex md:justify-end ${readTime ? "my-5" : "mb-5 md:my-5"}`}>
          {readTime && <span className="text-base font-bold">{readTime}</span>}
        </div>
      
    </div>
  );
}

export default BlogShareSection;