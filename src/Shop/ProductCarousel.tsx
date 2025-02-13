import React from 'react';
import socks1 from "../assets/socks1.jpeg";
import socks2 from "../assets/socks2.jpeg";
import socks3 from "../assets/socks3.jpeg";
import slides1 from "../assets/slides1.jpg";
import slides2 from "../assets/slides2.jpg";
import slides3 from "../assets/slides3.jpg";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const ProductCarousel = () => {
    let images = [socks1, socks2, socks3, slides1, slides2, slides3];

    return (
        <div className="relative w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="flex gap-2 px-2">
                {images.map((image, i) => (
                    <div key={i} className="min-w-[50vw] max-w-[50vw] rounded-sm border flex flex-col gap-1 border-zinc-800  max-h-96 p-2 min-h-96 bg-zinc-900 text-red-500">
                        <img src={image} alt='image product' className='object-fill min-h-48 max-h-48 rounded-sm' />
                        <div className='flex justify-between items-center'>
                            <p className='text-red-500 font-semibold'>$9.99</p>
                            <IoIosHeartEmpty className='text-3xl text-zinc-400 active:scale-[.95]' />
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                            <p className='text-zinc-300'>Receese Socks</p>
                            <div className='flex items-center justify-center w-full bg-yellow-400 p-1 rounded-sm gap-2'>
                                <IoMdCart className='text-black' />
                                <p className='text-xs text-black font-semibold'>Add to cart</p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* "See more" button */}
                <div className="w-48 flex-shrink-0 rounded-sm border active:scale-[.95] flex flex-col justify-center items-center gap-1 border-zinc-600 p-2 text-red-500">
                    <div className="flex flex-col items-center gap-2">
                        <FaRegArrowAltCircleRight className="text-4xl text-zinc-400" />
                        <p className="text-sm">See more</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;
