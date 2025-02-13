import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CartItem, Product } from "../models/Cart";
import { userCartKey } from "../keys";

interface CartContextProps {
    cartItems: CartItem[],
    addToCart: (product: Product) => void,
    removeFromCart: (product: Product, decrement: boolean) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextProps>({} as CartContextProps)

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [cart, setCart] = useLocalStorage<CartItem[]>(userCartKey, [])


    const addToCart = (product: Product) => {
        console.log(product);
        
        let existingCartItem = cart.find(ci => ci.product.id == product.id)
        if (existingCartItem){
            existingCartItem.quantity += 1
            existingCartItem.subTotal = parseFloat((existingCartItem.quantity * existingCartItem.product.price).toFixed(2))
            setCart([...cart.map(ci => {
                if (ci.product.id != product.id) {
                    return ci

                } else {
                    return existingCartItem
                }

            })])
        } else {
            setCart([...cart, {id: crypto.randomUUID(), product: product, quantity: 1, subTotal: product.price}])
        }
    }

    const removeFromCart = (product: Product, decrement: boolean) => {
        let existingCartItem = cart.find(ci => ci.product.id == product.id)
        if (existingCartItem){
            if (!decrement) { 
                setCart([...cart.filter(ci => ci.product.id != product.id)]) 
                return
            }

            if (existingCartItem.quantity > 1) {
                existingCartItem.quantity -= 1
                existingCartItem.subTotal = parseFloat((existingCartItem.quantity * existingCartItem.product.price).toFixed(2))
                setCart([...cart.map(ci => {
                    if (ci.product.id != product.id) {
                        return ci
    
                    } else {
                        return existingCartItem
                    }
    
                })])
            } else {
                setCart([...cart.filter(ci => ci.product.id != product.id)])

            }
        } else {

        }
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{cartItems: cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext)
}