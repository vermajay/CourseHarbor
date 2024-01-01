import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom'
import {sendOtp, signUp} from "../services/operations/authApi"

import {HiOutlineArrowNarrowLeft} from 'react-icons/hi'
import {GiBackwardTime} from 'react-icons/gi'

const VerifyEmail = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {loading, signUpData} = useSelector((state) => state.auth)

    const [otp, setOtp] = useState()

    useEffect(()=>{
        if(!signUpData){
            navigate("/signup")
        }
    }, [])

    const submitHandler = (event) => {
        event.preventDefault();

        const{
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = signUpData;

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
    }

    return (
        <div className='grid place-items-center min-h-[calc(100vh-6rem)]'>
            {
                loading ? (<div className="spinner"></div>)
                :
                (
                    <div className='flex flex-col gap-4 max-w-md'>
                        <p className='text-richBlack-5 font-semibold text-3xl'>Verify Email</p>
                        <p className='text-richBlack-100 text-lg leading-[26px]'>A verification code has been sent to you. Enter the code below</p>

                        <form onSubmit={submitHandler}>

                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => (
                                    <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-richBlack-800 rounded-[0.5rem] text-richBlack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                    />
                                )}
                                containerStyle={{
                                    justifyContent: "space-between",
                                    gap: "0 6px",
                                }}
                            />
                            <button type='submit'
                                    className='bg-yellow-50 text-black w-full mt-6
                                    shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none 
                                    text-center text-[16px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200'>
                                Verify Email
                            </button>

                        </form>

                        <div className='flex justify-between'>

                            <Link to="/login" className='text-richBlack-5 font-medium text-base hover:scale-95 transition-all duration-200'>
                                <div className='flex items-center gap-2'>
                                    <HiOutlineArrowNarrowLeft size={20}/>
                                    <p>Back to login</p>
                                </div>
                            </Link>

                            <button onClick={()=>dispatch(sendOtp(signUpData.email, navigate))}
                             className='flex items-center gap-1 text-blue-100 font-medium text-base hover:scale-95 transition-all duration-200'>
                                <GiBackwardTime size={26}/>
                                <p>Resend it</p>
                            </button>

                        </div>
                        
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail