import type { Metadata } from "next";
import localFont from "next/font/local"

import getlanguage from "@/commonTsServer/getLanguage";
import "./globals.css";

import { StoreProvider } from "./StoreProvider";
import Navbar from "./navbar/Navbar"
import GlobalAlert from "./GlobalAlert";
import dictionary from "./dictionary.json"
import getTheme from "@/commonTsServer/getTheme";


const myVazirFont =  localFont({src:"../public/Vazirmatn.ttf"})
const  myPoppinsFont =  localFont({src:"../public/Poppins-Regular.ttf"})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const language =  getlanguage()
  const lang = language.lang
  const direction =  language.dir

  const theme = getTheme()

  const title = dictionary.WebSiteName[lang]  
  const description = dictionary.WebSiteDis[lang]

  const metadata: Metadata = {
    title,
    description,
  };

  return (
    <StoreProvider >
      <html lang={lang}  dir={direction}  data-theme={theme} className=" h-screen  mx-auto ">
        <body className={(direction ==="ltr" ?   myPoppinsFont.className  : (myVazirFont.className +" w-[99vw] "))  +  " w-full h-full pt-14 sm:pb-0  pb-8  bg-base-100" } >
          <GlobalAlert />
          <Navbar />
          <div className="h-full w-full overflow-auto">
          {children}

          </div>
        </body>
      </html>
    </StoreProvider>

  );
}