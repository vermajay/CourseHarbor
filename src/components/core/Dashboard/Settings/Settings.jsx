import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <div className='flex flex-col gap-10 text-richBlack-5'>
      <h1 className='font-medium text-3xl leading-10 mb-3'>Settings</h1>
      <ChangeProfilePicture/>
      <EditProfile/>
      <UpdatePassword/>
      <DeleteAccount/>
    </div>
  )
}

export default Settings