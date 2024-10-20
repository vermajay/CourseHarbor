import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {apiConnector} from '../../../services/apiConnector'
import {contactUsEndpoint} from '../../../services/apis'
import countryCode from '../../../data/countrycode.json'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

const ContactUsForm = () => {

    const {token} = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);

    const{
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    }
    = useForm();

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    }, [reset, isSubmitSuccessful]);   //whenever reset function definition changes upon some changes in the form upon clicking of  some field which results in addition or deletion of some other form field, we want to reset the form

    const submitContactForm = async(data) => {
        console.log("Form Data-> ", data);

        if(!token){
            toast.error("You need to login first");
            return;
        }

        try{
            setLoading(true);
            const response = await apiConnector("POST", contactUsEndpoint.CONTACT_US_API, {data, token});
            console.log("CONTACT US API RESPONSE...... ", response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("We have recieved your message")

            setLoading(false);
        }
        catch(error){
            console.log("Error in sending message-> ", error.message);
            toast.error("Error in recieving your message")
            setLoading(false);
        }
    }
 
  return (
    <form onSubmit={handleSubmit(submitContactForm)} className='text-black text-sm leading-[22px] flex flex-col gap-7
     max-w-xl'>
      
        {/* name */}
        <div className='flex gap-5 min-w-full'>

            {/* firstname */}
            <div className='flex flex-col gap-2 w-[48%]'>
                <label htmlFor='firstname'>First Name</label>
                <input className='w-full bg-white rounded-[0.5rem] text-black p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base focus:outline-[#1A9068]'
                    type='text'
                    id='firstname'
                    placeholder='Enter first name'
                    {...register("firstname", {required:true})}
                />
                {
                    errors.firstname && (
                        <span className='text-[#20B486]'>
                            Please enter your name
                        </span>
                    )
                }
            </div>

            {/* lastname */}
            <div className='flex flex-col gap-2 w-[48%]'>
                <label htmlFor='lastname'>Last Name</label>
                <input className='w-full bg-white rounded-[0.5rem] text-black p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base focus:outline-[#1A9068]'
                    type='text'
                    id='lastname'
                    placeholder='Enter last name'
                    {...register("lastname")}
                />
            </div>

        </div>

        {/* email */}
        <div className='flex flex-col gap-2'>
            <label htmlFor='email'>Email Address</label>
            <input className='w-full bg-white rounded-[0.5rem] text-black p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base focus:outline-[#1A9068]'
                type='email'
                id='email'
                placeholder='Enter email address'
                {...register("email", {required:true})}
            />
            {
                errors.email && (
                    <span className='text-[#20B486]'>
                        Please enter your email
                    </span>
                )
            }
        </div>

        {/* phone number */}
        <div className='flex flex-col gap-2'>

            <label htmlFor='phonenumber'>Phone Number</label>

            <div className='flex gap-5'>

                {/* dropdown */}
                <select className='w-[15%] bg-white rounded-[0.5rem] text-black p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base focus:outline-[#1A9068]'
                {...register("countrycode", {required:true})}
                >
                    <option value="+91">+91 - India</option>
                    {
                        countryCode.map((element, index) => (
                            <option key={index} value={element.code}>
                                {element.code} - {element.country}
                            </option>
                        ))
                    }
                </select>

                {/* phonenumber */}
                <input className='w-[81%] bg-white rounded-[0.5rem] text-black p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base focus:outline-[#1A9068]'
                    type='number'
                    id='phonenumber'
                    placeholder='12345 67890'
                    {
                        ...register("phoneNo", {
                            required: {value : true, message : "Please enter phone number"},
                            maxLength: {value : 12, message : "Invalid phone number"},
                            minLength: {value : 8, message : "Invalid phone number"}
                        }
                        )
                    }
                />

            </div>

            {
                errors.phoneNo && (
                    <span className='text-[#20B486]'>
                        {errors.phoneNo.message}
                    </span>
                )
            }

        </div>

        {/* message */}
        <div className='flex flex-col gap-2'>
            <label htmlFor='message'>Message</label>
            <textarea className='w-full bg-white rounded-[0.5rem] text-black p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base focus:outline-[#1A9068]'
                id='message'
                placeholder='Enter message'
                rows={7}
                cols={30}
                {...register("message", {required:true})}
            />
            {
                errors.message && (
                    <span className='text-[#20B486]'>
                        Please enter your message
                    </span>
                )
            }
        </div>

        {/* submit button */}
        <button className={`${loading ? 'bg-[#20B486] cursor-wait' : 'bg-[#20B486] hover:shadow-none hover:scale-95 transition-all duration-200'} text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] text-center text-[16px] px-6 py-3 rounded-md font-bold w-full`}>
            Send Message
        </button>

    </form>
  )
}

export default ContactUsForm