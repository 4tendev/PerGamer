import React from "react";
import Descriptions from "./Descriptions";

const ImageDescriptions = (imageDescriptions: {
  detail: { title: string; img: string };
  product: { descriptions: Description[] };
}) => {
  const bgImage= `url(${imageDescriptions.detail.img})`
  return (
<div 
  className="w-full h-[90px] flex flex-col items-start justify-start relative bg-contain bg-center bg-no-repeat rounded-md"
  style={{ backgroundImage:bgImage, backgroundSize: 'contain' }}
>
  <div className="absolute bottom-1 left-0.5">
    <Descriptions descriptions={imageDescriptions.product.descriptions} />
  </div>
</div>
  );
};

export default ImageDescriptions;
