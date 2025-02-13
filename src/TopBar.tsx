import React from 'react'
import { IoMdCart } from 'react-icons/io'
import socksLogo from "./assets/sockslogo.png"
import { useCartContext } from './context/useCartContext'
import { useNavigate } from 'react-router-dom'


const TopBar = () => {
    const {cartItems} = useCartContext()
    const navigate = useNavigate()

  return (
    <div className="flex bg-black w-[100vw] p-2 px-4 justify-between items-center">
        <img src={socksLogo} alt="logo" className='w-12 h-12' />

        <div className="relative">
          <IoMdCart onClick={() => navigate("/cart")} className='text-3xl text-yellow-100' />
          {cartItems.length > 0 && <div className="w-4 h-4 bg-red-500 rounded-full absolute right-[-4px] top-[-3px] flex justify-center items-center"><p className='text-xs scale-[.9] font-semibold text-white'>{cartItems.reduce((acc, obj) =>  (acc += obj.quantity), 0)}</p></div>}
        </div>
    </div>
  )
}

export default TopBar
