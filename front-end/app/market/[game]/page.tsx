import getData from "@/commonTsServer/getData";
import Market from "../Market";

export default async function Page({ params }: { params: { game: string } }) {
  const platformsData = await getData("/market/platforms/");
  const platforms: Platform[] = platformsData.data;
  const platform = platforms.find(
    (platform: Platform) => platform.game == params.game.toUpperCase()
  );
  const marketData = await getData("/market/");
  const market = marketData.data
  return <Market platforms={platforms} market={market} platform={platform} />;
}
