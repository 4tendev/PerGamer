import React, { useEffect, useState } from "react";

const Contains = (props: { filter: Filter; changeContains: Function }) => {
  const [contains, setContains] = useState<string>(props.filter.contains);
  useEffect(() => {
    props.changeContains(contains);

    return () => {};
  }, [contains]);
  return (
    <input
      type="text"
      className="input input-sm input-bordered max-w-56"
      value={contains}
      onChange={(event) => setContains(event.target.value)}
    />
  );
};

export default Contains;
