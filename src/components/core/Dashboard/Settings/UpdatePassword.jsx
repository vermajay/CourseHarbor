import { useState } from 'react';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../../../../services/operations/settingsApi';
import IconBtn from '../../../common/IconBtn';

const UpdatePassword = () => {

  const {token} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false) 

  const {register, handleSubmit, formState: {errors}} = useForm();

  const submitHandler = async(data) => {
    try{
      dispatch(changePassword(token, data));
    }
    catch(error){
      console.log("ERROR WHILE SUBMITTING CHANGE PASSWORD DATA - ", error.message)
    } 
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>

    <div className='flex flex-col gap-6 py-8 px-12 mb-8 rounded-lg text-black text-sm leading-[22px] bg-white'>

      <div className='font-semibold text-lg'>Change Password</div>

      <div className='lg:flex gap-5'>
        {/* current password */}
        <div className='relative flex flex-col gap-2 lg:w-[48%]'>
          <label htmlFor='oldPassword'>Current Password</label>
          <input className='w-full bg-richBlack-25 text-black rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base'
            type={showCurrentPassword ? 'text' : 'password'}
            id='oldPassword'
            placeholder="Enter Current Password"
            {...register("oldPassword", {required: true})}
          />
          <span onClick={()=>setShowCurrentPassword((prev)=>!prev)}
          className={`${errors.oldPassword ? 'bottom-8' : 'bottom-2'} cursor-pointer absolute right-2 text-[1.75rem] text-[#208486]`}
          >
            {
              showCurrentPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
            }
          </span>
          {
            errors.oldPassword && (
              <span className='text-sm -mt-1 text-[#208486]'>
                Please enter your old password.
              </span>
            )
          }
        </div>
        {/* new password */}
        <div className='relative flex flex-col gap-2 lg:w-[48%]'>
          <label htmlFor='newPassword'>New Password</label>
          <input className='w-full bg-richBlack-25 text-black rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base'
            type={showNewPassword ? 'text' : 'password'}
            id='newPassword'
            placeholder="Enter New Password"
            {...register("newPassword", {required: true})}
          />
          <span onClick={()=>setShowNewPassword((prev)=>!prev)}
          className={`${errors.oldPassword ? 'bottom-8' : 'bottom-2'} cursor-pointer absolute right-2 text-[1.75rem] text-[#208486]`}>
            {
              showNewPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
            }
          </span>
          {
            errors.newPassword && (
              <span className='text-sm -mt-1 text-[#208486]'>
                Please enter your new password.
              </span>
            )
          }
        </div>
      </div>

    </div>


    <div className='flex justify-end gap-2'>
        <button onClick={()=>navigate("../my-profile")}
        className='cursor-pointer rounded-md bg-richBlack-600 py-[8px] px-[20px] font-semibold text-white'>
          Cancel
        </button>
        <IconBtn
          text="Update"
          type="submit"
        />
    </div>
  
  </form>
  )
}

export default UpdatePassword