"use client";
import Delivery from "@/app/components/product/Delivery";
import Descriptions from "@/app/components/product/Descriptions";
import ImageDescriptions from "@/app/components/product/ImageDescriptions";
import TitleAndTags from "@/app/components/product/TitleAndTags";
import getCookie from "@/commonTsBrowser/getCookie";
import setCookie from "@/commonTsBrowser/setCookie";
import { SHPPING_CART_COOKIE_NAME } from "@/settings";
import React, { useState } from "react";

const CheckOutCart = (props: {
  product: Product;
  detail: Detail;
  setMarket: Function;
}) => {
  const [removingFrom, setRemovingFrom] = useState(false);
  const product = props.product;
  const detail = props.detail;

  function removeProduct() {
    const shoppingCartString = getCookie(SHPPING_CART_COOKIE_NAME);
    const shoppingCart = shoppingCartString
      ? JSON.parse(shoppingCartString)
      : [];
    setRemovingFrom(true);
    setTimeout(() => {
      props.setMarket((prev: Market) => {
        const newProducts = prev.products.filter(
          (oldProduct) => oldProduct.id != product.id
        );
        return { ...prev, products: newProducts };
      });
      setCookie(
        SHPPING_CART_COOKIE_NAME,
        JSON.stringify(
          Array.from(
            new Set(shoppingCart.filter((id: number) => id != product.id))
          )
        )
      );
    }, 300);
  }
  return (
    <div
      key={product.id}
      className="w-36   h-fit rounded-md flex flex-col gap-1 bg-base-300 p-2 "
    >
      <Delivery deliveryMethod={product.deliveryMethod} />
      <ImageDescriptions
        detail={{ title: detail.title, img: detail.img }}
        product={{ descriptions: product.descriptions }}
      />
      <div
        dir="ltr"
        className=" leading-3  text-xs flex justify-between items-center pe-1"
      >
        {product.amount} {product.asset}
        <button
          className="  h-4 w-8  btn-warning btn btn-xs  "
          onClick={removeProduct}
        >
          {removingFrom ? (
            <>
              <span className="loading loading-bars loading-md"></span>
            </>
          ) : (
            "-"
          )}
        </button>
      </div>
      <TitleAndTags title={detail.title} tags={detail.tags} />
    </div>
  );
};

export default CheckOutCart;
