"use client";

import H1 from "../../UI/Typography/H1";

const BannerWrapper = ({ image, children, headingText = "" }) => {
    return (
        <div className="w-full flex flex-col items-center">
            <div
                className="
          w-full
          relative
          flex flex-col
          items-center
          justify-center
          bg-cover bg-center bg-no-repeat
          px-[49px]
          h-[clamp(250px,40vw,500px)]
          md:px-[49px]
          max-md:px-0
        "
                style={{ backgroundImage: `url(${image})` }}
            >
                {headingText && (
                    <H1
                        className="
              relative z-[1]
              text-white
              text-center
              px-[20px]
            "
                    >
                        {headingText}
                    </H1>
                )}

                {children && (
                    <div className="w-[72%] max-md:w-[92%]">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BannerWrapper;
