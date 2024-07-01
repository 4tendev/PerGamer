"use client";
import React, { useEffect, useState } from "react";
import CheckOutCart from "./CheckOutCart";
import { fetchapi } from "@/commonTsBrowser/fetchAPI";
import Loading from "@/app/loading";
import { SHPPING_CART_COOKIE_NAME } from "@/settings";
import setCookie from "@/commonTsBrowser/setCookie";
import { useRouter } from "next/navigation";

const Page = () => {
  const [market, setMarket] = useState<Market | undefined>(undefined);
  const credit = 110201;
  const router = useRouter();
  useEffect(() => {
    fetchapi("/user/checkout/", "GET").then((response) =>
      setMarket(response.data)
    );

    return () => {};
  }, []);
  function clearCart(){
    setCookie(SHPPING_CART_COOKIE_NAME,"[]")
    router.push("/market")
  }

  

  return (
    market ?
    
    <div className="flex flex-col  h-full">
      <div className="flex justify-center w-full my-2">
        Total Price :{" "}
        <button className="btn btn-error btn-xs mx-2" onClick={clearCart} >{ market.products.length >0 ?"Remove All":"Back to Market"  }</button>
      </div>
      <div className="flex flex-wrap sm:grow-0 grow px-1 gap-3 justify-center  py-3 overflow-auto">
        {" "}
        {market.products.map((product) => (
          <CheckOutCart
            setMarket={setMarket}
            key={product.id}
            product={product}
            detail={
              market.details.find(
                (detail) => detail.id == product.detailID
              ) as Detail
            }
          />
        ))}
      </div>
      <div className="flex flex-col gap-3 bg-transparent  w-full sm:py-2 pt-2">
        <div className="flex justify-between w-64 m-auto bg-transparent ">
          <div className="bg-transparent">تعداد آیتم در سبد :</div>
          <div>{market.products.length} عدد</div>
        </div>
        <div className="flex justify-between w-64 m-auto bg-transparent ">
          <div className="bg-transparent">قیمت کل :</div>
          <div>{credit.toLocaleString()} تومان</div>
        </div>
        <div className="flex justify-between w-64 m-auto bg-transparent ">
          <div className="bg-transparent">اعتبار کیف پول :</div>
          <div>{credit.toLocaleString()} تومان</div>
        </div>

        <button disabled={market.products.length ==0} className="btn btn-success w-full sm:w-fit sm:rounded sm:btn-sm rounded-none  mx-auto">
          Check out
        </button>
      </div>
    </div>:
    <Loading />
  );
};

export default Page;
