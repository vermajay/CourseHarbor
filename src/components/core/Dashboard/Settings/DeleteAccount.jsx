import React from 'react'
import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { deleteProfile } from "../../../../services/operations/settingsApi"

const DeleteAccount = () => {

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleDeleteAccount(){
        try{
            dispatch(deleteProfile(token, navigate));
        }
        catch(error){
            console.log("ERROR MESSAGE IN DELETING ACCOUNT - ", error.message);
        }
    }

  return (
    <div className='flex gap-6 rounded-lg bg-pink-900 border border-pink-700 py-8 px-12'>
      
        <div className='grid place-items-center h-14 w-14 aspect-square rounded-full bg-pink-700'>
            <FiTrash2 className='text-pink-200 text-[2rem]'/>
        </div>

        <div className='flex flex-col items-start gap-2'>

            <div className='text-pink-5 font-bold text-lg'>Delete Account</div>

            <div className='w-3/5 text-pink-25'>
                <div>
                    Would you like to delete account?
                </div>
                <div>
                    This account may contain Paid Courses. Deleting your account is
                    permanent and will remove all the content associated with it.
                </div>
            </div>

            <button onClick={handleDeleteAccount}
                className='text-pink-300 italic font-medium text-base'
            >I want to delete my account.</button>

        </div>

    </div>
  )
}

export default DeleteAccount