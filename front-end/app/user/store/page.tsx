import getData from "@/commonTsServer/getData";
import Link from "next/link";
import React from "react";

const Page = async () => {
  return (
    <div className="mx-auto flex justify-center items-center gap-2 flex-col my-3 w-full max-w-md px-3">
      <Link
        className="btn  w-full btn-primary btn-sm  "
        href="/user/store/orders"
      >
        Open Orders
      </Link>
      <Link
        className="btn w-full btn-primary btn-sm  "
        href="/user/store/orders"
      >
        Order History
      </Link>
      <Link
        className="btn  w-full  btn-primary btn-sm  "
        href="/user/store/products"
      >
        Manage Products
      </Link>
      <Link
        className="btn w-full  btn-primary btn-sm "
        href="/user/store/addproduct"
      >
        Add New Product
      </Link>
    </div>
  );
};

export default Page;
