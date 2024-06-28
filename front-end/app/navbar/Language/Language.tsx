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
        <div
          role="button"
          className="  p-2 "
          onClick={() =>
            document
              .getElementById("languageModal")
              ?.setAttribute("class", "modal modal-open")
          }
        >
          {NavbarSvges().language}
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="languageModal" className="modal">
        <div className="modal-box bg-black absolute top-0 text-xs">
          <div
            dir="ltr"
            className="flex justify-center gap-3 mb-3 text-xs items-center"
          >
            Please Choose Your preference language{" "}
            <button
              dir={SUPPORTED_LANGUAGES[0].dir}
              key={SUPPORTED_LANGUAGES[0].lang}
              onClick={() => ChangeLanguage(SUPPORTED_LANGUAGES[0])}
              className="btn btn-primary btn-xs "
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
              className="btn btn-primary btn-xs "
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
