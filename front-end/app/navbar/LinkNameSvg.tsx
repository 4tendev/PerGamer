import Link from "next/link";
import React from "react";

const LinkNameSvg = (props: {
  link: string;
  text: string;
  svg: React.JSX.Element;
}) => {
  const className = "w-1/3 sm:w-fit flex items-center justify-center gap-1";
  return (
    <Link href={props.link} className={className}>
      {props.text}
      <>{props.svg}</>
    </Link>
  );
};

export default LinkNameSvg;
