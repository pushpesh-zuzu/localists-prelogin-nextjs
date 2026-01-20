
const FindDetail = ({ paragraphs = [] }) => {
  return (
    <div
      className="
        bg-[url('/assets/Images/subcategory/accountantInfoBackground.png')]
        bg-cover bg-center bg-no-repeat
        px-[88px] pt-[27px] pb-[18px]
        max-[768px]:px-[20px]
        max-[500px]:px-[31px]
        max-[431px]:px-[22px]
        max-[413px]:px-[23px]
        max-[376px]:px-[11px]
        max-[320px]:px-[30px]
      "
    >

      {/* Content */}
      <div
        className="
          flex flex-col items-center justify-center
          gap-[20px]
          py-[30px]
          max-w-[1050px]
          mx-auto
          max-[768px]:px-[4px]
          max-[500px]:gap-[25px] max-[500px]:py-[20px]
        "
      >
        <div className="flex flex-col gap-[13px]">
          {paragraphs.map((para, index) => (
            <p
              key={index}
              className="
                text-center text-[18px] leading-[32px] font-normal
                text-[#00afe3]
                max-[500px]:text-[16px] max-[500px]:leading-[25px]
              "
              dangerouslySetInnerHTML={{ __html: para }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindDetail;
