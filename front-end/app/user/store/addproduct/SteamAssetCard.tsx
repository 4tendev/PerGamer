"use client";
import { newAlert, serverErrorAlert } from "@/GlobalStates/Slices/alert/Slice";
import { language } from "@/GlobalStates/Slices/languageSlice";
import { useAppDispatch, useAppSelector } from "@/GlobalStates/hooks";
import Descriptions from "@/app/components/product/Descriptions";
import ImageDescriptions from "@/app/components/product/ImageDescriptions";
import { fetchapi } from "@/commonTsBrowser/fetchAPI";
import React, { useState } from "react";
type PriceInput = {
  [K in keyof Price]: K extends "amount" ? number | "" : Price[K];
};
const ProductCard = (props: {
  setInventories: Function;
  asset: SteamAsset;
}) => {
  const lang = useAppSelector(language).lang;
  const asset = props.asset;
  const [price, setPrice] = useState<PriceInput>({
    amount: "",
    assetName: "USDT",
  });
  const deliveryMethod = !asset.GIFTONLY ? 1 : 2;
  const [dayLeftToSend, setDayLeftToSend] = useState(0);
  const [fetching, setFetching] = useState(false);
  const dispatch = useAppDispatch();
  function isUnique(): boolean {
    if (deliveryMethod == 2) {
      return false;
    } else if (asset.descriptions.length > 0) {
      return true;
    } else {
      return asset.hasNoneUniqueTag ? false : true;
    }
  }
  async function sell() {
    setFetching(true);
    await fetchapi("/user/store/", "POST", {
      assetID: asset.assetID,
      detailID: asset.detailID,
      amount: price.amount,
      assetName: price.assetName,
      descriptions: asset.descriptions,
      dayLeftToSend: dayLeftToSend,
      deliveryMethod: deliveryMethod,
      isUnique: isUnique(),
    })
      .then((response) => {
        if (response.code == "200") {
          dispatch(newAlert({ message: "OK", mode: "success", time: 3 }));
          props.setInventories((prev: GameInventory[]) => {
            for (const inventory in prev) {
              const gameInventory = prev[inventory];
              for (const game in gameInventory) {
                const assets = gameInventory[game];
                const findedAsset = assets.find(
                  (oldAsset) => oldAsset.assetID == asset.assetID
                );
                if (findedAsset) {
                  const newAssets = assets.filter(
                    (oldAsset) => oldAsset.assetID != asset.assetID
                  );
                  const newGameInventory = [...prev];
                  newGameInventory[inventory][game] = newAssets;

                  return newGameInventory;
                }
              }
            }
          });
        } else {
          dispatch(newAlert({ message: "NOK", mode: "warning", time: 3 }));
        }
      })
      .catch((error) => {
        dispatch(serverErrorAlert(lang));
      });
    setFetching(false);
  }

  return (
    <div className="w-52 flex flex-col gap-3 border rounded-lg p-3 h-fit text-xs">
      <ImageDescriptions
        detail={{ title: asset.title, img: asset.imageURL }}
        product={{ descriptions: asset.descriptions }}
      />

      <div className="w-full overflow-hidden h-6 text-base">{asset.title}</div>
      <div className="flex justify-between gap-1 w-full text-xs items-center">
        <div>you get : </div>
        <input
          disabled={fetching}
          value={price.amount}
          onChange={(event) =>
            setPrice((prev) => ({
              ...prev,
              amount: event.target.value ? Number(event.target.value) : "",
            }))
          }
          type="number"
          className="grow input input-bordered input-xs max-w-20"
        />
        {price.assetName}
      </div>
      {deliveryMethod == 1 && (
        <div className="flex justify-between">
          <div>can be sent in </div>
          <select
            value={dayLeftToSend}
            onChange={(event) => setDayLeftToSend(Number(event.target.value))}
            className="select select-xs select-bordered"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7].map((day) => (
              <option key={day} value={day}>
                {day} day
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex justify-between gap-1 w-full text-xs items-center">
        <div>Delivery method :</div>
        {deliveryMethod == 1 ? "Trade" : "Gift"}
      </div>
      <button
        disabled={fetching}
        className="btn btn-sm btn-success"
        onClick={sell}
      >
        {fetching ? "In sale" : " Put for sale"}
      </button>
    </div>
  );
};

export default ProductCard;
