"use client";
import React, { useEffect, useRef, useState } from "react";
import Filter from "./Filter";
import { fetchapi } from "@/commonTsBrowser/fetchAPI";
import ProductCard from "./card/ProductCard";
import Contains from "./Contains";
const Market = (props: {
  platforms: Platform[];
  market: Market;
  platform: Platform | undefined;
}) => {
  const [market, setMarket] = useState<Market>(props.market);
  const [fetching, setFetching] = useState(false);
  const [contains, setContains] = useState<string>("");
  const platforms = props.platforms;
  const [platform, setPlatform] = useState<Platform | undefined>(
    props.platform
  );
  const isFirstRender = useRef(true);
  function defaultFilterMaker() {
    const filter = {
      appid: platform?.appid ?? 0,
      contains: "",
      selectedTags: [],
      offset: 0,
    };
    return filter;
  }

  function addorRemoveTag(tag: string, isAdd: boolean) {
    isAdd
      ? setFilter((prev) => {
          const newSelectedTags = Array.from(
            new Set([...prev.selectedTags, tag])
          );
          return { ...prev, selectedTags: newSelectedTags, offset: 0 };
        })
      : setFilter((prev) => {
          const selectedTags = prev.selectedTags;

          return {
            ...prev,
            selectedTags: selectedTags.filter((oldTag) => oldTag != tag),
            offset: 0,
          };
        });
  }

  function changeContains(contains: string) {
    (contains.length > 2 || contains == "") &&
      contains != filter.contains &&
      setFilter((prev) => {
        return { ...prev, contains: contains, offset: 0 };
      });
  }

  const [filter, setFilter] = useState<Filter>({
    appid: platform?.appid ?? 0,
    contains: "",
    selectedTags: [],
    offset: 30,
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      resetDefault();
    }
  }, [platform]);

  function resetDefault() {
    setContains("")
    setFilter(defaultFilterMaker());
    setMarket({ products: [], details: [] });
  }

  async function getmarket() {
    const params = new URLSearchParams();
    if (filter.appid !== 0) {
      params.append("appid", String(filter.appid));
    }
    if (filter.contains.length >= 3) {
      params.append("contains", filter.contains);
    }
    if (filter.selectedTags.length > 0) {
      params.append("tags", JSON.stringify(filter.selectedTags)); // Convert array to comma-separated string
    }
    params.append("offset", String(filter.offset));
    const url = `/market/?${params.toString()}`;

    setFetching(true);
    const offset = filter.offset;
    await fetchapi(url, "GET").then((response) => {
      if (response.code == "200") {
        setFilter((prev) => ({
          ...prev,
          offset: offset + (response.data.details.length == 30 ? 30 : 1),
        }));
        setMarket((prev) => {
          const newMarket =
            filter.offset === 0
              ? {
                  products: [...response.data.products],
                  details: [...response.data.details],
                }
              : {
                  products: [...prev.products, ...response.data.products],
                  details: [...prev.details, ...response.data.details],
                };

          return newMarket;
        });
      }
      setFetching(false);
    });
  }
  useEffect(() => {
    filter.offset === 0 && getmarket();
    return () => {};
  }, [filter]);
  return (
    <div className="h-full flex flex-col ">
      <div className="flex flex-wrap gap-x-10 items-center w-full justify-between sm:justify-center my-3 gap-3  px-3 sm:h-8 h-20">
        <div className="flex justify-between items-center sm:w-fit w-full item-center">
          <select
            className="select select-sm select-bordered select-info"
            onChange={(event) =>
              setPlatform(
                platforms.find(
                  (platform) => platform.game == event.target.value
                )
              )
            }
            value={platform?.game}
          >
            <>
              <option value="">Game : All </option>
              {platforms.map((platform) => (
                <option key={platform.game} value={platform.game}>
                  {platform.game}
                </option>
              ))}
            </>
          </select>

          {platform && (
            <div className="drawer z-10  sm:hidden border w-fit rounded-lg px-3 py-0.5 ">
              <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle "
              />

              <div className="drawer-content ">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer"
                  className="  drawer-button  w-fit  h-fit flex gap-5 items-center "
                >
                  filter
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-5 h-5"
                    viewBox="0 0 512 512"
                  >
                    <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                  </svg>
                </label>
              </div>
              <div className="drawer-side ">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>

                <ul className="menu p-4 w-5/6 min-h-full bg-base-200 text-base-content  sm:absolute">
                  {
                    <Filter
                      changeContains={changeContains}
                      filter={filter}
                      addorRemoveTag={addorRemoveTag}
                      key={1}
                      tags={platform.tags}
                    ></Filter>
                  }
                </ul>
              </div>
            </div>
          )}
        </div>
        <Contains
          filter={filter}
          changeContains={changeContains}
          contains={contains}
          setContains={setContains}
        />
      </div>
      <div
        dir="ltr"
        className={
          "flex px-3 sm:px-5    overflow-auto " + (platform ? " sm:ps-40 " : "")
        }
      >
        {platform && (
          <div className="hidden sm:block w-36 absolute  start-3">
            {" "}
            {
              <Filter
                changeContains={changeContains}
                filter={filter}
                addorRemoveTag={addorRemoveTag}
                key={2}
                tags={platform.tags}
              ></Filter>
            }
          </div>
        )}
        <div className="flex flex-wrap grow px-4 gap-3 justify-center  ">
          {market.products.length > 0 ? (
            market.details.map((detail) => {
              const products = market.products.filter(
                (product) => product.detailID == detail.id
              );
              if (products.length > 0) {
                return (
                  <ProductCard
                    key={detail.id}
                    detail={detail}
                    products={products}
                  />
                );
              }
            })
          ) : (
            <div className="flex gap-5">
              Oh no Nothing to show{" "}
              <button className="btn btn-warning btn-xs" onClick={resetDefault}>
                Reset Filters
              </button>
            </div>
          )}
          {fetching && (
            <span className="loading loading-ring text-error loading-lg h-fit"></span>
          )}
        </div>
      </div>
    </div>
  );
};
export default Market;
