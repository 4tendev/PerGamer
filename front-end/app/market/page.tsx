import getData from "@/commonTsServer/getData";
import React from "react";
import Market from "./Market";
import { cookies } from "next/headers";

const Page = async () => {
  const platformsData = await getData("/market/platforms/");
  const platforms: Platform[] = platformsData.data;
  const marketData = await getData("/market/");
  const market = marketData.data as Market;
  const cookieStore = cookies();
  const card = cookieStore.get("ShoppingCard");

  const shoppingCard = card?.value ? JSON.parse(card.value) : [];

  market.products = market.products.filter(
    (product) => !shoppingCard.includes(product.id)
  );
  return <Market platforms={platforms} market={market} platform={undefined} />;
};

export default Page;
