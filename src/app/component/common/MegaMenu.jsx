"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// Mega Menu Data
const megaMenu = [
  {
    name: "Home & Garden",
    path: "home",
    icon: "/house.svg",
    subcategory: [
      { id: 49, name: "Fence & Gate Installation", path: "fencing-contractors-near-me" },
      { id: 51, name: "Driveway Installation", path: "driveway-installers-near-me" },
      { id: 52, name: "Patio Laying", path: "patio-layers-near-me" },
      { id: 54, name: "Artificial Grass Installation", path: "artificial-grass-installers-near-me" },
      { id: 43, name: "Landscaping", path: "landscape-gardeners-near-me" },
      { id: 44, name: "Tree Surgery", path: "tree-surgeon-near-me" },
      { id: 45, name: "Gutter Cleaning", path: "gutter-cleaning-near-me" },
    ],
  },
  {
    name: "Transport",
    path: "transportation-services",
    icon: "/airport.svg",
    subcategory: [
      { name: "Airport Transfers", path: "airport-transfers-near-me" },
    ],
  },
  {
    name: "Lessons & Training",
    path: "lessons-training",
    icon: "/lessons.svg",
    subcategory: [
      { name: "Physics and Maths", path: "physics-maths-tutors-near-me" },
      { name: "Tutoring", path: "tutors-near-me" },
    ],
  },
];

export default function MegaMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mouseHover, setMouseHover] = useState("");

  const closeTimeoutRef = useRef(null);
  const openTimeoutRef = useRef(null);
  const scrollCloseTimeoutRef = useRef(null);
  const popoverRef = useRef(null);
  const wrapperRef = useRef(null);

  const currentLang = "en";
  const currentCountry = "gb";

  // Check mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close all
  const handleClose = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    if (scrollCloseTimeoutRef.current) clearTimeout(scrollCloseTimeoutRef.current);

    setIsOpen(false);
    setShowSubMenu(false);
    setSelectedCategory(null);
    setMouseHover("");
  }, []);

  // Open menu
  const handleOpen = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    if (scrollCloseTimeoutRef.current) clearTimeout(scrollCloseTimeoutRef.current);
    setIsOpen(true);
  }, []);

  // Mouse enter
  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    if (scrollCloseTimeoutRef.current) clearTimeout(scrollCloseTimeoutRef.current);
    handleOpen();
  }, [handleOpen, isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    closeTimeoutRef.current = setTimeout(() => {
      handleClose();
    }, 2500);
  }, [handleClose, isMobile]);

  const handleSubMenuOpen = useCallback((item) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    if (scrollCloseTimeoutRef.current) clearTimeout(scrollCloseTimeoutRef.current);

    if (item?.subcategory?.length > 0) {
      setShowSubMenu(true);
      setSelectedCategory(item);
    }
  }, []);

  const handleSubMenuMouseEnter = useCallback((item) => {
    if (isMobile) return;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    if (scrollCloseTimeoutRef.current) clearTimeout(scrollCloseTimeoutRef.current);

    openTimeoutRef.current = setTimeout(() => {
      handleSubMenuOpen(item);
    }, 800);
  }, [handleSubMenuOpen, isMobile]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target) &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClose]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 200 || Math.abs(currentScrollY - lastScrollY) > 50) {
        if (scrollCloseTimeoutRef.current) clearTimeout(scrollCloseTimeoutRef.current);
        scrollCloseTimeoutRef.current = setTimeout(() => {
          handleClose();
        }, 2500);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollCloseTimeoutRef.current) clearTimeout(scrollCloseTimeoutRef.current);
    };
  }, [handleClose]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (scrollCloseTimeoutRef.current) clearTimeout(scrollCloseTimeoutRef.current);
    };
  }, []);

  return (
    <div 
      ref={wrapperRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        onClick={() => {
          if (isMobile) {
            setIsOpen(!isOpen);
          }
        }}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute left-0 md:left-auto top-full mt-2 w-screen max-w-[320px] md:max-w-[380px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {!showSubMenu ? (
            <div className="p-4">
              {isMobile && (
                <button
                  type="button"
                  className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 w-6 h-6 flex items-center justify-center"
                  onClick={handleClose}
                  aria-label="Close menu"
                >
                  ×
                </button>
              )}

              <div className="flex items-center justify-between mb-4 pb-3 border-b">
                <h3 className="text-lg font-bold text-gray-900">Services</h3>
              </div>

              <nav>
                {megaMenu.map((item, index) => (
                  <div
                    key={index}
                    className="flex  items-center justify-between py-3 px-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                    onMouseEnter={() => {
                      setMouseHover(index);
                      if (!isMobile) {
                        handleSubMenuMouseEnter(item);
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isMobile) {
                        setMouseHover("");
                      }
                    }}
                    onClick={() => {
                      if (isMobile && item?.subcategory?.length > 0) {
                        handleSubMenuOpen(item);
                      }
                    }}
                  >
                    <Link
                      href={`/${currentLang}/${currentCountry}/${item.path}`}
                      className="flex items-center gap-3 flex-1"
                      onClick={(e) => {
                        if (isMobile && item?.subcategory?.length > 0) {
                          e.preventDefault();
                        } else {
                          handleClose();
                        }
                      }}
                    >
                      <Image 
                        src={item.icon} 
                        alt="" 
                        width={20} 
                        height={20}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">
                        {item.name}
                      </span>
                    </Link>
                    {item?.subcategory?.length > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubMenuOpen(item);
                        }}
                        className="p-1"
                        aria-label={`View ${item.name} submenu`}
                      >
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
                          <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          ) : (
            <div className="p-4">
              <button
                type="button"
                className="flex items-center gap-2 mb-4 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => {
                  setShowSubMenu(false);
                  setSelectedCategory(null);
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Back to Explore
              </button>

              <hr className="mb-4" />

              <div className="mb-4 pb-3 border-b">
                <Link
                  href={`/${currentLang}/${currentCountry}/${selectedCategory?.path}`}
                  className="text-lg font-bold text-gray-900 hover:text-[#00afe3] transition-colors"
                  onClick={handleClose}
                >
                  {selectedCategory?.name}
                </Link>
              </div>

              <nav>
                {selectedCategory?.subcategory?.map((sub, subIndex) => (
                  <Link
                    key={subIndex}
                    href={`/${currentLang}/${currentCountry}/${sub.path}`}
                    className="block py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={handleClose}
                    onMouseEnter={() => {
                      if (!isMobile) {
                        setMouseHover(subIndex);
                        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                        if (scrollCloseTimeoutRef.current) clearTimeout(scrollCloseTimeoutRef.current);
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isMobile) {
                        setMouseHover("");
                        handleMouseLeave();
                      }
                    }}
                  >
                    <span className="text-sm font-bold text-gray-700 hover:text-gray-900">
                      {sub.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}