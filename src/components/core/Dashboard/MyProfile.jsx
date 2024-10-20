import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import {TbEdit} from 'react-icons/tb'
import {formattedDate} from '../../../utils/dateFormatter'

const MyProfile = () => {

  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-10'>

      <h1 className='font-semibold text-4xl mb-2 text-[#208486]'>My Profile</h1>

      {/* section 1 */}
      <div className='flex items-center justify-between py-8 px-12 rounded-lg bg-white text-black'>

        <div className='flex items-center gap-4'>

          <div>
            <img src={user?.image} alt='userImage' className='h-[78px] w-[78px] rounded-full aspect-square object-cover'></img>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center font-semibold text-2xl'>
              {user?.firstName + " " + user?.lastName}
            </div>
            <div>{user?.email}</div>
          </div>

        </div>

        {/* edit button */}
        <IconBtn
          text="Edit"
          onclick={()=>navigate("/dashboard/settings")}
        >
          <TbEdit size={22}/>
        </IconBtn>

      </div>

      {/* section 2 */}
      <div className='flex flex-col gap-7 py-8 px-12 rounded-lg bg-white text-black'>

        <div className='flex items-center justify-between'>
          <div className='font-semibold text-2xl'>About</div>
          {/* edit button */}
          <IconBtn
            text="Edit"
            onclick={()=>navigate("/dashboard/settings")}
          >
            <TbEdit size={22}/>
          </IconBtn>
        </div>

        <div className={`${!user?.additionalDetails?.about && 'text-black'} font-medium`}>
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </div>

      </div>

      {/* section 3 */}
      <div className='flex flex-col gap-8 py-8 px-12 rounded-lg bg-white text-black'>

        <div className='flex items-center justify-between'>
          <div className='font-semibold text-2xl'>Personal Details</div>
          {/* edit button */}
          <IconBtn
            text="Edit"
            onclick={()=>navigate("/dashboard/settings")}
          >
            <TbEdit size={22}/>
          </IconBtn>
        </div>

        <div className='flex items-center justify-between max-w-lg'>

          <div className='flex flex-col gap-4'>

            <div className='flex flex-col gap-1'>
              <div className='text-richBlack-600 text-sm leading-[22px]'>First Name</div>
              <div className='font-medium'>{user?.firstName}</div>
            </div>

            <div className='flex flex-col gap-1'>
              <div className='text-richBlack-600 text-sm leading-[22px]'>Email</div>
              <div className='font-medium'>{user?.email}</div>
            </div>

            <div className='flex flex-col gap-1'>
              <div className='text-richBlack-600 text-sm leading-[22px]'>Gender</div>
              <div className='font-medium'>{user?.additionalDetails?.gender ?? "Add Gender"}</div>
            </div>

          </div>

          <div className='flex flex-col gap-4'>

            <div className='flex flex-col gap-1'>
              <div className='text-richBlack-600 text-sm leading-[22px]'>Last Name</div>
              <div className='font-medium'>{user?.lastName}</div>
            </div>

            <div className='flex flex-col gap-1'>
              <div className='text-richBlack-600 text-sm leading-[22px]'>Phone Number</div>
              <div className='font-medium'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</div>
            </div>

            <div className='flex flex-col gap-1'>
              <div className='text-richBlack-600 text-sm leading-[22px]'>Date Of Birth</div>
              <div className='font-medium'>
                {user?.additionalDetails?.dateOfBirth ? formattedDate(user?.additionalDetails?.dateOfBirth) : "Add Date Of Birth"}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default MyProfile