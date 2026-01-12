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
      <div className="w-full px-2.5 lg:px-0 max-w-[1200px] mx-auto">
        <NearmeH2Heading headdingblue="FAQ" className="mb-10" />

        <div className="space-y-0 border-2 md:border-4 border-[#DBDFE4] rounded-[30px] overflow-hidden bg-white shadow-sm">
          {data.map((item, index) => (
            <div
              key={item.key}
              className={`${index !== 0 ? "border-t-2 md:border-t-4 border-[#DBDFE4]" : ""}`}
            >
              <button
                onClick={() => toggleItem(item.key)}
                className="w-full flex items-center justify-between px-[30px] pb-[20px] pt-[30px] md:px-5 md:pb-[30px] md:pt-5 hover:bg-gray-50 transition-colors duration-200 text-left"
                aria-expanded={openItem === item.key}
              >
                <h5
                    className={`
                      flex-1
                      text-[20px] leading-[25px]
                      md:text-[25px] md:leading-[25px]
                      lg:text-[25px] lg:leading-[25px]
                      font-Inter font-black
                      tracking-[-0.03em]
                    `}
                    >
                      {item.title}
                    </h5>

                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  {openItem === item.key ? (
                    <svg
                      width="32"
                      height="32"
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
                      width="32"
                      height="32"
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
                <div className="px-[30px] pb-[30px] md:px-[20px] md:pb-[30px]">
                  <p
                    bold="font-normal"
                    variant="secondary"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                    className={`font-[Arial] faq-content text-[16px] 
                            md:text-[16px] md:leading-[16px]
                            lg:text-[20px] lg:leading-[24px] tracking-[-0.03em] font-normal`}
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
