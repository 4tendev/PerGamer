import { cookies, headers } from "next/headers";
import {
  SUPPORTED_LANGUAGES,
  Language,
  LANGUAGES_COOKIE_NAME,
} from "@/GlobalStates/Slices/languageSlice";

const getLanguage = (): Language => {
  const decidedLanguage = cookies().get(LANGUAGES_COOKIE_NAME)?.value;
  const language = SUPPORTED_LANGUAGES.find(
    (language) => language.lang === decidedLanguage
  );

  if (language) {
    return language;
  } else {
    const header = headers();
    const acceptedLanguage = header
      .get("accept-language")
      ?.split(";")[0]
      .split(",")[0];

    if (acceptedLanguage) {
      const matchedLanguage = SUPPORTED_LANGUAGES.find((supportedLanguage) =>
        supportedLanguage.browserSymbol.includes(acceptedLanguage)
      );
      if (matchedLanguage) {
        return matchedLanguage;
      }
    }
  }

  return SUPPORTED_LANGUAGES[0];
};

export default getLanguage;
