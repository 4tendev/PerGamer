"use client";
import React, { useState } from "react";

const Tags = (props: {
  tag: Tags;
  addorRemoveTag: Function;
  filter: Filter;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="">
      {Object.entries(props.tag).map(([key, tagArray]) => {
        return (
          <div
            key={key}
            className="collapse  collapse-arrow bg-base-300 rounded-none"
          >
            <input
              type="radio"
              name={key}
              checked={isOpen}
              readOnly
              onClick={() => setIsOpen((prev) => !prev)}
            />{" "}
            <div className="collapse-title text-info font-medium">{key}</div>
            <div className="collapse-content">
              {tagArray.map((tag) => (
                <div key={tag} className="form-control ">
                  <label className="label cursor-pointer">
                    <span className="label-text text-xs">{tag}</span>
                    <input
                      checked={
                        props.filter.selectedTags.find(
                          (selectedTag) => selectedTag == tag
                        )
                          ? true
                          : false
                      }
                      onChange={() =>
                        props.addorRemoveTag(
                          tag,
                          props.filter.selectedTags.find(
                            (selectedTag) => selectedTag == tag
                          )
                            ? false
                            : true
                        )
                      }
                      type="checkbox"
                      className="checkbox checkbox-xs"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tags;
