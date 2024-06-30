"use client";
import { useEffect, useState } from "react";
import NavbarSvges from "../NavbarSvg";
import LinkSvg from "../LinkSvg";
import getCookie from "@/commonTsBrowser/getCookie";
import setCookie from "@/commonTsBrowser/setCookie";
import { SHPPING_CART_COOKIE_NAME } from "@/settings";

function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState<Product["id"][]>([]);

  function checkLocalStorageValue() {
    const shoppingCartString = getCookie(SHPPING_CART_COOKIE_NAME);
    shoppingCartString ?? setCookie(SHPPING_CART_COOKIE_NAME, "[]");
    const shoppingCart = shoppingCartString
      ? JSON.parse(shoppingCartString)
      : [];
    setShoppingCart(shoppingCart);
  }

  useEffect(() => {
    checkLocalStorageValue();
    const interval = setInterval(checkLocalStorageValue, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative">
      <span className="absolute bottom-[30px]  rounded-full  start-0 ms-[18px]  font-bold shadow-lg text-accent">
        {" "}
        {shoppingCart.length}
      </span>

      <LinkSvg svg={NavbarSvges().shoppingCart} link="/user/checkout" />
    </div>
  );
}

export default ShoppingCart;
