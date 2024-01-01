import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type
}) => {
  return (
    <button
        disabled={disabled}
        onClick={onclick}
        type={type}
        className={`flex items-center cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richBlack-900 ${customClasses}
        ${outline ? 'border border-yellow-50 bg-transparent' : 'bg-yellow-50'}`}
    >
      
      {
        children ? (
            <>
                <span className={`${outline && "text-yellow-50"}`}>{text}</span>
                {children}
            </>
        )
        :
        (
            <span className={`${outline && "text-yellow-50"}`}>{text}</span>
        )
      }

    </button>
  )
}

export default IconBtn