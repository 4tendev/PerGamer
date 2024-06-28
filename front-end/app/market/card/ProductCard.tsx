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
    <div className="w-36   h-fit rounded-md flex flex-col gap-1 bg-base-300 p-1 ">
      <div className="w-full h-[110px]  flex flex-col items-start justify-start  relative">
        <div className="flex justify-between w-full text-[10px] px-1 ">
          {selectedProduct.deliveryMethod == 1 ? (
            <>
              <div className="">{"deliver  day"}</div>
              <div>2 H </div>
            </>
          ) : (
            <>
              <div>Dota2 Gift</div>
              <div>{"seller's profile"}</div>
            </>
          )}
        </div>
        <img
          width={170}
          height={170}
          className="mx-auto  shadow-xl rounded-md "
          alt={detail.title}
          src={detail.img}
        />

        <div className="absolute top-4 left-0">
          <Descriptions descriptions={selectedProduct.descriptions} />
        </div>
      </div>
      <div
        dir="ltr"
        className=" leading-3  text-xs flex justify-between items-center pe-1"
      >
        {selectedProduct.amount}123222 {selectedProduct.asset}
        <button className="  h-4 w-8 rounded-xl bg-success text-black">
          +
        </button>
      </div>
      <div>
        <div
          dir="ltr"
          className="text-[11px] font-bold  h-4 w-full overflow-hidden"
        >
          {detail.title}
        </div>
        <div
          dir="ltr"
          className="flex text-[10px] gap-2 overflow-hidden font-mono px-1"
        >
          {detail.tags.map((tag) => (
            <div key={tag} className="broder rounded-lg text-info">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
