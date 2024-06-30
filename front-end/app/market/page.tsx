import getData from "@/commonTsServer/getData";
import React from "react";
import Market from "./Market";
import { cookies } from "next/headers";
import { SHPPING_CART_COOKIE_NAME } from "@/settings";

const Page = async () => {
  const platformsData = await getData("/market/platforms/");
  const platforms: Platform[] = platformsData.data;
  const marketData = await getData("/market/");
  const market = marketData.data as Market;
  const cookieStore = cookies();
  const cart = cookieStore.get(SHPPING_CART_COOKIE_NAME);

  const shoppingCart = cart?.value ? JSON.parse(cart.value) : [];

  market.products = market.products.filter(
    (product) => !shoppingCart.includes(product.id)
  );
  return <Market platforms={platforms} market={market} platform={undefined} />;
};

export default Page;
