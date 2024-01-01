import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({active, linkTo, children}) => {     //CTA - call to action button
  return (
    <Link to={linkTo}>
      <div className={`${active ? 'bg-yellow-50 text-black' : 'bg-richBlack-800 text-white'}
      shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none 
       text-center text-[16px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200`}>
        {children}
      </div>
    </Link>
  )
}

export default CTAButton
