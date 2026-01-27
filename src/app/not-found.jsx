import Image from "next/image";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        className="
          w-full
          flex items-center justify-center
          pt-[80px] pb-[80px]
          overflow-x-hidden
        " >
        <Image
          src="/images/FourZeroFour/404.webp"
          alt="page not found"
          width={707}
          height={496}
          draggable={false}
          sizes="(max-width: 768px) 80vw, 707px"
          className="
            w-full h-auto
            max-w-[707px] max-h-[496.23px]
            object-contain
            select-none
            max-[768px]:w-[80%]
          "
        />
      </main>

      <Footer />
    </>
  );
}
