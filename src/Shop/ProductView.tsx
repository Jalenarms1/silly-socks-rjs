import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CartItem, Product } from '../models/Cart'
import TopBar from '../TopBar'
import { IoIosHeartEmpty, IoMdCart } from 'react-icons/io'
import { useCartContext } from '../context/useCartContext'
import { IoIosArrowBack } from "react-icons/io";


const ProductView = () => {
    const {productId} = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [existingCartItem, setExistingCartItem] = useState<CartItem | null>(null)
    const {removeFromCart, addToCart, cartItems} = useCartContext()
    const navigate = useNavigate()

    const getProduct = async (productId: string) => {
        try {
            const resp = await fetch("http://localhost:5050/products/" + productId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (resp.status == 200) {
                const product: Product = await resp.json()
    
                setProduct(product)

            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        if (productId) {
            getProduct(productId)
        }
    }, [productId])

    useEffect(() => {    
        window.scrollTo(0,0)
      }, [])

   useEffect(() => {
    setExistingCartItem(cartItems.find(ci => ci.product.id == productId))
   }, [productId, cartItems])

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden scrollbar-hide flex flex-col font-mono bg-white">
        <TopBar />
        {product ? <div className="flex-1">
            <div className="flex p-2 bg-zinc-700">
                <IoIosArrowBack onClick={() => navigate(-1)} className='text-2xl text-zinc-400' />
            </div>
            <div className="flex flex-col w-full items-center gap-5 p-5 bg-zinc-900 h-screen">
                <img src={product.image} alt='product-img' className='object-fill w-80 h-96 rounded-sm shadow-lg shadow-zinc-700' />
                {/* <div className="w-full h-[0.5px] bg-zinc-300"></div> */}

                <div className="flex flex-col gap-2 w-80 mx-auto">
                    <div className="flex justify-between items-center">
                        <p className="text-2xl font-semibold text-red-500">{product.price}</p>
                        <IoIosHeartEmpty className='text-3xl text-zinc-400 active:scale-[.95]' />

                    </div>
                    <p className='text-zinc-300 '>{product.name}</p>

                    <div className="flex flex-col gap-4 mt-5">
                        {!existingCartItem ? <div onClick={() => addToCart(product)} className='flex items-center justify-center active:scale-[.95] w-full bg-yellow-400 px-2 py-4  rounded-sm gap-2'>
                            <IoMdCart className='text-black' />
                            <p className='text-sm text-black font-semibold'>Add to cart</p>
                        </div> : (
                            <div className='flex items-center justify-center w-full bg-yellow-400 p-1  rounded-sm  text-black gap-2'>
                                <button onClick={() => removeFromCart(product, true)} className=' text-lg px-3'>-</button>
                                <p className='text-sm'>{existingCartItem.quantity}</p>
                                <button onClick={() => addToCart(product)} className='text-lg px-3'>+</button>
                            </div>
                        )}
                        <div onClick={() => addToCart(product)} className='flex items-center justify-center active:scale-[.95] w-full border border-yellow-400 px-2 py-4 rounded-sm gap-2 text-yellow-400'>
                            {/* <IoMdCart className='text-yellow-400' /> */}
                            <p className='text-sm text-yellow-400 font-semibold'>Buy now</p>
                        </div>

                    </div>
                </div>
            </div>
        </div> : (
            <p>Product not found</p>
        )}
    </div>
  )
}

export default ProductView
