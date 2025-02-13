import React from 'react'
import { BsSliders2 } from 'react-icons/bs'
// import { HiMiniMagnifyingGlass } from 'react-icons/hi2'
import { CiSearch } from "react-icons/ci";


const SearchAndFilter = () => {
  return (
    <div className="flex flex-col gap-2">
        <div className="flex p-1 gap-2">
            <div className="flex bg-zinc-100 p-2 w-full items-center gap-2 rounded-sm border border-zinc-300">
            <CiSearch className='text-zinc-600' />
            <input type="text" placeholder='Search for a theme or product'  className='text-base text-black font-sans focus:outline-0 w-full'/>
            </div>
            {/* <div className="flex active:scale-[.95] bg-zinc-100 p-2 w-1/5 items-center justify-center gap-2 rounded-sm border border-zinc-300">
            <BsSliders2 className='text-red-500 text-2xl' />
            </div> */}
        </div>
        <div className="grid grid-cols-4 gap-1 px-1">
            <p className='text-sm font-semibold text-center active:scale-[.95] bg-red-500 p-2 rounded-sm text-white'>
            All
            </p>
            <p className='text-sm font-semibold text-center active:scale-[.95] bg-zinc-400 p-2 rounded-sm text-white'>
            Socks
            </p>
            <p className='text-sm font-semibold text-center active:scale-[.95] bg-zinc-400 p-2 rounded-sm text-white'>
            Slides
            </p>
            <p className='text-sm font-semibold text-center active:scale-[.95] bg-zinc-400 p-2 rounded-sm text-white'>
            Charms
            </p>
        </div>
    </div>
  )
}

export default SearchAndFilter
