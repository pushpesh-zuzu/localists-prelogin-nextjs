"use client";
import React, { useState } from "react";
import NearmeH2Heading from "./NearmeH2Heading";
import Paragraph from "../UI/Typography/Paragraph";
import H5 from "../UI/Typography/H5";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";

export const FAQ = ({ data, defaultOpen }) => {
  const [openItem, setOpenItem] = useState(defaultOpen || null);

  const toggleItem = (key) => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <WrapperBGWidth>
      {" "}
      <div className="w-full px-2.5 lg:px-0 max-w-5xl mx-auto">
        <NearmeH2Heading headdingblue="FAQ" className="mb-10" />

        <div className="space-y-0 border-4 border-[#DBDFE4] rounded-[30px] overflow-hidden bg-white shadow-sm">
          {data.map((item, index) => (
            <div
              key={item.key}
              className={`${index !== 0 ? "border-t-4 border-[#DBDFE4]" : ""}`}
            >
              <button
                onClick={() => toggleItem(item.key)}
                className="w-full flex items-center justify-between px-5 pb-[30px] pt-5 hover:bg-gray-50 transition-colors duration-200 text-left"
                aria-expanded={openItem === item.key}
              >
                <H5 className=" flex-1">{item.title}</H5>
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  {openItem === item.key ? (
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-gray-900"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  ) : (
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-[#00afe3]"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItem === item.key
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-[20px] pb-[30px]">
                  <Paragraph
                    bold="font-normal"
                    variant="secondary"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                    className="faq-content"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <style jsx global>{`
          .faq-content a {
            color: #00afe3;
            text-decoration: none;
          }
          .faq-content a:hover {
            text-decoration: underline;
          }
          .faq-content p {
            margin-bottom: 12px;
          }
          .faq-content p:last-child {
            margin-bottom: 0;
          }
          .faq-content ul {
            margin: 8px 0;
            padding-left: 18px;
            margin-left: 30px;
          }
          .faq-content li {
            margin-bottom: 8px;
          }
          .faq-content strong {
            font-weight: 600;
          }
        `}</style>
      </div>
    </WrapperBGWidth>
  );
};
