import React, { useEffect, useState } from 'react'
import TabBar from '../TabBar'
import logo from "../assets/sockslogo.png"
import { useCartContext } from '../context/useCartContext'
import { LuTrash2 } from "react-icons/lu";
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { httpsCallable } from 'firebase/functions';
import {functions} from "../../firebase-config"
import { CartItem } from '../models/Cart';
import { Order } from '../models/Order';
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

type CustomerInfoError = {
    name: string,
    email: string
}

const Cart = ({isSuccess = false}: {isSuccess?: boolean}) => {

    const {cartItems, addToCart, removeFromCart, clearCart} = useCartContext()
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [paymentStatus, setPaymentStatus] = useState<string>("")
    const [customerInfoError, setCustomerInfoError] = useState<CustomerInfoError>({name: "", email: ""})
    const navigate = useNavigate()

    const getSubTotal = (): number => {
        return parseFloat(cartItems.reduce((acc, ci) => acc += ci.subTotal, 0).toFixed(2))
    }

    const getTax = (): number => {
        return parseFloat(((getSubTotal() * 1.08) - getSubTotal()).toFixed(2))
    }

    const getTotalWTax = (): number => {
        return parseFloat((getTax() + getSubTotal() + 5).toFixed(2)) 
    }

    useEffect(() => {
        window.scrollTo(0,0)
    })

    useEffect(() => {
        window.document.body.style.backgroundColor = "white"


        return () => {
            window.document.body.style.backgroundColor = "black"
        }
    }, [])

    const placeOrder = async () => {
        console.log("getting checkout url");
        const order: Order = {
            id: crypto.randomUUID().toUpperCase(),
            cartItems,
            subTotal: getSubTotal(),
            tax: getTax(),
            shipping: 5,
            finalTotal: getTotalWTax(),
            status: "Unpaid",
            createdAt: Date.now()
        }
        
        const createCheckout = httpsCallable<{order: Order }, { sessionUrl: string }>(functions, "create_checkout")

        try {
            const resp = await createCheckout({order})

            console.log(resp.data);

            
            window.location.href = resp.data.sessionUrl
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        if (isSuccess) {
            clearCart()
        }
    }, [isSuccess])

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white relative w-full overflow-hidden scrollbar-hide flex flex-col font-mono p-2">
                <div className="flex flex-col gap-2">
                    <img src={logo} alt="socks logo" className='w-10 h-10' />
                    <div className="w-full flex justify-between items-center border-b border-zinc-100">
                        <p className='text-3xl'>Cart</p>
                        {cartItems.length > 0 && <p className='text-base text-green-500'>${getTotalWTax()}</p>}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex flex-col gap-5 justify-center items-center pt-20 fade-land-in">
                        <FaCheckCircle className='text-6xl text-green-600' />
                        <p className='text-3xl text-green-600'>Success</p>
                    </div>
                </div>
                <TabBar />

            </div>
        )
    }

  return (
    <Elements stripe={loadStripe(import.meta.env.VITE_SPK)}>
        <div className="min-h-screen bg-white relative w-full overflow-hidden scrollbar-hide flex flex-col font-mono p-2">
            <div className="flex flex-col gap-2">
                <img src={logo} alt="socks logo" className='w-10 h-10' />
                <div className="w-full flex justify-between items-center border-b border-zinc-100">
                    <p className='text-3xl'>Cart</p>
                    {cartItems.length > 0 && <p className='text-base text-green-500'>${getTotalWTax()}</p>}
                </div>

                {cartItems.length > 0 ? <div className="flex-1 overflow-auto">
                    <div className="flex flex-col gap-2 min-h-[100vh] max-h-[100vh]">
                        {cartItems.map(ci => (
                            <div key={ci.id} className='rounded-md border border-zinc-200 flex items-start gap-2'>
                                <img src={ci.product.image} alt='cart item' className='w-20 h-20 object-fill p-2 bg-yellow-300 shadow-md'/>
                                <div className="flex flex-col gap-2">
                                    <p className='text-base font-semibold text-red-500'>{ci.product.name}</p>
                                    <div className="flex items-center gap-4 flex-1">
                                        <p onClick={() => removeFromCart(ci.product, true)} className='px-2 border rounded-sm border-zinc-300'>-</p>
                                        <p className='text-sm'>{ci.quantity}</p>
                                        <p onClick={() => addToCart(ci.product)} className='px-2 border border-zinc-300 rounded-sm'>+</p>
                                        <LuTrash2 onClick={() => removeFromCart(ci.product, false)} className='text-red-500' />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center">
                            <div className="flex flex-col gap-2 p-2 pt-10">
                                <p className='text-sm text-zinc-600'>Subtotal:</p>

                                <p className='text-sm text-zinc-600'>Tax:</p>

                                <p className='text-sm text-zinc-600'>Shipping:</p>

                                <p className='text-sm text-zinc-600'>Total:</p>
                            </div>
                            <div className="flex flex-col gap-2 p-2 pt-10">
                                <p className='text-sm text-black'>${getSubTotal()}</p>

                                <p className='text-sm text-black'>${getTax()}</p>

                                <p className='text-sm text-black'>$5.00</p>


                                <p className='text-sm text-black'>${getTotalWTax()}</p>
                            </div>
                        </div>

                        <button onClick={placeOrder} className='bg-yellow-400 text-black font-bold text-lg p-1 rounded-sm shadow-md active:scale-[.95]'>Place Order</button>
                    </div>
                </div> : (
                    <div className="flex p-2 justify-center">
                        <button onClick={() => navigate("/")} className='border rounded-md border-red-300 text-red-500 p-3 px-4 active:scale-[.95] active:bg-zinc-100 font-semibold shadow-sm shadow-red-200'>
                            Shop now
                        </button>
                    </div>
                )}

            </div>
            <TabBar />

        </div>

    </Elements>


  )
}

export default Cart
