import React, { useEffect, useState } from 'react'
import TabBar from '../TabBar'
import ProductCarousel from './ProductCarousel'
import ProductGrid from './ProductGrid'
import SearchAndFilter from './SearchAndFilter'
import TopBar from '../TopBar'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { userCartKey, userFavoritesKey, userRecentlyViewedKey } from '../keys'
import { Product } from '../models/Cart'
import ProductCard from './ProductCard'
import { useCartContext } from '../context/useCartContext'
import { useNavigate } from 'react-router-dom'

const ShopView = () => {
  const navigate = useNavigate()

  const [userFavorites, setUserFavorites] = useLocalStorage<Product[]>(userFavoritesKey, [])
  const [userRecentViewed, setUserRecentViewed] = useLocalStorage<Product[]>(userRecentlyViewedKey, [])
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Recees Socks", quantity: -1, description: "", price: 9.99, image: "https://firebasestorage.googleapis.com/v0/b/silly-socks-e0923.firebasestorage.app/o/public%2FIMG_2125.JPG?alt=media&token=2a752fc3-3f8d-431e-aa24-49326ea5d92a", category: "Socks", sizes: [] },
    { id: "2", name: "Hershey Kiss", quantity: -1, description: "", price: 10.99, image: "https://firebasestorage.googleapis.com/v0/b/silly-socks-e0923.firebasestorage.app/o/public%2FIMG_2121.JPG?alt=media&token=0380de3a-8242-45ae-8228-2bc6e87be0a3", category: "Socks", sizes: [] },
    { id: "3", name: "Spongebob Tube Socks", quantity: -1, description: "", price: 11.99, image: "https://firebasestorage.googleapis.com/v0/b/silly-socks-e0923.firebasestorage.app/o/public%2FIMG_2107.JPG?alt=media&token=2cb7b12d-9178-4bfb-9cee-2b289979576b", category: "Socks", sizes: [] },
    { id: "4", name: "Tapatío Spicy Slides", quantity: -1, description: "", price: 29.99, image: "https://firebasestorage.googleapis.com/v0/b/silly-socks-e0923.firebasestorage.app/o/public%2FIMG_2106.jpg?alt=media&token=736744e2-f674-402e-96a3-08098457cbad", category: "Slides", sizes: [] },
    { id: "5", name: "Mtn Dew Slides", quantity: -1, description: "", price: 29.99, image: "https://firebasestorage.googleapis.com/v0/b/silly-socks-e0923.firebasestorage.app/o/public%2FIMG_2095.jpg?alt=media&token=5c64a8f8-cc3a-40f1-989a-a7c3e92dcce4", category: "Slides", sizes: [] },
    { id: "6", name: "Sour Patch Slippers", quantity: -1, description: "", price: 29.99, image: "https://firebasestorage.googleapis.com/v0/b/silly-socks-e0923.firebasestorage.app/o/public%2FIMG_2094.jpg?alt=media&token=14fbc6c6-3091-4f6f-aa7a-4167ba0f3fbf", category: "Slides", sizes: [] },
  ]);

  const {addToCart, removeFromCart, cartItems} = useCartContext()


  const handleFavoriteToggle = () => {

  }

  const getProducts = async () => {
    try {
      const resp = await fetch("http://localhost:5050/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (resp.status == 200) {
        const json = await resp.json()
        
        console.log(json);
        setProducts(() => {
          return json.reduce((acc, {id, name, category, description, price, quantity, image, sizes }) => {
            const product: Product = {
              id,
              name,
              category,
              description,
              price,
              quantity,
              image, 
              sizes
  
            } 
  
            acc.push(product)
  
  
            return acc
          }, [])
        })

      }

      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    getProducts()

    window.scrollTo(0,0)
  }, [])

  

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden scrollbar-hide flex flex-col font-mono bg-white">
        <TopBar />
        <div className="flex-1 flex flex-col gap-5 ">
          <SearchAndFilter />
          <div className="flex justify-end text-black pr-2 items-center gap-2 ">
            <p className='text-sm text-zinc-400'>Sort by</p>
            <select name="" id="" className='border rounded-md border-zinc-200 p-1 text-sm'>
              <option value="Price: low to high" className='text-xs'>--</option>
              <option value="Price: low to high" className='text-xs'>Price: low to high</option>
              <option value="Price: low to high" className='text-xs'>Price: high to low</option>
            </select>
          </div>
          <ProductGrid products={products} renderItem={(product) => (
            <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={() => addToCart(product)} 
                removeFromCart={() => removeFromCart(product, true)} 
                existingCartItem={cartItems.find((ci) => ci.product.id == product.id)}
                onNavigate={() => navigate(`/products/${product.id}`)}
            />
          )}/>

          <div className="max-w-[100vw] bg-black flex-1 flex flex-col pb-40 overflow-x-auto">
            <p className='p-2 text-xl font-bold text-zinc-300'>Recently Viewed</p>
            <ProductCarousel />
          </div>
        </div>
        <TabBar />
      </div>
  )
}

export default ShopView
