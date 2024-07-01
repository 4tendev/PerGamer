import React from "react";

const Page = () => {
  return (
    <div className="flex w-full sm:justify-center pt-2 gap-3 sm:flex-row  flex-col  px-4 h-full">
      <div className="w-full sm:max-w-lg">
        <div className="text-2xl ">Your Credits</div>
        <div className="flex flex-col sm:flex-row items-center sm:w-fit gap-3 w-full sm:text-xs">
          <div className="flex items-center justify-between w-full sm:w-fit max-w-[300px]">
            123 USDT{" "}
            <div className="join mx-1">
              <button className="btn btn-success btn-sm join-item sm:btn-xs"> + </button>
              <button className="btn btn-warning btn-sm  join-item sm:btn-xs"> - </button>
            </div>
          </div>
          <div className="flex items-center justify-between w-full sm:w-fit max-w-[300px]">
            123 Toman{" "}
            <div className="join mx-1">
              <button className="btn btn-success btn-sm sm:btn-xs join-item"> + </button>
              <button className="btn btn-warning btn-sm  join-item sm:btn-xs"> - </button>
            </div>
          </div>
          <div className="flex items-center justify-between w-full sm:w-fit max-w-[300px]">
            123 BTC
            <div className="join mx-1">
              <button className="btn btn-success btn-sm join-item sm:btn-xs"> + </button>
              <button className="btn btn-warning btn-sm  join-item sm:btn-xs"> - </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grow-y overflow-auto w-full sm:w-fit min-w-[240px]">
        <div className="text-xl text-info ">Your last transactions</div>
        asdasd 213123 asdad
        <br />

      </div>
    </div>
  );
};

export default Page;
