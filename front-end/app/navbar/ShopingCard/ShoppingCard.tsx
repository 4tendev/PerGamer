"use client";
import { useEffect, useState } from "react";
import NavbarSvges from "../NavbarSvg";
import LinkSvg from "../LinkSvg";
import getCookie from "@/commonTsBrowser/getCookie";
import setCookie from "@/commonTsBrowser/setCookie";

function ShoppingCard() {
  const [shoppingCard, setShoppingCard] = useState<Product["id"][]>([]);

  function checkLocalStorageValue() {
    const shoppingCardString = getCookie("ShoppingCard");
    shoppingCardString ?? setCookie("ShoppingCard", "[]");
    const shoppingCard = shoppingCardString
      ? JSON.parse(shoppingCardString)
      : [];
    setShoppingCard(shoppingCard);
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
        {shoppingCard.length}
      </span>

      <LinkSvg svg={NavbarSvges().shoppingCard} link="/user/checkout" />
    </div>
  );
}

export default ShoppingCard;
