"use client"


import {
  AirportTransfers,
  // BusinessProfessionalsIcon,
  // FreeQuotesIcon,
  // WhatYouNeedIcon,
} from "@/app/component/level1/images";

import SearchUserIcon from "../../public/ReactIcons/SearchUserIcon";
import CheckDocumentIcon from "../../public/ReactIcons/CheckDocumentIcon";
import SecureHandshakeIcon from "../../public/ReactIcons/SecureHandshakeIcon";

const TransportHowItWork = [
  {
    id: 1,
    title: "the Best Match",
    icon: SearchUserIcon,
    heading1: "Find the ",
    heading2: "best match",
    description:
      "We’ll help you find quality transportation services in your local area. Just share your requirements, and Localists will match you with trusted drivers and companies.",
  },
  {
    id: 2,
    title: "Free Quotes",
    icon: CheckDocumentIcon,
    heading1: "Request ",
    heading2: "free quotes",
    description:
      "Get free quotes from local transport professionals. Compare profiles, check reviews, and see what makes each provider stand out before making your choice.",
  },
  {
    id: 3,
    title: "Book your ",
    icon: SecureHandshakeIcon,
    heading1: "Book your ",
    heading2: "transport service ",
    description:
      "Once you’ve found the right transport provider, contact them directly to discuss your journey, confirm the details, and book with confidence.",
  },
];
const TransportPopularCategory = [
  {
    id: 1,
    title: "Airport Transfers",
    image: AirportTransfers,
    path: "",
  },
];
export { TransportHowItWork, TransportPopularCategory };
