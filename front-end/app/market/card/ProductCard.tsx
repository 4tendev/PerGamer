"use client";
import Image from "next/image";
import React, { useState } from "react";

const ProductCard = (props: { detail: Detail; products: Product[] }) => {
  const detail = props.detail;
  const products = props.products;
  products.sort((a, b) => a.amount - b.amount);

  const uniqueProducts: Product[] = [];
  const seenCreatorIDs = new Set();

  for (const product of products) {
    if (!seenCreatorIDs.has(product.creatorID)) {
      uniqueProducts.push(product);
      seenCreatorIDs.add(product.creatorID);
    }
  }
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    uniqueProducts[0]
  );

  return (
    <>
      <div className="w-52  p-4  h-fit rounded-md flex flex-col gap-2 bg-base-200">
        <div className="flex justify-between w-full text-xs">
          <div>sell all</div>
          <div>average delivery</div>
        </div>
        <div className="w-full h-fit pb-3 flex items-start justify-center   z-0">
          <Image
            width={170}
            height={170}
            className="mx-auto rounded-lg shadow-xl"
            alt="Drow"
            src={"/drow.webp"}
          />
          <div className="   flex   gap-1">
            {selectedProduct.descriptions.map((item, index) => {
              const regex = /url\([^\)]+\)/g;
              const matches = item.value.match(regex);
              const textOnly = item.value.replace(/<\/?[^>]+(>|$)/g, " ");
              return matches ? (
                <div
                  key={index}
                  className="tooltip"
                  data-tip={textOnly.substring(0, 25) + ".."}
                >
                  <img
                    width={30}
                    height={30}
                    className="mx-auto rounded-lg shadow-xl tooltip"
                    data-tip={textOnly}
                    alt={textOnly}
                    src={matches[0].substring(4, matches[0].length - 1)}
                  />
                </div>
              ) : null;
            })}
          </div>
        </div>
        <div dir="ltr" className="font-bold  leading-3 ">
          {selectedProduct.amount} {selectedProduct.asset}
        </div>
        <div
          dir="ltr"
          className="flex text-[10px] gap-2 overflow-hidden font-mono"
        >
          {detail.tags.map((tag) => (
            <div key={tag} className="broder rounded-lg text-info">
              {tag}
            </div>
          ))}
        </div>
        <div dir="ltr" className="text-sm  leading-3">
          {detail.title}
        </div>
        <div className="flex justify-between text-xs items-center my-1">
          <div>Seller :</div>
          {uniqueProducts.length > 0 && (
            <select
              onChange={(event) =>
                setSelectedProduct(
                  uniqueProducts?.find(
                    (product) => product.id == Number(event.target.value)
                  ) ?? uniqueProducts[0]
                )
              }
              dir="ltr"
              className="select select-xs "
            >
              {uniqueProducts.map((product) => (
                <option value="">{product.id}</option>
              ))}
            </select>
          )}
        </div>
        <div className="flex justify-between">
          <button className="btn btn-success btn-xs rounded-md">
            add to card
          </button>
          <button className="btn btn-accent btn-xs rounded-md">See all</button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
