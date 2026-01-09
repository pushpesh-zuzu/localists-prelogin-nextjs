import { MapPin, Star, Phone, Mail } from "lucide-react";
import GalleryIcon from "../common/icons/NearMe/GalleryIcon";
import H5 from "../UI/Typography/H5";
import Button1 from "../UI/Typography/Button1";

export default function FeatureCard({ featured = false }) {
  return (
    <div
      className={`relative w-full z-50 rounded-[30px] bg-white p-5   ${
        featured
          ? "border-[#10C87B] ring-2 ring-[#10C87B] border-5 mt-[84px] rounded-tl-none"
          : ""
      }`}
    >
      {featured && (
        <div
          className="absolute z-40 -top-10 -left-[7px] rounded-tl-[20px] rounded-tr-[20px] font-[Arial] font-bold  // ✅ top position adjust किया
          tracking-[-0.03em]
          text-base
          md:text-[16px]
          lg:text-[18px] bg-[#10C87B] text-white px-8 py-1.5 md:px-4.5 lg:px-8"
        >
          FEATURED
        </div>
      )}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* LEFT */}
        <div className="flex items-start gap-4">
          <GalleryIcon className="h-6 w-6" />

          <div>
            <H5>D.Roberts & Son</H5>

            <div className="flex items-center gap-2 text-sm">
              <div className="flex text-emerald-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={24} fill="currentColor" />
                ))}
              </div>
              <span className="text-[20px] tracking-[-0.03em] font-[Arial] text-[#253238]">
                36 Reviews
              </span>
            </div>

            <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
              <MapPin size={24} className="text-emerald-500" />
              <span className="text-[20px] tracking-[-0.03em] font-[Arial] text-[#253238]">
                Chester
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-6 md:gap-y-0 md:flex-row gap-x-6">
        <div className="mt-4 flex  items-center flex-wrap gap-[13px]">
          {[
            "Tree Surgery",
            "Crown Reduction",
            "Crown Thinning",
            "Tree Felling",
            "Tree Pruning",
            "Stump Grinding",
            "Emergency Tree Surgeon Service",
          ].map((service) => (
            <span
              key={service}
              className="tracking-[-0.03em] font-[Arial] rounded-full border-[2.5px] h-fit border-[#B9B9C2] px-2 py-1 text-base text-[#B9B9C2]"
            >
              {service}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-3 min-w-fit">
          <Button1
            variant="darkoutlinedPrimary"
            className="flex items-center justify-center gap-2"
          >
            <Mail size={24} /> Request a quote
          </Button1>
          <Button1 className="flex items-center justify-center gap-2">
            <Phone color="white" size={24} /> Show phone number
          </Button1>
        </div>
      </div>
    </div>
  );
}
