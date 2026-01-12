import Breadcrumb from "../../common/BreadCrum/BreadCrum";
import H2 from "../../UI/Typography/H2";
import Paragraph1 from "../../UI/Typography/Paragraph1";

const AccountFindingInfo = ({
    title = "Accountant",
    findingHeading = "Accounting",
    breadcrumb,
    service = false,
    para1,
    para2,
    para3,
    para4,
    isNeedS = true,
    findAccountTitle2
}) => {
    return (
        <div className="
    bg-cover bg-center bg-no-repeat
    px-[88px] pt-[27px] pb-[18px]
    max-[768px]:px-[30px]
    max-[500px]:px-[20px] max-[500px]:pt-[20px] max-[500px]:pb-[15px]
  "
        >
            {/* <Breadcrumb
                breadcrumb={breadcrumb}
            /> */}
            <div className="
      flex flex-col gap-[20px]
      py-[30px]
      max-w-[1200px] mx-auto
      max-[500px]:gap-[25px] max-[500px]:py-[20px]
    ">
                <H2 className="text-left">
                    Find the best
                    <span className="text-[#00AFE3]"> {title.toLowerCase()}{isNeedS ? "s" : ""} </span>
                    {findAccountTitle2 || ''} in your area
                </H2>
                <div className="flex flex-col gap-[13px]">
                    <Paragraph1 className="text-black">
                        {para1}
                    </Paragraph1>
                    <Paragraph1 className="text-black">
                        {para2}
                    </Paragraph1>
                    <Paragraph1>{para3}</Paragraph1>
                    <Paragraph1>{para4}</Paragraph1>
                </div>
            </div>
        </div>
    );
};

export default AccountFindingInfo;
