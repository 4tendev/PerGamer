import Link from "next/link";
import React from "react";

const LinkSvg = (props: { link: string; svg: React.JSX.Element }) => {
  return (
    <Link href={props.link} className="p-2">
      <>{props.svg}</>
    </Link>
  );
};

export default LinkSvg;
