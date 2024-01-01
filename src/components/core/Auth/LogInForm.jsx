import React, { useState } from 'react'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import { useDispatch } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';

import { login } from "../../../services/operations/authApi"

const LogInForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    const [formData, setFormData] = useState({
        email : '',
        password : ''
    });
    const [showPassword, setShowPassword] = useState(false);

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
        dispatch(login(formData.email, formData.password, navigate))
    }

  return (
    <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 mt-6'>

        <label className='w-full'>
            <p className='text-[0.875rem] text-richBlack-5 mb-1 leading-[1.375rem]'>Email Address
            <sup className='text-pink-200'>*</sup>
            </p>
            <input className='w-full bg-richBlack-800 rounded-[0.5rem] text-richBlack-5 p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]'
             required type='email' name='email' value={formData.email} placeholder='Enter email address' onChange={changeHandler}/>
        </label>

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richBlack-5 mb-1 leading-[1.375rem]'>Password
            <sup className='text-pink-200'>*</sup>
            </p>
            <input className='w-full bg-richBlack-800 rounded-[0.5rem] text-richBlack-5 p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)]'
             required type={showPassword?"text":"password"} name='password' value={formData.password} placeholder='Enter Password' onChange={changeHandler}/>
            
            <span className='absolute text-richBlack-200 right-3 top-[38px] cursor-pointer'
             onClick={()=>setShowPassword(prev=>!prev)}>
                {showPassword ? 
                <AiOutlineEyeInvisible fontSize={24}/> : 
                <AiOutlineEye fontSize={24}/>}
            </span>
            <Link to="/forgot-password">
                <p className='text-sm mt-1 text-blue-100 absolute right-0'>Forgot Password</p>
            </Link>
        </label>

        <button className='bg-yellow-50 rounded-[8px] font-medium text-richBlack-900 px-[12px] py-[8px] mt-12'>
            Sign In
        </button>

    </form>
  )
}

export default LogInForm