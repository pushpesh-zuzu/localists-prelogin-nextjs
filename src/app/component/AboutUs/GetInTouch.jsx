import H3 from "../UI/Typography/H3";

const contactMethods = [
    {
        id: 1,
        text: "contact@localists.com",
        href: "mailto:contact@localists.com",
    },
];

const GetInTouchButton = () => {
    return (
        <section
            className="
        flex flex-col items-center text-center
        gap-[32px]
        max-w-[1200px]
        mx-auto
        px-[60px]
        pb-[20px]
        max-md:gap-[25px]
        max-md:mt-[25px]
        max-md:px-[4px]
      "
        >
            <H3
                className="font-bold"
            >
                <span className="text-black">Get </span>
                <span className="text-[#00AFE3]">in touch</span>
            </H3>

            <div
                className="
          flex flex-wrap justify-center
          gap-[94px]
          max-lg:gap-[40px]
          max-md:flex-col
          max-md:gap-[20px]
          max-md:items-center
        "
            >
                {contactMethods.map((method) => (
                    <a
                        key={method.id}
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              flex items-center justify-center gap-[12px]
              bg-[#E3F6FC]
              text-[20px] font-semibold text-[var(--text-color)]
              h-[76.14px]
              px-[48px] py-[20px]
              rounded-[10px]
              transition-all duration-300 ease-in-out
              hover:bg-[#C9E9F5]
              hover:-translate-y-[2px]
              max-md:w-full
              max-sm:max-w-[320px]
              max-sm:text-[16px]
              max-sm:h-auto
              max-sm:px-[16px]
              max-sm:py-[12px]
            "
                    >
                        {/* Mail Icon (SVG) */}
                        <svg
                            className="w-[42px] h-[42px] text-[#00AFE3]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 8l9 6 9-6M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z"
                            />
                        </svg>

                        <span>{method.text}</span>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default GetInTouchButton;
