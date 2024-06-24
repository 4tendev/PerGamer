import Image from "next/image";
import React from "react";

const ProductCard = (props: { detail: Detail; products: Product[] }) => {
  const detail = props.detail;
  const products = props.products;

  return (
    <>
      <div className="w-52  p-3  h-fit rounded-md flex flex-col gap-1 bg-base-200">
        <div className="flex justify-between w-full text-xs">
          <div>sell all</div>
          <div>average delivery</div>
        </div>
        <div className="w-full h-40 flex items-start justify-center relative  z-0">
          <div className="   flex absolute bottom-3 gap-1">
            {products[0].descriptions.map((item, index) => {
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
          <Image
            width={170}
            height={170}
            className="mx-auto rounded-lg shadow-xl"
            alt="Drow"
            src={"/drow.webp"}
          />
        </div>
        <div dir="ltr" className="font-bold  leading-3">
          {products[0].amount} {products[0].asset}
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
        <div dir="ltr" className="text-sm font-bold leading-3">
          {detail.title}
        </div>
        <div className="flex justify-between text-xs items-center my-1">
          <div>Seller :</div>
          <select dir="ltr" className="select select-xs ">
            {products.map((product) => (
              <option value="">{product.id}</option>
            ))}
          </select>
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
