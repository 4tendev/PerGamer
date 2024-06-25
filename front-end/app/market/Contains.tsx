import React, { useEffect, useState } from "react";

const Contains = (props: {
  contains: string;
  setContains: Function;
  filter: Filter;
  changeContains: Function;
}) => {
  useEffect(() => {
    props.changeContains(props.contains);

    return () => {};
  }, [props.contains]);

  return (
    <input
      type="text"
      className="input input-sm input-bordered max-w-56"
      value={props.contains}
      onChange={(event) => props.setContains(event.target.value)}
    />
  );
};

export default Contains;
