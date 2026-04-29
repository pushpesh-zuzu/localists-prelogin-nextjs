"use client";

import { useState } from "react";
import HeroSection from "./HeroSection/HeroSection";
import BlogGridSection from "./BlogSection/BlogGridSection";

export default function BlogArchiveContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <HeroSection
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <BlogGridSection selectedCategory={selectedCategory} />
    </>
  );
}
