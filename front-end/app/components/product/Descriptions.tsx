import React from "react";

const Descriptions = (props: { descriptions: Description[] }) => {
  const descriptions: string[] = [];
  for (let index = 0; index < props.descriptions.length; index++) {
    const description = props.descriptions[index];
    description.value.split(".png)").map((description) => {
      descriptions.push(description + ".png)");
    });
  }

  return (
    <div className="flex gap-1 justify-center items-center shadow-2xl ">
      {descriptions.map((item, index) => {
        if (index < descriptions.length - 1) {
          const regex = /url\([^\)]+\)/g;
          const matches = item.match(regex);
          const textOnly = descriptions[index + 1].replace(
            /<\/?[^>]+(>|$)|\.png\)|">/g,
            " "
          );
          return matches?.map(
            (match, indexed) =>
              textOnly.length > 5 && (
                <div
                  key={index + 1}
                  className="tooltip "
                  style={{ fontSize: "5px" }}
                  data-tip={textOnly}
                >
                  <img
                    key={indexed}
                    width={25}
                    height={25}
                    style={{ fontSize: "5px" }}
                    className="mx-auto rounded-lg  tooltip "
                    data-tip={textOnly}
                    alt={""}
                    src={match.substring(4, match.length - 1)}
                  />
                </div>
              )
          );
        }
      })}
    </div>
  );
};

export default Descriptions;
