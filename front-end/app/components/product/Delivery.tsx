import React from 'react'

const Delivery = ( product :{deliveryMethod : Product["deliveryMethod"] } ) => {
  return (
    <div className="flex justify-between w-full text-[10px] px-1 ">
    {product.deliveryMethod == 1 ? (
      <>
        <div className="">{"deliver  day"}</div>
        <div>2 H </div>
      </>
    ) : (
      <>
        <div>Dota2 Gift</div>
        <div>{"seller's profile"}</div>
      </>
    )}
  </div>
  )
}

export default Delivery