import React, {useState} from 'react'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ACCOUNT_TYPE } from '../../../utils/constants' 
import { setSignUpData } from '../../../slices/authSlice'
import { sendOtp } from "../../../services/operations/authApi"

const SignUpForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // student or instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formData, setFormData] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        confirmPassword : ''
    });

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    function changeHandler(event){
        event.preventDefault();
        setFormData(prev=>(
            {
                ...prev,
                [event.target.name] : event.target.value
            }
        ))
    }

    function submitHandler(event){
        event.preventDefault();

        if(formData.password !== formData.confirmPassword){
            toast.error("Passwords Do Not Match");
            return;
        }

        const signupData = {
            ...formData,
            accountType,
        }

        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignUpData(signupData))

        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate))

        //RESET
        setFormData({
            firstName : '',
            lastName : '',
            email : '',
            password : '',
            confirmPassword : ''
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
        
    }

  return (
    <div>
      
        <div className='flex bg-richBlack-800 rounded-full max-w-max mt-4 p-1 drop-shadow-[0_2px_rgba(255,255,255,0.25)]'>
            <button onClick={()=>setAccountType(ACCOUNT_TYPE.STUDENT)} 
            className={`${accountType === ACCOUNT_TYPE.STUDENT ? "bg-richBlack-900 text-richBlack-5" : "text-richBlack-200"} px-5 py-2 rounded-full transition-all duration-200`}>
            Student</button>
            <button onClick={()=>setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}
            className={`${accountType === ACCOUNT_TYPE.INSTRUCTOR ? "bg-richBlack-900 text-richBlack-5" : "text-richBlack-200"} px-5 py-2 rounded-full transition-all duration-200`}>
            Instructor</button>
        </div>

        <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 mt-6'>

            <div className='flex w-full gap-4'>
                <label className='w-full'>
                    <p className='text-[0.875rem] text-richBlack-5 mb-1 leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
                    <input className='w-full bg-richBlack-800 rounded-[0.5rem] text-richBlack-5 p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]'
                     required type='text' name='firstName' value={formData.firstName} placeholder='Enter first name' onChange={changeHandler}/>
                </label>
                <label className='w-full'>
                    <p className='text-[0.875rem] text-richBlack-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                    <input className='w-full bg-richBlack-800 rounded-[0.5rem] text-richBlack-5 p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]'
                     required type='text' name='lastName' value={formData.lastName} placeholder='Enter last name' onChange={changeHandler}/>
                </label>
            </div>
            
            <label>
                <p className='text-[0.875rem] text-richBlack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                <input className='w-full bg-richBlack-800 rounded-[0.5rem] text-richBlack-5 p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]'
                 required type='email' name='email' value={formData.email} placeholder='Enter email address' onChange={changeHandler}/>
            </label>

            <div className='flex w-full gap-4'>
                <label className='relative w-full'>
                    <p className='text-[0.875rem] text-richBlack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                    <input className='w-full bg-richBlack-800 rounded-[0.5rem] text-richBlack-5 p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]'
                     required type={showPassword?"text":"password"} name='password' value={formData.password} placeholder='Enter Password' onChange={changeHandler}/>
                    <span className='absolute text-richBlack-200 right-3 top-[38px] cursor-pointer'
                     onClick={()=>setShowPassword(prev=>!prev)}>
                        {showPassword ? 
                        <AiOutlineEyeInvisible fontSize={24}/> : 
                        <AiOutlineEye fontSize={24}/>}
                    </span>
                </label>
                <label className='relative w-full'>
                    <p className='text-[0.875rem] text-richBlack-5 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                    <input className='w-full bg-richBlack-800 rounded-[0.5rem] text-richBlack-5 p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]'
                     required type={showConfirmPassword?"text":"password"} name='confirmPassword' value={formData.confirmPassword} placeholder='Confirm Password' onChange={changeHandler}/>
                    <span className='absolute text-richBlack-200 right-3 top-[38px] cursor-pointer'
                     onClick={()=>setShowConfirmPassword(prev=>!prev)}>
                        {showConfirmPassword ? 
                        <AiOutlineEyeInvisible fontSize={24}/> : 
                        <AiOutlineEye fontSize={24}/>}
                    </span>
                </label>
            </div>

            <button className='bg-yellow-50 rounded-[8px] font-medium text-richBlack-900 px-[12px] py-[8px] mt-6'>
                Create Account
            </button>

        </form>

    </div>
  )
}

export default SignUpForm