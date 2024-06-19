"use client";
import React, { useEffect } from "react";
import setCookie from "../../../commonTsBrowser/setCookie";
import {
  SUPPORTED_LANGUAGES,
  LANGUAGES_COOKIE_NAME,
} from "@/GlobalStates/Slices/languageSlice";
import getLanguage from "@/commonTsBrowser/getLanguage";
import { useAppDispatch } from "@/GlobalStates/hooks";
import { selectedLanguage } from "@/GlobalStates/Slices/languageSlice";
import getCookie from "@/commonTsBrowser/getCookie";
import NavbarSvges from "../NavbarSvg";

const Language = () => {
  const dispatch = useAppDispatch();

  function ChangeLanguage(language: (typeof SUPPORTED_LANGUAGES)[number]) {
    const daysToLeave: 100 = 100;
    setCookie(LANGUAGES_COOKIE_NAME, language.lang, daysToLeave);
    location.reload();
  }

  useEffect(() => {
    getCookie(LANGUAGES_COOKIE_NAME)
      ? dispatch(selectedLanguage(getLanguage()))
      : document
          .getElementById("languageModal")
          ?.setAttribute("class", "modal modal-open");
    return () => {};
  }, []);

  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="  p-2 ">
          {NavbarSvges().language}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-0 px-0  bg-black "
        >
          {SUPPORTED_LANGUAGES.map((language) => (
            <li
              dir={language.dir}
              key={language.lang}
              onClick={() => ChangeLanguage(language)}
              className="text-center rounded-none"
            >
              <small>{language.text}</small>
            </li>
          ))}
        </ul>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="languageModal" className="modal">
        <div className="modal-box">
          <div className="flex justify-between">
            <h3 dir="ltr" className="font-bold text-lg">
              Wellcome !
            </h3>
            <h3 dir="rtl" className="font-bold text-lg">
              خوش آمدید !
            </h3>
          </div>

          <div
            dir="ltr"
            className="py-4 flex justify-center gap-3 text-xs items-center"
          >
            Please Choose Your preference language{" "}
            <button
              dir={SUPPORTED_LANGUAGES[0].dir}
              key={SUPPORTED_LANGUAGES[0].lang}
              onClick={() => ChangeLanguage(SUPPORTED_LANGUAGES[0])}
              className="btn btn-primary btn-xs"
            >
              <small>{SUPPORTED_LANGUAGES[0].text}</small>
            </button>
          </div>
          <div
            className="flex justify-center gap-3 text-xs items-center"
            dir="rtl"
          >
            {"لطفا زبان خود را انتخاب کنید."}
            <button
              dir={SUPPORTED_LANGUAGES[1].dir}
              key={SUPPORTED_LANGUAGES[1].lang}
              onClick={() => ChangeLanguage(SUPPORTED_LANGUAGES[1])}
              className="btn btn-primary btn-xs"
            >
              <small>{SUPPORTED_LANGUAGES[1].text}</small>
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Language;
