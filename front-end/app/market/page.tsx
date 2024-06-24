import getData from "@/commonTsServer/getData";
import React from "react";
import Market from "./Market"; 

const Page = async () => {
  const platformsData = await getData("/market/platforms/");
  const platforms :Platform[] = platformsData.data;
  const marketData = await getData("/market/");
  const market = marketData.data
  return (
    <Market  platforms={platforms} market={market} platform={undefined} />
  );
};

export default Page;
