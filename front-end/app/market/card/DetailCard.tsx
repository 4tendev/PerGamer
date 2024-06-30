"use client";
import Descriptions from "@/app/components/product/Descriptions";
import React from "react";
import ProductCard from "./ProductCard";

const DetailCard = (props: { detail: Detail; products: Product[] ,setMarket:Function }) => {
  const detail = props.detail;
  const products = props.products;

  function filterProducts(products: Product[]) {

    const deliveryMethod1 = products.filter((p) => p.deliveryMethod === 1);
    const deliveryMethod2 = products.filter((p) => p.deliveryMethod === 2);
    const filterByMinAmount = (products: Product[]): Product[] => {
      const creatorMap = new Map();

      products.forEach((product) => {
        if (
          !creatorMap.has(product.creatorID) ||
          creatorMap.get(product.creatorID).amount > product.amount
        ) {
          creatorMap.set(product.creatorID, product);
        }
      });

      return Array.from(creatorMap.values());
    };
    const filteredDeliveryMethod1 = deliveryMethod1.reduce(
      (acc: Product[], product: Product) => {
        if (product.isUnique) {
          acc.push(product);
        } else {
          const existingProduct = acc.find(
            (p) => p.creatorID === product.creatorID
          );
          if (!existingProduct || existingProduct.amount > product.amount) {
            // Remove existing product if it's not the lowest amount
            if (existingProduct) {
              acc = acc.filter((p) => p.creatorID !== product.creatorID);
            }
            acc.push(product);
          }
        }
        return acc;
      },
      []
    );
    const filteredDeliveryMethod2 = filterByMinAmount(deliveryMethod2);
    return [...filteredDeliveryMethod1, ...filteredDeliveryMethod2];
  }

  const filteredProducts = filterProducts(products);

  return filteredProducts.map((product) => {
    return <ProductCard setMarket={props.setMarket} key={product.id} product={product} detail={detail} />;
  });
};

export default DetailCard;
