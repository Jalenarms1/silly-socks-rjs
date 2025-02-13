import React from 'react'
import { FaShop } from "react-icons/fa6";
import { GoListUnordered } from "react-icons/go";
import { IoMdCart } from 'react-icons/io';
import { MdOutlineAccountBox } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useCartContext } from './context/useCartContext';
import { useLocation, useNavigate } from 'react-router-dom';


const TabBar = ({}) => {
    const {pathname} = useLocation()
    const navigate = useNavigate()

    const {cartItems} = useCartContext()

  return (
    <div className="flex flex-col fixed bottom-0 w-[100vw] ">
        {/* <div className="w-full flex justify-between items-center p-1 px-2 border-t border-zinc-300 bg-zinc-900">
            <div className="flex flex-col ">
                <p className='text-red-500 text-xs font-bold'>Checkout</p>
                <p className='text-sm text-zinc-400 font-semibold'>$25.99</p>
            </div>
            <MdKeyboardArrowUp className='text-red-500' />
        </div> */}
        <div className="grid grid-cols-4 bg-zinc-100 border-t border-zinc-300 w-[100vw] p-2 px-4  items-center ">
            <div onClick={() => navigate("/")} className={`flex flex-col gap-2 items-center ${pathname == "/" ? "text-red-500" : "text-zinc-400"} `}>
                <FaShop className='text-2xl' />
                <p className='font-mono text-xs font-semibold'>Shop</p>
            </div>
            <div onClick={() => navigate("/orders")} className={`flex flex-col gap-2 items-center ${pathname == "/orders" ? "text-red-500" : "text-zinc-400"} `}>
                <GoListUnordered className='text-2xl' />
                <p className='font-mono text-xs font-semibold'>Orders</p>
            </div>
            <div onClick={() => navigate("/cart")} className={`flex flex-col gap-2 items-center ${pathname == "/cart" ? "text-red-500" : "text-zinc-400"} relative`}>
                <IoMdCart className='text-2xl' />
                <p className='font-mono text-xs font-semibold'>Cart</p>
                {cartItems.length > 0 && <div className="absolute w-4 h-4 border border-zinc-200 bg-red-500 rounded-full right-[28px] top-[-2px] flex justify-center items-center"><p className='text-xs scale-[.75]  font-semibold text-white'>{cartItems.reduce((acc, obj) =>  (acc += obj.quantity), 0)}</p></div>}
            </div>
            <div onClick={() => navigate("/account")} className={`flex flex-col gap-2 items-center ${pathname == "/account" ? "text-red-500" : "text-zinc-400"} `}>
                <MdOutlineAccountBox className='text-2xl' />
                <p className='font-mono text-xs font-semibold '>Account</p>
            </div>
        </div>

    </div>
  )
}

export default TabBar
