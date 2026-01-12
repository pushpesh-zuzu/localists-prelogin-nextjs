"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import H2 from "../../UI/Typography/H2";
import Paragraph1 from "../../UI/Typography/Paragraph1";


const AllServiceLevel1 = ({ data }) => {
    const params = useParams();
    const currentLang = params?.lang || "en";
    const currentCountry = params?.country || "gb";


    return (
        <div
            className="
        flex flex-col
        px-[5%] pb-[16px]
        max-[768px]:pb-[10px]
        max-[480px]:px-[20px] max-[480px]:pb-0
      " >
            <H2
                className="text-left mb-[22.53px]" >
                All{" "}
                <span className="text-[#00afe3]">
                    Services
                </span>
            </H2>

            <div
                className="
          flex flex-col gap-[21px]
          mb-[50px]
          last:mb-[4px]
          max-[768px]:mb-[30px]
          max-[480px]:mb-[26px]
        "
            >
                <div
                    className="
            flex flex-wrap
            gap-[10px]
          "
                >
                    {data?.map(({ name, path }, idx) => {
                        // const servicePath = `/${currentLang}/${currentCountry}${path}`;

                        return path ? (
                            <Link
                                key={idx}
                                href={
                                    "" // servicePath
                                }
                                className="
                  bg-[#e3f6fc]
                  px-[19px] py-[12px]
                  rounded-full
                  text-center
                  text-black
                  cursor-pointer
                " >
                               <Paragraph1>{name}</Paragraph1>
                            </Link>
                        ) : (
                            <Paragraph1
                                key={idx}
                                className="
                  bg-[#e3f6fc]
                  px-[19px] py-[12px]
                  rounded-full
                  text-center
                  text-black
                  cursor-pointer
                " >
                                {name}
                            </Paragraph1>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AllServiceLevel1