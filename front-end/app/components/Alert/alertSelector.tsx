import { TimeAlertProp } from "./TimeAlert/TimeAlert";
export default function alertDetailFromMode(mode: TimeAlertProp["mode"]) {
  const svgClassname = "stroke-current shrink-0 h-4 w-4";

  switch (mode) {
    case "error":
      return {
        className: "alert-error",
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={svgClassname}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      };

    case "warning":
      return {
        className: "alert-warning",
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={svgClassname}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        ),
      };
    case "success":
      return {
        className: "alert-success",
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={svgClassname}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      };
    case "info":
      return {
        className: "alert-info",
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className={svgClassname}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        ),
      };

    default:
      return {
        className: " ",
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className={svgClassname}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        ),
      };
  }
}
