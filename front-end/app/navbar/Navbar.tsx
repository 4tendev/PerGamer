import React from "react";
import WebSiteName from "../WebSiteName";
import Theme from "./Theme/Theme";
import Language from "./Language/Language";
import LinkSvg from "./LinkSvg";
import navbarSvges from "./NavbarSvg";
import Profile from "./Profile/Profile";
import LinkNameSvg from "./LinkNameSvg";
import dictionary from "./dictionary.json";
import getLanguage from "@/commonTsServer/getLanguage";
import ShoppingCart from "./ShopingCart/ShoppingCart";
const Navbar = () => {
  const lang = getLanguage().lang;
  return (
    <div className="w-screen bg-black text-white h-14  fixed top-0 left-0">
      <nav className="w-full  flex justify-between h-full items-center px-2 sm:px-8  mx-auto">
        <div className="flex items-center grow-0 gap-2">
          <WebSiteName />
          <LinkSvg svg={navbarSvges().wallet} link="/user/wallet" />
          <ShoppingCart />
        </div>
        <ul className="flex  text-xs sm:static fixed left-0 bottom-0 w-full sm:w-fit justify-center h-8 sm:h-14 items-center sm:gap-5 bg-black text-white ">
          <LinkNameSvg
            svg={navbarSvges().sell}
            link="/user/store"
            text={dictionary.sell[lang]}
          />
          <LinkNameSvg
            svg={navbarSvges().market}
            link="/market"
            text={dictionary.market[lang]}
          />
          <LinkNameSvg
            svg={navbarSvges().aboutUS}
            link="/aboutus"
            text={dictionary.aboutus[lang]}
          />
        </ul>
        <div className="flex  shrink-0 gap-2">
          <Language />
          <Theme />
          <Profile />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
