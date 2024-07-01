"use state";
import Delivery from "@/app/components/product/Delivery";
import Descriptions from "@/app/components/product/Descriptions";
import ImageDescriptions from "@/app/components/product/ImageDescriptions";
import TitleAndTags from "@/app/components/product/TitleAndTags";
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
      <Delivery deliveryMethod={product.deliveryMethod} />
      <ImageDescriptions
        detail={{ title: detail.title, img: detail.img }}
        product={{ descriptions: product.descriptions }}
      />
      <div
        dir="ltr"
        className=" leading-3  text-xs flex justify-between items-center "
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
      <TitleAndTags title={detail.title} tags={detail.tags} />
    </div>
  );
};

export default ProductCard;
