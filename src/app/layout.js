import { Inter } from "next/font/google";
// import NoscriptTags from "./component/common/TrackingScripts/NoscriptTags";
// import TrackingScripts from "./component/common/TrackingScripts/TrackingScripts";
import Header from "./component/Header/Header";
import "./globals.css";
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "Localists",
  description: "Localist.com",
  robots: {
    index: false,
    follow: false,
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>
          <div className="w-full">
            <div className="mx-auto w-full max-w-[1536px]">
              <Header />
              {children}
              {/* <TrackingScripts />
              <NoscriptTags /> */}
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
