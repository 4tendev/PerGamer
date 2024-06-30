type Platform = {
  game: string;
  appid: number;
  tags: Tags;
};

type Tag = string;

type Tags = {
  [key: string]: Tag[];
};

type PlatformSelection = Platform | undefined[];
type Description = { type: string; value: string };
type Product = {
  id: number;
  detailID: number;
  creatorID: number;
  asset: string;
  amount: number;
  deliveryMethod: 1 | 2;
  descriptions: Description[];
  isUnique :boolean
  
};
type Detail = {
  img: string;
  id: number;
  title: string;
  tags: Tag[];
};
type Market = {
  details: Detail[];
  products: Product[];
};

type Filter = {
  contains: string;
  selectedTags: Tag[];
  appid: number;
  offset: number;
  trustedSellers :boolean
};
