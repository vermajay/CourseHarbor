import React from 'react'
import SignUpForm from './SignUpForm'
import LogInForm from './LogInForm'

import { useSelector } from 'react-redux'

const Template = ({title, desc1, desc2, image, formType}) => {

    const {loading} = useSelector((state) => state.auth);

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center bg-[#F0F8F7]'>
        {
            loading ? (<div className='spinner'></div>) :
            (
                <div className='flex justify-between items-center w-11/12 max-w-maxContent mx-auto py-12 gap-x-12'>
                    <div className='w-full max-w-[450px]'>
                        <div>
                            <h1 className='text-[black] font-semibold text-[2.2rem] leading-[2.375rem]'>
                                {title}
                            </h1>
                            <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
                                <span className='text-[#4B5563]'>{desc1}</span>
                                <br/>
                                <span className='text-[#208486] text-base italic'>{desc2}</span>
                            </p>
                        </div>

                        {formType === "signup" ? <SignUpForm/> : <LogInForm/> }

                    </div>

                    <div className='relative w-11/12 max-w-[650px]'>
                        <img className='' src={image} alt='login' width={558} height={504} loading='lazy'/>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Template