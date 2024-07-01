import Link from "next/link";
import React from "react";

const NotFound = () => {
  return <div className="w-full text-center">
   We cant Found What you need <br />
    <Link href={"/market"} className="btn btn-xs btn-info">
        Take me to Market
    </Link>
    </div>;
};

export default NotFound;
