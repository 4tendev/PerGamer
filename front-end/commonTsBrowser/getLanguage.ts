import {
  SUPPORTED_LANGUAGES,
  Language,
  LANGUAGES_COOKIE_NAME,
} from "@/GlobalStates/Slices/languageSlice";
import getCookie from "./getCookie";

const getLanguage = (): Language => {
  const decidedLanguage = getCookie(LANGUAGES_COOKIE_NAME);

  let language = SUPPORTED_LANGUAGES.find(
    (language) => language.lang === decidedLanguage
  );


  if (!language) {
    const browserLanguages = navigator.language;
    language = SUPPORTED_LANGUAGES.find((supportedLang) =>
      supportedLang.browserSymbol.includes(browserLanguages)
    );
  }

  
  return language || SUPPORTED_LANGUAGES[0];
};

export default getLanguage;
