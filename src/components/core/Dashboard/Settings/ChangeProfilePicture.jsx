import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { FiUpload } from 'react-icons/fi'

import { updateDisplayPicture } from "../../../../services/operations/settingsApi"

const ChangeProfilePicture = () => {

  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      previewFile(file);
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  const handleFileUpload = () => {
    try{
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);

      dispatch(updateDisplayPicture(token, formData)).then(()=>{
        setLoading(false);
      })
    }
    catch(error){
      console.log("ERROR MESSAGE WHILE UPLOADING DISPLAY PICTURE - ", error.message);
    }
  }

  useEffect(()=>{
    if(imageFile){
      previewFile(imageFile);
    }
  }, [imageFile])

  return (
    <div className='flex items-center gap-5 py-8 px-12 rounded-lg text-black bg-white'>
      
      <img
        src={previewSource || user?.image}
        alt={`profile-${user?.firstName}`}
        className="aspect-square w-[78px] rounded-full object-cover"
      />

      <div className='flex flex-col gap-2'>

        <p className='font-medium text-base'>Change Profile Picture</p>

        <div className='flex gap-3'>

          <input
            type='file'
            ref={fileInputRef}
            className='hidden'
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileChange}
          />

          <button
            onClick={handleClick}
            disabled={loading}
            className="cursor-pointer rounded-md bg-richBlack-600 py-2 px-5 font-semibold text-white"
          >
            Select
          </button>

          <IconBtn text={loading ? "Uploading..." : "Upload"} 
            onclick={handleFileUpload}
          >
            {
              !loading && (
                <FiUpload className='text-lg text-white'/>
              ) 
            }
          </IconBtn>

        </div>

      </div>

    </div>
  )
}

export default ChangeProfilePicture