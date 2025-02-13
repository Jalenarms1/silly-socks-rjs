import React from 'react'
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Product } from '../models/Cart'
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({products, renderItem}: {products: Product[], renderItem: (product: Product) => React.ReactNode}) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 px-1 gap-1'>
      {products.map((product, i) => (
        renderItem(product)
      ))}

        <div className="min-w-full rounded-sm border active:scale-[.95] flex flex-col justify-center items-center gap-1 border-zinc-300 max-h-80 p-2 min-h-80  text-red-500">
            <div className="flex flex-col items-center gap-2">
                <FaRegArrowAltCircleRight className='text-4xl text-zinc-400' />
                <p className='text-sm'>See more</p>
            </div>
        </div>
    </div>
  )
}

export default ProductGrid
