export type CartItem = {
    id: string,
    product: Product,
    quantity: number,
    subTotal: number

}

export type Product = {
    id: string,
    name: string,
    price: number,
    quantity: number,
    image: string,
    category: "Socks" | "Slides" | "Charms",
    description: string,
    sizes: "Small" | "Medium" | "Large" | "X-Large"[]
}

