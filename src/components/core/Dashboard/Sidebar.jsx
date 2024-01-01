import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { sidebarLinks } from "../../../data/dashboard-links"
import SidebarLink from './SidebarLink';
import { logout } from '../../../services/operations/authApi';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../../common/ConfirmationModal';

const Sidebar = () => {

  const {loading: authLoading} = useSelector((state) => state.auth);
  const {user, loading: profileLoading} = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] items-center justify-center border-r-[1px] border-r-richBlack-700 bg-richBlack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className='flex flex-col bg-richBlack-800 min-w-[220px] border-r-[1px] border-r-richBlack-700 py-8'>
        
        <div className='flex flex-col'>
          {sidebarLinks.map((link)=>{
            if(link.type && link.type !== user?.accountType) return null;
            else return(
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richBlack-700" />

        <div className='flex flex-col'>

          <SidebarLink link={{name: "Settings", path: "/dashboard/settings"}} iconName="VscSettingsGear"/>

          <button 
            onClick={()=>{
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null)
              })
            }}
          >

            <div className='flex text-richBlack-300 gap-3 items-center font-medium px-6 py-2'>
              <VscSignOut className="text-xl"/>
              <span>Logout</span>
            </div>

          </button>

        </div>

      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    
    </>
  )
}

export default Sidebar