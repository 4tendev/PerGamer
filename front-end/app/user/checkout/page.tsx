import React from "react";
import { cookies } from "next/headers";
import CheckOutCard from "./CheckOutCard";

const Page = async () => {
  const cookieStore = cookies();
  const card = cookieStore.get("ShoppingCard");
  const credit = 123123123;
  const shoppingCard = card?.value ? JSON.parse(card.value) : [];
  if (shoppingCard.length == 0) {
    return (
      <div className="flex flex-wrap grow px-1 gap-3 justify-center  ">
        HERE
      </div>
    );
  }


  return (
    <div className="flex flex-col pt-2 h-full">
      <div className="flex justify-center w-full ">
        Total Price : asdas{" "}
        <button className="btn btn-error btn-xs ">Removeall</button>
      </div>

      <div className="flex flex-wrap sm:grow-0 grow px-1 gap-3 justify-center  py-3 overflow-auto">
        {" "}
        {shoppingCard.map((card) => (
          <CheckOutCard  />
        ))}
      </div>
      <div className="flex flex-col gap-3 bg-base-200  w-full sm:py-5 pt-5">
        <div className="flex justify-between w-64 m-auto bg-transparent ">
          <div className="bg-transparent">تعداد آیتم در سبد :</div>
          <div>{shoppingCard?.length} عدد</div>
        </div>
        <div className="flex justify-between w-64 m-auto bg-transparent ">
          <div className="bg-transparent">قیمت کل :</div>
          <div>{credit.toLocaleString()} تومان</div>
        </div>
        <div className="flex justify-between w-64 m-auto bg-transparent ">
          <div className="bg-transparent">اعتبار کیف پول :</div>
          <div>{credit.toLocaleString()} تومان</div>
        </div>

        <button className="btn btn-success w-full sm:w-fit sm:rounded sm:btn-sm rounded-none  mx-auto">
          Check out
        </button>
      </div>
    </div>
  );
};

export default Page;
