import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <div className='flex flex-col gap-10 text-[#208486]'>
      <h1 className='leading-10 mb-3 font-semibold text-4xl'>Settings</h1>
      <ChangeProfilePicture/>
      <EditProfile/>
      <UpdatePassword/>
      <DeleteAccount/>
    </div>
  )
}

export default Settings