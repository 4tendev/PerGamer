"use state";
import Descriptions from "@/app/components/product/Descriptions";
import getCookie from "@/commonTsBrowser/getCookie";
import setCookie from "@/commonTsBrowser/setCookie";
import { SHPPING_CART_COOKIE_NAME } from "@/settings";
import React, { useState } from "react";

const ProductCard = (props: {
  detail: Detail;
  product: Product;
  setMarket: Function;
}) => {
  const [addingTo, setaddingTo] = useState(false);
  const product = props.product;
  const detail = props.detail;

  function addToCard() {
    setaddingTo(true);
    setTimeout(() => {
      setaddingTo(false);
      props.setMarket((prev: Market) => {
        const oldProducts = prev.products.filter(
          (oldproduct) => oldproduct.id !== product.id
        );
        const newMarket = { ...prev, products: oldProducts };
        return newMarket;
      });
    }, 300);
    const shoppingCartString = getCookie(SHPPING_CART_COOKIE_NAME);
    const shoppingCart = shoppingCartString
      ? JSON.parse(shoppingCartString)
      : [];
      shoppingCart.push(product.id);
    setCookie(
      SHPPING_CART_COOKIE_NAME,
      JSON.stringify(Array.from(new Set(shoppingCart)))
    );
  }
  return (
    <div
      key={product.id}
      className="w-36   h-fit rounded-md flex flex-col gap-1 bg-base-300 p-2 "
    >
      <div className="flex justify-between w-full text-[10px] px-1 ">
        {product.deliveryMethod == 1 ? (
          <>
            <div className="">{"deliver  day"}</div>
            <div>2 H </div>
          </>
        ) : (
          <>
            <div>Dota2 Gift</div>
            <div>{"seller's profile"}</div>
          </>
        )}
      </div>
      <div className="w-full h-[90px]  flex flex-col items-start justify-start  relative">
        <img
          width={130}
          height={130}
          className="mx-auto  rounded-md "
          alt={detail.title}
          src={detail.img}
        />

        <div className="absolute bottom-1.5 left-0 ">
          <Descriptions descriptions={product.descriptions} />
        </div>
      </div>
      <div
        dir="ltr"
        className=" leading-3  text-xs flex justify-between items-center pe-1"
      >
        {product.amount} {product.asset}
        <button
          className="  h-4 w-8  btn-success btn btn-xs  "
          onClick={addToCard}
        >
          {addingTo ? (
            <>
              <span className="loading loading-bars loading-md"></span>
            </>
          ) : (
            "+"
          )}
        </button>
      </div>
      <div>
        <div
          dir="ltr"
          className="text-[11px] font-bold  h-4 w-full overflow-hidden"
        >
          {detail.title}
        </div>
        <div
          dir="ltr"
          className="flex items-center text-[10px] gap-2 leading-3 overflow-hidden font-mono h-3 w-full ps-1"
        >
          {detail.tags.map((tag, index) => (
            <div
              key={index}
              className={" text-info shrink-0 " + (index > 1 && " hidden ")}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
