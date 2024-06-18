import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const LANGUAGES_COOKIE_NAME: "lang" = "lang";

export type Lang = "en" | "fa";
export type Dir = "ltr" | "rtl";
export type Language = {
  lang: Lang;
  dir: Dir;
  text: string;
  browserSymbol: string[];
};

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    lang: "en",
    dir: "ltr",
    text: "English",
    browserSymbol: [
      "en",
      "en-US",
      "en-GB",
      "en-CA",
      "en-AU",
      "en-NZ",
      "en-IE",
      "en-IN",
      "en-ZA",
      "en-PH",
      "en-SG",
    ],
  },
  { lang: "fa", dir: "rtl", text: "فارسی", browserSymbol: ["fa", "fa-IR"] },
];

const initialState = SUPPORTED_LANGUAGES[0];

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: (create) => ({
    selectedLanguage: create.reducer(
      (state, action: PayloadAction<Language>) => action.payload
    ),
  }),

  selectors: {
    language: (language) => language,
  },
});

export const { selectedLanguage } = languageSlice.actions;

export const { language } = languageSlice.selectors;
