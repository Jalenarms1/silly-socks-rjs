import { CartItem } from "./Cart"

export type Order = {
    id: string,
    cartItems: CartItem[]
    subTotal: number,
    tax: number,
    shipping: number,
    shipping_details?: {
        city: string,
        country: string,
        line1: string,
        line2?: string,
        postal_code: string,
        state: string
    },
    customer_details?: {
        name: string,
        email: string
    }
    finalTotal: number,
    createdAt: number,
    status: "Unpaid" | "Paid" | "Refunded" | "Comfirmed" | "Shipped"
}