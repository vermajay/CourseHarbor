import React from 'react'
import { useForm } from 'react-hook-form'
import { updateProfile } from '../../../../services/operations/settingsApi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../common/IconBtn'

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const EditProfile = () => {

  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {register, handleSubmit, formState: {errors}} = useForm();

  const submitHandler = async(data) => {
    try{
      dispatch(updateProfile(token, data));
    }
    catch(error){
      console.log("ERROR WHILE SUBMITTING EDIT PROFILE DATA - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>

      <div className='flex flex-col gap-6 py-8 px-12 mb-8 rounded-lg text-richBlack-5 text-sm leading-[22px] border border-richBlack-700 bg-richBlack-800'>

        <div className='font-semibold text-lg'>Profile Information</div>

        {/* first name and last name */}
        <div className='lg:flex gap-5'>
          {/* first name  */}
          <div className='flex flex-col gap-2 lg:w-[48%]'>
            <label htmlFor='firstName'>First Name</label>
            <input className='w-full bg-richBlack-700 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base'
              type='text'
              id='firstName'
              placeholder="Enter first name"
              {...register("firstName", {required: true})}
              defaultValue={user?.firstName}
            />
            {
              errors.firstName && (
                <span className='text-sm -mt-1 text-yellow-50'>
                  Please enter your first name.
                </span>
              )
            }
          </div>
          {/* last name  */}
          <div className='flex flex-col gap-2 lg:w-[48%]'>
            <label htmlFor='lastName'>Last Name</label>
            <input className='w-full bg-richBlack-700 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base'
              type='text'
              id='lastName'
              placeholder="Enter last name"
              {...register("lastName", {required: true})}
              defaultValue={user?.lastName}
            />
            {
              errors.lastName && (
                <span className='text-sm -mt-1 text-yellow-50'>
                  Please enter your last name.
                </span>
              )
            }
          </div>
        </div>

        {/* date of birth and gender */}
        <div className='lg:flex gap-5'>
          {/* date of birth */}
          <div className='flex flex-col gap-2 lg:w-[48%]'>
            <label htmlFor='dateOfBirth'>Date of Birth</label>
            <input className='w-full bg-richBlack-700 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base'
              type='date'
              id='dateOfBirth'
              {...register("dateOfBirth", {
                required: {
                  value: true,
                  message: "Please enter your Date of Birth."
                },
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future."
                }
              })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
            />
            {
              errors.dateOfBirth && (
                <span className='text-sm -mt-1 text-yellow-50'>
                  {errors.dateOfBirth.message}
                </span>
              )
            }
          </div>
          {/* gender */}
          <div className='flex flex-col gap-2 lg:w-[48%]'>
            <label htmlFor='gender'>Gender</label>
            <select className='w-full bg-richBlack-700 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base'
              type='text'
              id='gender'
              placeholder="Enter last name"
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender}
            >

              {
                genders.map((gender, index) => {
                  return (
                    <option key={index} value={gender}>{gender}</option>
                  )
                })
              }

            </select>
            {
              errors.gender && (
                <span className='text-sm -mt-1 text-yellow-50'>
                  {errors.gender.message}
                </span>
              )
            }
          </div>
        </div>

        {/* contact number and about */}
        <div className='lg:flex gap-5'>
          {/* contact number */}
          <div className='flex flex-col gap-2 lg:w-[48%]'>
            <label htmlFor='contactNumber'>Contact Number</label>
            <input className='w-full bg-richBlack-700 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base'
              type='number'
              id='contactNumber'
              placeholder="Enter Contact Number"
              {...register("contactNumber", {
                required: {
                  value: true,
                  message: "Please enter your Contact Number."
                },
                maxLength: {
                  value: 12,
                  message: "Contact Number too large"
                },
                minLength: {
                  value: 8,
                  message: "Contact Number too small"
                }
              })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {
              errors.contactNumber && (
                <span className='text-sm -mt-1 text-yellow-50'>
                  {errors.contactNumber.message}
                </span>
              )
            }
          </div>
          {/* about */}
          <div className='flex flex-col gap-2 lg:w-[48%]'>
            <label htmlFor='about'>About</label>
            <input className='w-full bg-richBlack-700 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base'
              type='text'
              id='about'
              placeholder='Enter Bio Details'
              {...register("about", { required: true })}
              defaultValue={user?.additionalDetails?.about}
            />
            {
              errors.about && (
                <span className='text-sm -mt-1 text-yellow-50'>
                  Please enter your About.
                </span>
              )
            }
          </div>
        </div>

      </div>

      <div className='flex justify-end gap-2'>
          <button onClick={()=>navigate("../my-profile")}
          className='cursor-pointer rounded-md bg-richBlack-700 py-[8px] px-[20px] font-semibold text-richBlack-50'>
            Cancel
          </button>
          <IconBtn
            text="Save"
            type="submit"
          />
      </div>
    
    </form>
  )
}

export default EditProfile