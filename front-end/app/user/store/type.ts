type SteamAsset = {
  assetID: string;
  tradable: boolean;
  title: string;
  imageURL: string;
  detailID: number;
  descriptions: Description[];
  GIFTONLY: boolean;
  appid: number;
  hasNoneUniqueTag: boolean;
};

type GameInventory = {
  [gameTitle: string]: SteamAsset[];
};
