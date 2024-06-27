type Price = Omit<Asset, 'decimal'>;

type Asset ={
    amount : number,
    assetName : "SATOSHI" | "USDT" | "TOMAN",
    decimal : number
}