import React from "react";

export const NavbarSvges = () => {
  const svgClassName = "h-5";
  return {
    wallet: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className={svgClassName}
        viewBox="0 0 512 512"
      >
        <path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z" />
      </svg>
    ),
    shoppingCart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={svgClassName}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    profile: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className={svgClassName}
        viewBox="0 0 448 512"
      >
        <path d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128v64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9V128c0-16.8-12.9-30.5-29.3-31.9zM336 144v16c0 53-43 96-96 96H208c-53 0-96-43-96-96V144c0-26.5 21.5-48 48-48H288c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512H128V448c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64l98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16v48h32V464c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z" />
      </svg>
    ),
    market: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className={"h-3"}
        viewBox="0 0 576 512"
      >
        <path d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z" />
      </svg>
    ),
    sell: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={"h-3"}
        fill="currentColor"
        viewBox="0 0 576 512"
      >
        <path d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z" />
      </svg>
    ),
    aboutUS: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={"h-3"}
        fill="currentColor"
        viewBox="0 0 512 512"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
      </svg>
    ),
    language: (
      <svg
        className={svgClassName}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z"></path>
        <path d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z"></path>
      </svg>
    ),
  };
};

export default NavbarSvges;
