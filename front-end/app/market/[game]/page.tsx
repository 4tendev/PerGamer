import getData from "@/commonTsServer/getData";
import Market from "../Market";

export default async function Page({ params }: { params: { game: string } }) {
  const data = await getData("/market/platforms/");
  const platforms: Platform[] = data.data;
  const platform = platforms.find(
    (platform: Platform) => platform.game == params.game.toUpperCase()
  );
  return <Market platforms={platforms} products={[]} platform={platform} />;
}
