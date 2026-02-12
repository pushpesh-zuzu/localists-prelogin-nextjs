// import businessProfessionals from "../../public/icons/BusinessProfessionals.svg";

// import WhatYouNeedIcon from "../../public/icons/WhatYouNeedIcon.png";
// import FreeQuotesIcon from "../../public/icons/FreeQuotesIcon.png";
// import BusinessProfessionalsIcon from "../../public/icons/BusinessProfessionalsIcon.png";
import SearchUserIcon from "../../public/ReactIcons/SearchUserIcon";
import CheckDocumentIcon from "../../public/ReactIcons/CheckDocumentIcon";
import SecureHandshakeIcon from "../../public/ReactIcons/SecureHandshakeIcon";

import {
  ArtificialGrassSlider,
  DrivewayInstallationSlider,
  FenceAndGateInsallationSlider,
  GutterCleanerSlider,
  LandscapingSlider,
  PatioServicesSlider,
  TreeSurgeonSlider,
  RoofingSlider, PainterAndDecoratorSlider
} from "@/app/component/level3/imagesServices";

// const CATEGORIES = [
//   {
//     title: "Business Professionals",
//     image: businessProfessionals,
//   },
// ];

const HowItWorksData = {
  // Business category data
  business: [
    {
      id: 1,
      title: "the Best Match",
      // image: WhatYouNeedIcon,
      icon: SearchUserIcon,
      heading1: "Find ",
      heading2: "the Best Match",
      description:
        "We will help you find quality Business Professionals in your local area. Let us know your requirements, and Localists will match you with the best service provider to help you.",
    },
    {
      id: 2,
      title: "Free Quotes",
      // image: FreeQuotesIcon,
      icon: CheckDocumentIcon,
      heading1: "Request ",
      heading2: "Free Quotes",
      description:
        "We will send you quotes from local Business Professionals for free. You can then compare profiles from Business Professionals near you, read verified reviews, see what makes them stand out, and pick the best Business Professional for you.",
    },
    {
      id: 3,
      title: "Business Professional",
      // image: BusinessProfessionalsIcon,
      icon: SecureHandshakeIcon,
      heading1: "Work With Your ",
      heading2: "Business Professional",
      description:
        "Once you've found the right Business Professional, you can contact them straight away. Discuss your project, ask questions, and get things moving with confidence.",
    },
  ],

  // Home category data
  home: [
    {
      id: 1,
      title: "the Best Match",
      icon: SearchUserIcon,
      heading1: "Find the ",
      heading2: "best match",
      break: true,

      description:
        "We’ll help you find quality Home & Garden professionals in your local area. Just let us know your requirements, and Localists will match you with the best service providers to help you",
    },
    {
      id: 2,
      title: "Free Quotes",
      icon: CheckDocumentIcon,
      heading1: "Request ",
      heading2: "free quotes",
      break: true,

      description:
        "We’ll send you free quotes from local Home & Garden professionals. Compare profiles, read verified reviews, see what makes each provider stand out, and choose the right one for you.",
    },
    {
      id: 3,
      title: "Home & Garden Professional",
      // image: BusinessProfessionalsIcon, // Same icon as business
      icon: SecureHandshakeIcon,
      heading1: "Work with your ",
      heading2: "home & garden ",
      heading3: "professional",
      break: false,
      description:
        "Once you’ve found the right professional, you can contact them straight away. Discuss your project, ask questions, and move forward with confidence.",
    },
  ],
};

const PopularCategoriesData = [
  {
    id: 1,
    title: "Fence & Gate Installation",
    image: FenceAndGateInsallationSlider,
    path: "fencing-contractors-near-me",
  },
  {
    id: 2,
    title: "Driveway Installation",
    path: "driveway-installers-near-me",
    image: DrivewayInstallationSlider,
  },

  {
    id: 3,
    title: "Patio Laying",
    image: PatioServicesSlider,
    path: "patio-layers-near-me",
  },
  {
    id: 4,
    title: "Landscaping",
    path: "landscape-gardeners-near-me",

    image: LandscapingSlider,
  },
  {
    id: 5,
    title: "Artificial Grass Installation",
    path: "artificial-grass-installers-near-me",

    image: ArtificialGrassSlider,
  },
  {
    id: 6,
    title: "Tree Surgery",
    image: TreeSurgeonSlider,
    path: "tree-surgeon-near-me",
  },
  {
    id: 7,
    title: "Gutter Cleaning",
    image: GutterCleanerSlider,
    path: "gutter-cleaning-near-me",
  },
  {
    id: 8,
    title: "Roofing",
    image: RoofingSlider,
    path: "roofers-near-me",
  },
  {
    id: 9,
    title: "Painter and Decorator",
    image: PainterAndDecoratorSlider,
    path: "painter-and-decorator-near-me",
  },
];


export {
  // CATEGORIES,
  HowItWorksData,
  PopularCategoriesData,
};