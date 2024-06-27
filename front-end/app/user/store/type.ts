type SteamAsset = {
  assetID: string;
  tradable: boolean;
  title: string;
  imageURL: string;
  detailID: number;
  descriptions: Description[];
  GIFTONLY :boolean
};

type GameInventory = {
  [gameTitle: string]: SteamAsset[];
};
