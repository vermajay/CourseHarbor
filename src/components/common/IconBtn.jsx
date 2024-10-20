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
        className={`flex items-center cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white ${customClasses}
        ${outline ? 'border border-[#20B486] bg-transparent' : 'bg-[#20B486]'}`}
    >
      
      {
        children ? (
            <>
                <span className={`${outline && "text-[#208486]"}`}>{text}</span>
                {children}
            </>
        )
        :
        (
            <span className={`${outline && "text-[#208486]"}`}>{text}</span>
        )
      }

    </button>
  )
}

export default IconBtn