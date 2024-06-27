"use client";
import Descriptions from "@/app/components/product/Descriptions";
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
        <div className="flex justify-between w-full text-[10px]">
          {selectedProduct.deliveryMethod == 1 ? (
            <>
              <div className="">
                { "deliver at less than day"}
              </div>
              <div>2 H </div>
            </>
          ) : (
            <>
              <div>
                Dota2 Gift
              </div>
              <div>{"seller's steam profile"}</div>
            </>
          )}
        </div>
        <div className="w-full h-[160px]  flex flex-col items-start justify-start py-2 gap-1 z-0">
          <img
            width={170}
            height={170}
            className="mx-auto rounded-lg shadow-xl"
            alt="Drow"
            src={detail.img}
          />
          <Descriptions descriptions={selectedProduct.descriptions} />
        </div>
        <div dir="ltr" className=" leading-3 my-1 ">
          {selectedProduct.amount} {selectedProduct.asset}
        </div>
        <div>
          <div
            dir="ltr"
            className="text-xs font-bold  h-4 w-full overflow-hidden"
          >
            {detail.title}
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
        </div>
        <div className="flex justify-between text-xs items-center ">
          <div>Sellers :</div>
          {uniqueProducts.length > 0 && (
            <select
              value={selectedProduct.id}
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
                <option key={product.id} value={product.id}>
                  {product.id}
                </option>
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
