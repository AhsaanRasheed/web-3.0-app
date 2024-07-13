"use client";
import React from "react";
import "./globals.css";
import "./new_global.css";

import Sidebar from "./_components/Sidebar";
import { Inter, Roboto } from "next/font/google";
import StoreProvider from "@/app/Store/storeProvider.js";
import ChatBot from "./_components/ChatBot";
// import CaptchaGame from "./game/page";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { NotificationProvider } from "./_components/global/Notification/notificationContext";
import { LoaderProvider } from "./_components/global/Loader/loaderContext";
import NotificationDisplay from "./_components/global/Notification/NotificationDisplay";
import Loader from "./_components/global/Loader";
import secureLocalStorage from "react-secure-storage";
import NewSideBar from "./_components/NewSideBar/NewSideBar";
import localFont from "next/font/local";
import SignOutModal from "./_components/SignOutModal/SignOutModal";

const inter = Inter({ subsets: ["latin"], variable: "--Inter" });
const roboto = Roboto({
  weight: ["400", "500", "700"], // add the weights you need
  subsets: ["latin"],
  variable: "--Roboto",
});

// export const metadata = {
//   title: "white label app",
//   description: "white label app",
// };
const Gilroy = localFont({
  src: [{ path: "../public/fonts/gilroy/Gilroy-Regular.ttf" }],
  variable: "--Gilroy",
});
const GilroyMed = localFont({
  src: [{ path: "../public/fonts/gilroy/Gilroy-Medium.ttf" }],
  variable: "--GilroyMed",
});
const GilroySemiBold = localFont({
  src: [{ path: "../public/fonts/gilroy/Gilroy-SemiBold.ttf" }],
  variable: "--GilroySemiBold",
});
const GilroyLight = localFont({
  src: [{ path: "../public/fonts/gilroy/Gilroy-Light.ttf" }],
  variable: "--GilroyLight",
});
const GilroyBold = localFont({
  src: [{ path: "../public/fonts/gilroy/Gilroy-Bold.ttf" }],
  variable: "--GilroyBold",
});

export default function RootLayout({ children }) {
  if (secureLocalStorage.getItem("gameCaptcha") == false) {
    return (
      <StoreProvider>
        <html>
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap"
            rel="stylesheet"
          /> */}
          <body className={inter.className}>
            <GoogleReCaptchaProvider reCaptchaKey="6LeVzSopAAAAAIlg5Fv1KD5TtxZ0CrWh5blr7Jvr">
              {/* <CaptchaGame /> */}
            </GoogleReCaptchaProvider>
          </body>
        </html>
      </StoreProvider>
    );
  }
  return (
    <StoreProvider>
      <html>
        <body
          className={`${inter.variable} ${Gilroy.variable} ${GilroyMed.variable}  ${GilroySemiBold.variable} ${GilroyLight.variable} ${GilroyBold.variable} ${roboto.variable}`}
        >
          <NotificationProvider>
            <LoaderProvider>
              <div className="flex-container">
                <div id="sidebar">
                  {/* <Sidebar /> */}
                  <NewSideBar />
                </div>

                <div id="main-container" className="section-container">
                  {children}
                </div>
                {/* {<ChatBot />} */}
              </div>
              <Loader />
              {/* <SignOut */}
              {/* <SignOutModal showModal={true}  /> */}

              <NotificationDisplay />
            </LoaderProvider>
          </NotificationProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
