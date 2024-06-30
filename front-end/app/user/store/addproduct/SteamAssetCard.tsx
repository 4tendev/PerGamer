"use client";
import { newAlert, serverErrorAlert } from "@/GlobalStates/Slices/alert/Slice";
import { language } from "@/GlobalStates/Slices/languageSlice";
import { useAppDispatch, useAppSelector } from "@/GlobalStates/hooks";
import Descriptions from "@/app/components/product/Descriptions";
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
  const [deliveryMethod, setDeliveryMethod] = useState(!asset.GIFTONLY ? 1 : 2);
  const [dayLeftToSend, setDayLeftToSend] = useState(0);
  const [fetching, setFetching] = useState(false);
  const dispatch = useAppDispatch();

  async function sell() {
    setFetching(true);
    await fetchapi("/user/store/", "POST", {
      assetID: deliveryMethod == 1 ? asset.assetID : null,
      detailID: asset.detailID,
      amount: price.amount,
      assetName: price.assetName,
      descriptions: asset.descriptions,
      dayLeftToSend: dayLeftToSend,
      deliveryMethod: deliveryMethod,
      isUnique: asset.descriptions.length >0? true: false,
    })
      .then((response) => {
        if (response.code == "200") {
          dispatch(newAlert({ message: "OK", mode: "success", time: 3 }));
        } else {
          setFetching(false);
        }
      })
      .catch((error) => dispatch(serverErrorAlert(lang)));
  }

  return (
    <div className="w-56 flex flex-col gap-3 border rounded-lg p-3 h-fit">

      <div className="w-full h-[90px]  flex flex-col items-start justify-start  relative" >

      <img src={asset.imageURL} alt={asset.title} />
      <div className="absolute bottom-1.5 left-0 ">
      <Descriptions descriptions={asset.descriptions} />
      </div>
      </div>

      <div className="w-full overflow-hidden h-6">{asset.title}</div>
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
      <div className="flex justify-between gap-1 w-full text-xs items-center">
        <div>you get : </div>
        <input
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

      <div className="flex justify-between gap-1 w-full text-xs items-center">
        <div>Delivery method :</div>
        <select
          onChange={(event) => setDeliveryMethod(Number(event.target.value))}
          value={deliveryMethod}
          className="select select-xs select-bordered"
        >
          {!asset.GIFTONLY && <option value={1}>Trade</option>}
          <option value={2}>Gift</option>
        </select>
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
