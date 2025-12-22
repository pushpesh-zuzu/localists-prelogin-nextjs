import { Inter } from "next/font/google";
// import NoscriptTags from "./component/common/TrackingScripts/NoscriptTags";
// import TrackingScripts from "./component/common/TrackingScripts/TrackingScripts";
import Header from "./component/Header/Header";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Localists",
  description: "Localist.com",
  icons: {
    icon: "/favicon.ico",
  },
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
          <Header />
          {children}
          {/* <TrackingScripts />
              <NoscriptTags /> */}
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
