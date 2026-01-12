import Breadcrumb from "../../common/BreadCrum/BreadCrum";
import H2 from "../../UI/Typography/H2";
import Paragraph2 from "../../UI/Typography/Paragraph2";

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
    px-[88px] pt-[40px] pb-[40px]
    max-[768px]:px-[30px]
    max-[500px]:px-[20px] max-[500px]:pt-[20px] max-[500px]:pb-[15px]
  "
        >
            {/* <Breadcrumb
                breadcrumb={breadcrumb}
            /> */}
            <div className="
      flex flex-col gap-[20px]
      py-[0px]
      max-w-[1200px] mx-auto
      max-[500px]:gap-[25px] max-[500px]:py-[10px]
    ">
                <h2 className="font-Inter font-black
        tracking-[-0.03em]
        text-[30px] leading-[33px]
        md:text-[35px] md:leading-[35px]
        lg:text-[50px] lg:leading-[55px]">
                    Find the best
                    <span className="text-[#00AFE3]"> {title.toLowerCase()}{isNeedS ? "s" : ""} </span>
                    {findAccountTitle2 || ''} in your area
                </h2>
                <div className="flex flex-col gap-[13px]">
                    <Paragraph2 className="text-black">
                        {para1}
                    </Paragraph2>
                    <Paragraph2 className="text-black">
                        {para2}
                    </Paragraph2>
                    <Paragraph2 className="text-black">
                        {para3}
                    </Paragraph2>
                    <Paragraph2 className="text-black">
                        {para4}
                    </Paragraph2>
                </div>
            </div>
        </div>
    );
};

export default AccountFindingInfo;
