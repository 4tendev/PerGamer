import React from "react";

const TitleAndTags = (detail: { title: string; tags: Tag[] }) => {
  return (
    <div>
      <div
        dir="ltr"
        className="text-[10px] font-bold  h-4 w-full overflow-hidden"
      >
        {detail.title}
      </div>
      <div
        dir="ltr"
        className="flex items-center text-[10px] gap-2 leading-3 overflow-hidden font-mono h-3 w-full ps-1"
      >
        {detail.tags.map((tag, index) => (
          <div
            key={index}
            className={" text-info shrink-0 " + (index > 1 && " hidden ")}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleAndTags;
