import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import H2 from "../../UI/Typography/H2";
import Button from "../../UI/Typography/Button";

const ClonePopularCategories = ({ data }) => {

    const params = useParams();
    const currentLang = params?.lang || "en";
    const currentCountry = params?.country || "gb";

    return (
        <div
            className="
         flex flex-col items-center justify-center
    text-center
    gap-[10px]
    px-[5%] pt-[40px] pb-[6px]

    max-[880px]:px-[40px]
    max-[880px]:pt-[30px]
    max-[880px]:pb-[2px]

    max-[520px]:px-[20px]
    max-[520px]:pt-[20px]
    max-[520px]:pb-[6px]
      "
        >
            <H2 className="md:mb-2 lg:mb-3">
                Popular{" "}
                <span className="text-[#00afe3]">
                    Categories
                </span>
            </H2>

            <div
                className="
          w-full grid grid-cols-3
          gap-[7.71px]
          justify-center
          max-[880px]:grid-cols-2
          max-[520px]:grid-cols-1
        "
            >
                {data?.map((row, index) => (
                    <div key={index} className="flex justify-center">
                        <div
                            className="
                relative w-full
                flex flex-col
                gap-[8px]
                p-[10px] pb-[42px]
                transition-all duration-300
                hover:bg-[#f9f9fa]
                 rounded-tl-[39.97px] rounded-tr-[39.97px]
                hover:rounded-tl-[39.97px] hover:rounded-tr-[39.97px]
                max-[520px]:pb-[22px]
              " >
                            {row.path ? (
                                <Link
                                    href={""
                                        // `/${currentLang}/${currentCountry}/${row.path}`
                                    }
                                >
                                    <Image
                                        src={row.image}
                                        alt={row.title}
                                        className="w-full object-cover rounded-tl-[20px] rounded-tr-[20px]"
                                        width={400}
                                        height={260}
                                    />
                                </Link>
                            ) : (
                                <Image
                                    src={row.image}
                                    alt={row.title}
                                    className="w-full object-cover rounded-tl-[20px] rounded-tr-[20px] max-[520px]:h-[230px]"
                                    width={400}
                                    height={260}
                                />
                            )}

                            {row?.availableOnline && (
                                <span
                                    className="
                    absolute top-[9px] left-[8px]
                    w-fit
                    px-[21px] py-[7px]
                    text-[12.72px]
                    rounded-full
                    text-white
                    bg-[#00afe3]
                    hover:bg-[#0096c4]
                    max-[880px]:text-[11.72px]
                    max-[880px]:px-[12px] max-[880px]:py-[5px]
                  " >
                                    Available Online
                                </span>
                            )}

                            {row.path ? (
                                <Link
                                    href={""
                                        // `/${currentLang}/${currentCountry}/${row.path}`
                                    }
                                    className="
                    w-full text-center
                    text-white
                    font-extrabold text-[20px]
                    py-[10px]
                    rounded-[4.5px]
                    leading-[30px]
                    bg-[#00afe3]
                    hover:bg-[#0096c4]
                    max-[880px]:text-[15px] max-[880px]:py-[8px]
                    max-[520px]:text-[14px]
                  "
                                >
                                    {row.title}
                                </Link>
                            ) : (
                                <Button className="bg-[#00afe3] hover:bg-[#0096c4] px-4.5 py-1 md:px-9 md:py-2 xl:py-3.5 xl:px-[66px] cursor-pointer text-white rounded-[4.5px]">
                                    {row.title}
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClonePopularCategories;