import React, { useEffect, useState } from 'react'
import logo from ".././assets/sockslogo.png"
import { useParams, useSearchParams } from 'react-router-dom'
import { httpsCallable } from 'firebase/functions';
import {functions} from "../../firebase-config"
import { Order } from '../models/Order';
import { LuTrash2 } from 'react-icons/lu';
import TabBar from '../TabBar';
import { useCartContext } from '../context/useCartContext';

const OrderView = () => {
    const {orderId} = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [order, setOrder] = useState<Order | null>(null)
    const {clearCart, cartItems} = useCartContext()

    const getOrder = async (orderId: string) => {
        const getOrder = httpsCallable<{orderId: string}, {order: Order}>(functions, "get_order")

        const resp = await getOrder({orderId})

        console.log(resp.data);

        setOrder(resp.data.order)
        
    }

    const getSubTotal = (order: Order): number => {
        return parseFloat(order.cartItems.reduce((acc, ci) => acc += ci.subTotal, 0).toFixed(2))
    }

    const getTax = (order: Order): number => {
        return parseFloat(((getSubTotal(order) * 1.08) - getSubTotal(order)).toFixed(2))
    }

    const getTotalWTax = (order: Order): number => {
        return parseFloat((getTax(order) + getSubTotal(order) + 5).toFixed(2)) 
    }

    useEffect(() => {
        console.log(orderId);

        if (orderId) {
            getOrder(orderId)
        }
        
    }, [orderId])

    useEffect(() => {
        if (searchParams && searchParams.get("resetCart") && searchParams.get("resetCart") == "true") {
            
            if (cartItems.length > 0) clearCart()
            
        }
    }, [searchParams])

    const millisecondsToDateTime = (timestamp: number) => {
        const date = new Date(timestamp)

        console.log(date);

        let hour = date.getHours()
        const minutes = date.getMinutes()
        const isAm = hour < 12
        const month = date.getMonth()
        const day = date.getDate()
        const year = date.getFullYear()

        hour = hour % 12 || 12

        console.log(hour);
        console.log(minutes);

        return `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${isAm ? "AM" : "PM"} ${(month + 1)}/${day}/${year}`
    }

  return (
    <div className="min-h-screen bg-white relative w-full scrollbar-hide flex flex-col font-mono p-2">
        <div className="flex flex-col gap-2 px-3 overflow-y-scroll min-h-[100vh] pb-40">
            <img src={logo} alt="socks logo" className='w-10 h-10' />
            <div className="w-full flex justify-between items-center border-b border-zinc-100">
                <p className='text-3xl'>Order</p>
            </div>
           {order &&  <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <p className='text-xs text-zinc-400'>Order Id</p>
                    <p>{order.id.split("-").at(-1)}</p>
                </div>

                <div className="flex flex-col">
                    <p className='text-xs text-zinc-400'>Status</p>
                    <p className='text-green-500'>{order.status}</p>
                </div>

                <div className="flex flex-col">
                    <p className='text-xs text-zinc-400'>Placed at</p>
                    <p className=''>{millisecondsToDateTime(order.createdAt)}</p>
                </div>

                <div className="flex flex-col">
                    <p className='text-xs text-zinc-400'>Name</p>
                    <p>{order.customer_details?.name}</p>
                </div>

                <div className="flex flex-col">
                    <p className='text-xs text-zinc-400'>Email</p>
                    <p>{order.customer_details?.email}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <p className='text-xs text-zinc-400'>Items</p>

                    {order.cartItems.length > 0 && order.cartItems.slice(0, Math.min(3, order.cartItems.length)).map(ci => (
                        <div key={ci.id} className='rounded-md border border-zinc-200 flex items-start gap-2'>
                            <img src={ci.product.image} alt='cart item' className='w-20 h-20 object-fill p-2 bg-yellow-300 shadow-md'/>
                            <div className="flex flex-col gap-2">
                                <p className='text-base font-semibold text-red-500'>{ci.product.name}</p>
                                <p className='text-zinc-400 text-xs'>Quanitity: <span className='text-black'>{ci.quantity}</span></p>
                                <p className='text-zinc-400 text-xs'>Price: <span className='text-black'>{ci.product.price}</span></p>

                            </div>
                        
                        </div>
                    ))}
                </div>
                <div className="flex items-center">
                    <div className="flex flex-col gap-2 p-2 pt-10">
                        <p className='text-sm text-zinc-600'>Subtotal:</p>

                        <p className='text-sm text-zinc-600'>Tax:</p>

                        <p className='text-sm text-zinc-600'>Shipping:</p>

                        <p className='text-sm text-zinc-600'>Total:</p>
                    </div>
                    <div className="flex flex-col gap-2 p-2 pt-10">
                        <p className='text-sm text-black'>${getSubTotal(order).toFixed(2)}</p>

                        <p className='text-sm text-black'>${getTax(order).toFixed(2)}</p>

                        <p className='text-sm text-black'>$5.00</p>


                        <p className='text-sm text-black'>${getTotalWTax(order).toFixed(2)}</p>
                    </div>
                </div>
            </div>}
            
        </div>
        <TabBar />
    </div>
  )
}

export default OrderView
