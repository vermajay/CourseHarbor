import React from 'react'
import {BsArrowUpRight} from 'react-icons/bs'

const CategoryCard = ({title}) => {
  return (
    <div className='category bg-white p-4 shadow-lg rounded-md flex items-center gap-4 justify-between border border-transparent hover:border-[#1a9068] hover:cursor-pointer group/edit'>
        <div className="flex text-lg font-semibold pl-4">
          {title}
        </div>
        <div className="rounded-lg p-3 group-hover/edit">
          <BsArrowUpRight size={30} style={{ color:'#1a9068' }} className='icon'/>
        </div>
    </div>
  )
}

export default CategoryCard