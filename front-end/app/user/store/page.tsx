import getData from "@/commonTsServer/getData";
import Link from "next/link";
import React from "react";

const Page = async () => {
  return (
    <div className="w-fit mx-auto flex justify-center items-center gap-3 flex-col my-3">
      <Link className="btn  w-full btn-primary btn-xs" href="">
        Open Orders
      </Link>
      <Link className="btn w-full btn-primary btn-xs" href="/user/store/addproduct">
        Add New Product
      </Link>
      <Link className="btn   w-full btn-primary btn-xs" href="">
        manage Existing Products
      </Link>
    </div>
  );
};

export default Page;
