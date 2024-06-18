import { Language } from "@/GlobalStates/Slices/languageSlice";
import dictionary from "./dictionary.json";

const svgClassName = "h-4 mt-0.5";

const svgParams = {
  xmlns: "http://www.w3.org/2000/svg",
  className: svgClassName,
  fill: "currentColor",
  width: "20",
  viewBox: "0 0 512 512",
};


const passwordSVG = (
  <svg
    xmlns={svgParams["xmlns"]}
    className={svgParams["className"]}
    fill={svgParams["fill"]}
    width={svgParams["width"]}
    viewBox={svgParams["viewBox"]}
  >
    <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
  </svg>
);
export const TOTPSVG = (
  <svg
    xmlns={svgParams["xmlns"]}
    className={svgParams["className"]}
    fill={svgParams["fill"]}
    width={svgParams["width"]}
    viewBox={svgParams["viewBox"]}
  >
    <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z" />
  </svg>
);
export function menuList(lang: Language["lang"]): {
  text: string;
  href: string;
  svg: JSX.Element;
}[] {
  return [
    {
      text: dictionary.password[lang],
      href: "/user/password",
      svg: passwordSVG,
    },
    {
      text: dictionary.TOTP[lang],
      href: "/user/totp",
      svg: TOTPSVG,
    },
  ];
}
