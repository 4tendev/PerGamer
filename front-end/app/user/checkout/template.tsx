"use client";
import Loading from "@/app/loading";
import getCookie from "@/commonTsBrowser/getCookie";
import { SHPPING_CART_COOKIE_NAME } from "@/settings";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [shoppingCart, setShoppingCart] = useState<Product["id"][] | undefined>(
    undefined
  );

  useEffect(() => {
    const cart = getCookie(SHPPING_CART_COOKIE_NAME);
    setShoppingCart(cart ? JSON.parse(cart) : []);
    return () => {};
  }, []);
  !shoppingCart && <Loading />;

  shoppingCart?.length == 0 && redirect("/market");

  return <>{children}</>;
}
