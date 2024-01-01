import React from 'react'
import frame from '../../../assets/Images/frame.png'
import SignUpForm from './SignUpForm'
import LogInForm from './LogInForm'

import { useSelector } from 'react-redux'

const Template = ({title, desc1, desc2, image, formType}) => {

    const {loading} = useSelector((state) => state.auth);

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        {
            loading ? (<div className='spinner'></div>) :
            (
                <div className='flex justify-between items-center w-11/12 max-w-maxContent mx-auto py-12 gap-x-12'>
                    <div className='w-full max-w-[450px]'>
                        <div>
                            <h1 className='text-richBlack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>
                                {title}
                            </h1>
                            <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
                                <span className='text-richBlack-100'>{desc1}</span>
                                <br/>
                                <span className='text-blue-100 text-base italic'>{desc2}</span>
                            </p>
                        </div>

                        {formType === "signup" ? <SignUpForm/> : <LogInForm/> }

                    </div>

                    <div className='relative w-11/12 max-w-[450px]'>
                        <img className='' src={frame} alt='Pattern' width={558} height={504} loading='lazy'/>
                        <img className='absolute -top-4 right-4' src={image} alt='Students' width={558} height={504} loading='lazy'/>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Template