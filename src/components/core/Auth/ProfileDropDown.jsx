import { useState, useRef } from 'react'
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { logout } from "../../../services/operations/authApi"
import useOnClickOutside from "../../../hooks/useOnClickOutside"

const ProfileDropDown = () => {

  const {user} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null;

  return(
    <button className='relative' onClick={() => setOpen(true)}>

      <div className='flex items-center gap-1'>
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="w-[30px] rounded-full aspect-square object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richBlack-100"/>
      </div>

      {
        open && (
          <div onClick={(e) => e.stopPropagation()} ref={ref}
          className='absolute top-[118%] right-0 z-[1000] rounded-md border-[1px] border-richBlack-700 bg-richBlack-800 overflow-hidden divide-y-[1px] divide-richBlack-700'>

            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-1 py-[10px] px-[12px] text-sm text-richBlack-100 hover:bg-richBlack-700 hover:text-richBlack-25">
                <VscDashboard className="text-lg"/>
                Dashboard
              </div>
            </Link>

            <div onClick={()=>{
              dispatch(logout(navigate));
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richBlack-100 hover:bg-richBlack-700 hover:text-richBlack-25">
              <VscSignOut className="text-lg"/>
              Logout
            </div>

          </div>          
        )
      }

    </button>
  )
}

export default ProfileDropDown