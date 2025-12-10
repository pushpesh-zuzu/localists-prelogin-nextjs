"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CountryDropdown from "./CountryDropdown";

const Footer = () => {
  const [openSections, setOpenSections] = useState({
    customers: false,
    professionals: false,
    about: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="family-55 md:block w-full pt-[26px] sm:px-[46px] xl:px-[120px] md:pt-[70.29px] bg-[#f7f7f7] text-gray-800">
      <div className=" mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-[1.25fr_1fr_1fr_1fr_1fr] gap-8 lg:gap-12">
          {/* Logo and Description - Always visible */}
          <div className="lg:col-span-1 text-center md:text-left flex flex-col items-center md:items-start">
            <Image
              src="/logodesktop.svg"
              alt="Localists - Local Service Provider Directory"
              width={168}
              height={38}
              className="mb-[16.66px] w-[168px] h-[41px] md:w-[89px] md:h-6 lg:w-[156px] lg:h-[39px]"
              priority
              fetchPriority="high"
              loading="eager"
            />

            <p className="hidden md:block text-[rgba(37, 50, 56, 1)] text-[12px]  lg:text-base mb-6 leading-relaxed">
              Localists is the world’s fastest-growing marketplace, and we have
              no intention of slowing down any time soon.
            </p>

            <div className="space-y-2">
              <p className="font-bold text-gray-900 text-[20px] md:text-[10px] xl:text-lg">
                Need Help?
              </p>
              <Link href="/contact-us">
                <button className="bg-[#00afe3] hover:bg-[#0096c4] text-white px-6 py-2 rounded-sm shadow-[0px_0px_3.96px_0px_#0000001A] text-base font-bold md:text-xs xl:text-sm  transition-colors duration-200 shadow-sm">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <h4 className="font-bold text-[rgba(37, 50, 56, 1)] mb-3.5 sm:text-[10px] xl:text-[20px]">
              For Customers
            </h4>
            <ul className="space-y-3 sm:text-[9px] xl:text-[17px]">
              <li>
                <Link
                  href="/"
                  className="text-[rgba(37, 50, 56, 1)] font-normal text-[18px] hover:text-[#00afe3]  transition-colors duration-200 block "
                >
                  Find a Professional
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works-for-customers"
                  className="text-[rgba(37, 50, 56, 1)] font-normal text-[18px] hover:text-[#00afe3]  transition-colors duration-200 block "
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-[rgba(37, 50, 56, 1)] font-normal text-[18px] hover:text-[#00afe3]  transition-colors duration-200 block"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden md:block">
            <h4 className="font-bold text-[rgba(37, 50, 56, 1)] mb-3.5 sm:text-[10px] xl:text-[20px]">
              For Professionals
            </h4>
            <ul className="space-y-3 sm:text-[9px] xl:text-[17px]">
              <li>
                <Link
                  href="/how-it-works-for-sellers"
                  className="text-[rgba(37, 50, 56, 1)] font-normal text-[18px] hover:text-[#00afe3]  transition-colors duration-200 block "
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/sellers/pricing"
                  className="text-[rgba(37, 50, 56, 1)] font-normal text-[18px] hover:text-[#00afe3]  transition-colors duration-200 block "
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/sellers/create"
                  className="text-[rgba(37, 50, 56, 1)] font-normal text-[18px] hover:text-[#00afe3]  transition-colors duration-200 block "
                >
                  Join as a Professional
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden md:block">
            <h4 className="font-bold text-[rgba(37, 50, 56, 1)] mb-3.5 sm:text-[10px] xl:text-[20px]">
              About
            </h4>
            <ul className="space-y-3 sm:text-[9px] xl:text-[17px]">
              <li>
                <Link
                  href="/about-us"
                  className="text-[rgba(37, 50, 56, 1)] font-normal text-[18px] hover:text-[#00afe3]  transition-colors duration-200 block "
                >
                  About Localists
                </Link>
              </li>
            </ul>
          </div>

          {/* Social and Country Selector */}
          <div className="hidden md:flex flex-col items-center gap-4">
            {/* 3 Icons Row - 35x35 each */}
            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Facebook page"
                className="block w-[35px] h-[35px]"
              >
                <Image
                  src={'/facebook.svg'}
                  alt="Facebook Icon"
                  width={35}
                  height={35}
                  className="rounded-full object-cover"
                  priority
                />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Instagram page"
                className="block w-[35px] h-[35px]"
              >
                <Image
                  src={'/Xsocialicon.png'}
                  alt="Xsocialicon.png"
                  width={35}
                  height={35}
                  className="rounded-full object-cover"
                  priority
                />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn page"
                className="block w-[35px] h-[35px]"
              >
                <Image
                  src={'/linkedinsocialicon.png'}
                  alt="LinkedIn Icon"
                  width={35}
                  height={35}
                  className="rounded-full object-cover"
                  priority
                />
              </a>
            </div>

            <CountryDropdown />
          </div>

          {/* Mobile Accordion */}
          <div className="block md:hidden col-span-full space-y-4 px-2">
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection("customers")}
                className="px-4 flex justify-between items-center w-full text-left font-bold text-gray-900 text-lg"
              >
                For Customers
                <span className="text-[#00afe3] text-xs">
                  {openSections.customers ? "▲" : "▼"}
                </span>
              </button>
              {openSections.customers && (
                <div className="mt-3 space-y-2 pl-4">
                  <Link
                    href="/"
                    className="text-[rgba(37, 50, 56, 1)] hover:text-[#00afe3] block py-1"
                  >
                    Find a Professional
                  </Link>
                  <Link
                    href="/how-it-works-for-customers"
                    className="text-[rgba(37, 50, 56, 1)] hover:text-[#00afe3] block py-1"
                  >
                    How it works
                  </Link>
                  <Link
                    href="/login"
                    className="text-[rgba(37, 50, 56, 1)] hover:text-[#00afe3] block py-1"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            <div className="px-4 border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection("professionals")}
                className="flex justify-between items-center w-full text-left font-bold text-gray-900 text-lg"
              >
                For Professionals
                <span className="text-[#00afe3] text-xs">
                  {openSections.customers ? "▲" : "▼"}
                </span>
              </button>
              {openSections.professionals && (
                <div className="mt-3 space-y-2 pl-4">
                  <Link
                    href="/how-it-works-for-sellers"
                    className="text-[rgba(37, 50, 56, 1)] hover:text-[#00afe3] block py-1"
                  >
                    How it works
                  </Link>
                  <Link
                    href="/sellers/pricing"
                    className="text-[rgba(37, 50, 56, 1)] hover:text-[#00afe3] block py-1"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/sellers/create"
                    className="text-[rgba(37, 50, 56, 1)] hover:text-[#00afe3] block py-1"
                  >
                    Join as a Professional
                  </Link>
                </div>
              )}
            </div>

            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection("about")}
                className="px-4 flex justify-between items-center w-full text-left font-bold text-gray-900 text-lg"
              >
                About
                <span className="text-[#00afe3] text-xs">
                  {openSections.customers ? "▲" : "▼"}
                </span>
              </button>
              {openSections.about && (
                <div className="mt-3 space-y-2 pl-4">
                  <Link
                    href="/about-us"
                    className="text-[rgba(37, 50, 56, 1)] hover:text-[#00afe3] block py-1"
                  >
                    About Localists
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 w-full border-t border-gray-300">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          
            <div className="flex mx-auto items-center gap-2 text-[rgba(37, 50, 56, 1)] text-sm lg:text-base py-[11px]">
                <Image
              src="/icons/emailIcon.svg"
              alt="email icon"
              width={16}
              height={16}
              className="w-4 h-4"
              priority
              fetchPriority="high"
              loading="eager"
            /><span>contact@localists.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 border-t border-gray-200">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
            <p className="mx-auto text-[rgba(37, 50, 56, 1)] text-xs lg:text-[12px]">
              © 2025 Localists. Terms & Conditions / Cookie policy /{" "}
              <Link
                href="/privacy-policy"
                className="text-black hover:underline"
              >
                Privacy policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
