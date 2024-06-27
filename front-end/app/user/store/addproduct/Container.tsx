"use client";
import React, { useState } from "react";
import SteamAssetCard from "./SteamAssetCard";

const Container = (props: { inventories: GameInventory[] }) => {
  const [inventories, setInventories] = useState<GameInventory[]>(
    props.inventories
  );
  const [assets, setAssets] = useState<{
    gameTitle: string;
    assets: SteamAsset[];
  }>({
    gameTitle: "",
    assets: [],
  });
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  const filteredAssets = assets.assets.filter((asset) =>
    asset.title.toLowerCase().includes(filter.toLowerCase())
  );

  function changeFilter(title: string) {
    setPage(1);
    setFilter(title);
  }
  return (
    <div className=" w-full flex h-full flex-col text-center">
      <div className="w-full flex flex-wrap justify-center px-2 py-2 gap-3">
        select the game :
        {inventories.map((inventory, gameIndex) =>
          Object.keys(inventory).map((gameTitle, index) => (
            <button
              onClick={() =>
                setAssets({
                  gameTitle: gameTitle,
                  assets: inventory[gameTitle],
                })
              }
              key={`${gameIndex}-${gameTitle}-${index}`}
              className={
                "btn btn-xs " +
                (assets.gameTitle == gameTitle ? " btn-secondary " : " ")
              }
            >
              {gameTitle}
            </button>
          ))
        )}
      </div>
      {assets.assets.length > 0 && (
        <>
          <div className="flex items-center text-xs justify-center">
            filter :
            <input
              value={filter}
              onChange={(event) => changeFilter(event.target.value)}
              type="text"
              className="input block mx-3 input-bordered input-xs"
            />
          </div>
          <div className="join flex flex-wrap my-1 px-8 gap-1 ">
            {Array.from(
              { length: Math.ceil(filteredAssets.length / 100) },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                className="join-item btn btn-sm "
                onClick={() => setPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-around bg-base-100 w-full rounded-none py-5 gap-3 mx-auto p-5 grow overflow-auto">
            {filteredAssets.length > 0 &&
              filteredAssets
                .slice((page - 1) * 100, page * 100)
                .map(
                  (asset) =>
                    (!asset.GIFTONLY || assets.gameTitle == "DOTA2") && (
                      <SteamAssetCard
                        setInventories={setInventories}
                        asset={asset}
                        key={asset.assetID}
                      />
                    )
                )}
          </div>
        </>
      )}
    </div>
  );
};

export default Container;
