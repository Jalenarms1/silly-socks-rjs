import React from 'react'
import { CartItem, Product } from '../models/Cart'
import { IoIosHeartEmpty, IoMdCart } from 'react-icons/io'

interface ProductCardProps {
    product:  Product,
    addToCart: () => void,
    removeFromCart: () => void,
    existingCartItem?: CartItem,
    onNavigate: () => void
}

const ProductCard = ({product, addToCart, removeFromCart, existingCartItem, onNavigate}: ProductCardProps) => {


  return (
    <div onClick={onNavigate} className="min-w-full rounded-sm border flex flex-col gap-1 border-zinc-300 max-h-[415px] p-2 min-h-[415px] bg-zinc-900 text-red-500">
        <img src={product.image} alt='image product' className='object-cover overflow-hidden min-h-56 max-h-56 rounded-sm' />
        <div className='flex justify-between items-center'>
            <p className='text-red-500 font-semibold'>${product.price}</p>
            <IoIosHeartEmpty className='text-3xl text-zinc-400 active:scale-[.95]' />
        </div>
        <div className="flex flex-col justify-between flex-1">
            <p className='text-zinc-300'>{product.name}</p>
            {!existingCartItem ? <div onClick={addToCart} className='flex items-center justify-center active:scale-[.95] w-full bg-yellow-400 p-1 py-2 rounded-sm gap-2'>
                <IoMdCart className='text-black' />
                <p className='text-xs text-black font-semibold'>Add to cart</p>
            </div> : (
                <div className='flex items-center justify-center w-full bg-yellow-400 p-1  rounded-sm  text-black gap-2'>
                    <button onClick={removeFromCart} className='px-3'>-</button>
                    <p className='text-sm'>{existingCartItem.quantity}</p>
                    <button onClick={addToCart} className='px-3'>+</button>
                </div>
            )}
        </div> 
    </div>
  )
}

export default ProductCard
