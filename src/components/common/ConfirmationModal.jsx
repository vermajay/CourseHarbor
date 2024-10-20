import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm'>
        <div className='w-11/12 max-w-[350px] bg-[#F0F8F7] p-6 rounded-lg border border-black'>
            <div>
                <p className="text-2xl font-semibold text-black">{modalData?.text1}</p>
                <p className="mt-3 mb-5 leading-6 text-[#4B5563]">{modalData?.text2}</p>
            </div>
            <div className='flex gap-4'>
                <IconBtn text={modalData?.btn1Text} onclick={modalData?.btn1Handler}/>

                <button onClick={modalData?.btn2Handler} 
                    className='cursor-pointer rounded-md bg-richBlack-200 py-[8px] px-[20px] font-semibold text-richBlack-900'>
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal