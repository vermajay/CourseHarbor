import React, { useState, useEffect } from 'react'
import { FiUploadCloud } from 'react-icons/fi'

const Upload = ({label, id, register, errors, setValue}) => {

  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

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

  const removeHandler = () => {
    setPreviewSource(null);
    setImageFile(null);
    setValue(id, null);
  }

  useEffect(()=>{
    register(id, {required:true});
  }, []);

  useEffect(()=>{
    if(imageFile){
      previewFile(imageFile);
      setValue(id, imageFile);
    }
  }, [imageFile])


  return (
    <div className='flex flex-col items-start gap-2'>
      <label>{label}<sup className='text-pink-200'> *</sup></label>
      
      <div className='relative bg-richBlack-700 rounded-lg border-2 border-dotted border-richBlack-500 w-full'>
        {
          previewSource ?
          (
            <div className='flex flex-col gap-4 items-center p-6'>
              <img src={previewSource} className='rounded-lg'/>
              <button
                onClick={removeHandler}
                type='button'
                className='text-richBlack-400 font-semibold text-base'
              >
                Cancel
              </button>
            </div>
          )
          :
          (
            <div className='px-8 py-11 flex flex-col gap-10 items-center'>

              <input
                type='file'
                className='absolute inset-0 opacity-0 cursor-pointer border border-yellow-50'
                accept="image/png, image/gif, image/jpeg"
                onChange={handleFileChange}
                id={id}
              />

              <div className='flex flex-col items-center'>
                <div className='grid place-items-center h-14 w-14 bg-pureGreys-800 rounded-full'>
                  <FiUploadCloud className='text-yellow-50 text-2xl'/>
                </div>
                <div className='text-richBlack-200 max-w-[12rem] text-center'>
                  Drag and drop an image, or click to 
                  <span className='text-yellow-50 font-semibold'> Browse </span>
                  a file
                </div>
              </div>

              <ul className='flex list-disc gap-14 text-richBlack-400 font-semibold'>
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
              </ul>

            </div>
          )
        }
      </div>

      {
        errors[id] && (
          <span className='text-xs -mt-1 text-yellow-50'>
            {label} is required
          </span>
        )
      }
    </div>
  )
}

export default Upload