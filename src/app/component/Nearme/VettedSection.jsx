import React from "react";
import H2 from "../UI/Typography/H2";
import Paragraph from "../UI/Typography/Paragraph";
import GetQuote from "../common/GetQuotes/GetQuote";
import Button1 from "../UI/Typography/Button1";
import NearmeH2Heading from "./NearmeH2Heading";

function VettedSection({
  isSingular = false,
  vettedHeading1 = "",
  vettedHeading2 = "trust",
  paragraph = [],
}) {
  return (
    <div className="pt-[60px]">
      {/* <H2 className="text-[#00AFE3]">
        Vetted
          {vettedHeading}
        <span className="text-[#253238]">
          {" "}
          {isSingular ? "s" : ""}{" "}
        trust
        </span>
      </H2> */}
      <NearmeH2Heading
        headdingblue={vettedHeading1}
        headingblack={vettedHeading2}
      />
      {/* Paragraphs Wrapper */}
      <div className="mt-6  flex flex-col gap-6 md:gap-8 lg:gap-[48px]">
        {paragraph.map((item, index) => (
          <Paragraph key={index}>{item}</Paragraph>
        ))}
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          <GetQuote />
          <Button1 variant="darkoutlined" className="w-fit">
            View Tree Surgeons{" "}
          </Button1>
        </div>
      </div>
    </div>
  );
}

export default VettedSection;
