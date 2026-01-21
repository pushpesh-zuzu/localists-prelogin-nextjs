import PropTypes from "prop-types";

const LandingHowItWorkSteps = ({ step }) => {
    const Icon = step.icon;
    return (
        <div
            className="
        relative bg-white text-center
        w-[300px] h-[250px]
        px-[25px]
        rounded-[20px]

        max-[1100px]:h-[236px]
        max-[920px]:h-[206px] max-[920px]:px-[20px]

        max-[667px]:w-[80%] max-[667px]:h-auto
        max-[667px]:px-[16px] max-[667px]:py-[20px]

        max-[468px]:w-[78%]
        max-[390px]:w-[70%]
      "
        >
            {/* Icon */}
            <div
                className="
          w-[133px] h-[133px]
          rounded-full bg-[#111637]
          flex items-center justify-center
          mx-auto mt-[-70px]

          max-[1100px]:w-[110px] max-[1100px]:h-[110px] max-[1100px]:mt-[-60px]
          max-[920px]:w-[82px] max-[920px]:h-[82px] max-[920px]:mt-[-50px]

          max-[667px]:w-[64.46px] max-[667px]:h-[64.46px]
          max-[667px]:bg-black max-[667px]:mt-[-50px]

          max-[390px]:w-[56.46px] max-[390px]:h-[56.46px] max-[390px]:top-[-4px]
        "
            >
                <Icon
                    className="
          [&_*]:stroke-white        
        w-[80%] h-[80%]

            max-[667px]:w-[60px] max-[667px]:h-[60px]
            max-[390px]:w-[55px] max-[390px]:h-[55px]
          "/>
            </div>

            {/* Description */}
            <h3
                className="
          mt-[35px]
           font-Inter font-black
          text-[#253238]
          font-semibold
          text-[1.3rem] leading-[32px]
          max-[920px]:text-[18px] max-[920px]:leading-[27px]
          max-[667px]:mt-[10px]
          max-[667px]:text-[16px] max-[667px]:leading-[22px]
          max-[667px]:text-center
          max-[390px]:text-[14px]
        ">
                {step.description}
            </h3>
        </div>
    );
};

LandingHowItWorkSteps.propTypes = {
    step: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};

export default LandingHowItWorkSteps;
