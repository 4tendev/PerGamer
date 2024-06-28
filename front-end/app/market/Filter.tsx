import React, { useEffect, useMemo, useState } from "react";
import Tags from "./Tags";
const Filter = (props: {
  tags: Tags;
  addorRemoveTag: Function;
  filter: Filter;
}) => {
  const tags = props.tags;
  return (
    <div dir="ltr" className="h-fit flex flex-col gap-3 w-full ">
      Filters
      <div className="sm:h-[70vh] overflow-auto">
        {Object.entries(tags).map(([key, tagArray]) => {
          const tag = { [key]: tagArray };
          return (
            <Tags
              filter={props.filter}
              addorRemoveTag={props.addorRemoveTag}
              key={key}
              tag={tag}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
