import FindDetail from "./FindDetail";
import SearchPostAndBanner from "./SearchPostAndBanner";

const FindDetailAndBannerWrapper = ({
  title,
  bannerImage,
  paragraphs,
  defaultService,
  cancelHeading,
  cancelPara,
  serviceId,
  welcomModalTitle,
  welcomModalButtonText,
}) => {
  return (
    <>
      {/* Banner Section */}
      <div
        className="
          relative flex items-center justify-center text-white
          h-[539px]
          bg-cover bg-center bg-no-repeat
          max-[980px]:h-[500px] max-[980px]:px-[100px]
          max-[768px]:h-[440px] max-[768px]:px-[30px]
          max-[500px]:px-[10px]
        "
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <SearchPostAndBanner
          serviceId={serviceId}
          defaultService={defaultService}
          title={title}
          cancelHeading={cancelHeading}
          cancelPara={cancelPara}
          welcomModalTitle={welcomModalTitle}
          welcomModalButtonText={welcomModalButtonText}
        />
      </div>

      {/* Detail Section */}
      <div>
        <FindDetail paragraphs={paragraphs} />
      </div>
    </>
  );
};

export default FindDetailAndBannerWrapper;
