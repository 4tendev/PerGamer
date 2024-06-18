import Link from "next/link";
import React from "react";
import dictionary from "@/app/dictionary.json";
import getLanguage from "@/commonTsServer/getLanguage";
import config from "@/tailwind.config";
const WebSiteName = () => {
  const lang = getLanguage().lang;

  return (
    <Link
      data-theme={config.daisyui.themes[0]}
      className={
        "sm:text-2xl text-sm text-primary  font-bold bg-inherit " +
        (lang == "fa" ? " " : " font-mono ")
      }
      href={"/"}
    >
      {dictionary.WebSiteName[lang]}
    </Link>
  );
};

export default WebSiteName;
