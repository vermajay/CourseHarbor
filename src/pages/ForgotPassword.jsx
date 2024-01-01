import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {HiOutlineArrowNarrowLeft} from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authApi'

const ForgotPassword = () => {

    const {loading} = useSelector((state) => state.auth)

    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")

    const dispatch = useDispatch()

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

    return (
        <div className='grid place-items-center min-h-[calc(100vh-6rem)]'>
            {
                loading ? (<div className="spinner"></div>)
                :
                (
                    <div className='flex flex-col gap-4 max-w-md'>
                        
                        <p className='text-richBlack-5 font-semibold text-3xl'>
                            {
                                !emailSent ? "Reset your password" : "Check email"
                            }
                        </p>

                        <p className='text-richBlack-100 text-lg leading-[26px]'>
                            {
                                !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery."
                                :
                                `We have sent the reset email to ${email}.`
                            }
                        </p>

                        <form onSubmit={submitHandler}>

                            {
                                !emailSent && (
                                    <label className='w-full'>
                                        <p className='text-[0.875rem] text-richBlack-5 mb-1 leading-[1.375rem]'>Email Address
                                        <sup className='text-pink-200'>*</sup>
                                        </p>
                                        <input className='w-full bg-richBlack-800 rounded-[0.5rem] text-richBlack-5 p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] mb-6'
                                        required type='email' name='email' value={email} placeholder='Enter email address' 
                                        onChange={(e)=>setEmail(e.target.value)}/>
                                    </label>
                                )
                            }
                            
                            <button type='submit'
                                    className='bg-yellow-50 text-black w-full
                                    shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none 
                                    text-center text-[16px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200'>
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
                            </button>

                        </form>

                        <div className='flex justify-start'>

                            <Link to="/login" className='text-richBlack-5 font-medium text-base hover:scale-95 transition-all duration-200'>
                                <div className='flex items-center gap-2'>
                                    <HiOutlineArrowNarrowLeft size={20}/>
                                    <p>Back to login</p>
                                </div>
                            </Link>

                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword