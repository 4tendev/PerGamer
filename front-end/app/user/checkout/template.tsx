"use client";
import getCookie from "@/commonTsBrowser/getCookie";
import { SHPPING_CART_COOKIE_NAME } from "@/settings";
import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [shoppingCart, setShoppingCart] = useState<Product["id"][]>([]);

  useEffect(() => {
    const cart = getCookie(SHPPING_CART_COOKIE_NAME);
    setShoppingCart(cart ? JSON.parse(cart) : []);
    return () => {};
  }, []);

  if (shoppingCart.length == 0) {
    return (
      <div className="flex flex-wrap grow px-1 gap-3 justify-center  ">
        HERE
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
