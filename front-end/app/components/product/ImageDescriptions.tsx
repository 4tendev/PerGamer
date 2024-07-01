import React from "react";
import Descriptions from "./Descriptions";
import Image from "next/image";
const ImageDescriptions = (imageDescriptions: {
  detail: { title: string; img: string };
  product: { descriptions: Description[] };
}) => {
  return (
    <div className="w-full h-[90px] flex flex-col items-start justify-start relative  rounded-md ">
      <Image
        alt={imageDescriptions.detail.title}
        src={imageDescriptions.detail.img}
        fill
        className="h-full"
        style={{
          objectFit: 'contain',
        }}
      />
      <div className="absolute bottom-1 left-[1px]">
        <Descriptions descriptions={imageDescriptions.product.descriptions} />
      </div>
    </div>
  );
};

export default ImageDescriptions;
