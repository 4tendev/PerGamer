import React, { useEffect, useRef, useState } from "react";

const Contains = (props: {
  contains: string;
  setContains: Function;
  filter: Filter;
  changeContains: Function;
}) => {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      props.changeContains(props.contains);
    }, 700); // T

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [props.contains]);

  return (
    <div className="sm:max-w-56 w-full relative">
      <input
        placeholder={"Search"}
        type="text"
        className="input input-sm input-bordered w-full"
        value={props.contains}
        onChange={(event) => props.setContains(event.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-2 end-3 w-4"
        fill="currentColor"
        viewBox="0 0 512 512"
      >
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
      </svg>
    </div>
  );
};

export default Contains;
