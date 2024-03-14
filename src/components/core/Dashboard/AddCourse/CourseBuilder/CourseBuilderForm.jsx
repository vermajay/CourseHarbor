import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import NestedView from './NestedView'
import { setStep, setEditCourse, setCourse } from '../../../../../slices/courseSlice';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsApi';

const CourseBuilderForm = () => {

  const [editSectionName, setEditSectionName] = useState(null)   //this will contain sectionId
  const [loading, setLoading] = useState(null)
  const {course} = useSelector((state) => state.course)
  const {token} = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goToNext = () => {

    if(course.courseContent.length === 0){
      toast.error("Please add atleast one section")
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section")
      return;
    }

    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setEditCourse(true))
    dispatch(setStep(1))
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm();


  const onSubmit = async(data) => {
    setLoading(true);
    let result;

    if(editSectionName){
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      },
      token,
      )
    }
    else{
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      },
      token,
      )
    }
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div className='rounded-lg border border-richBlack-700 bg-richBlack-800 p-6 w-full space-y-8 text-richBlack-5 text-sm leading-[22px]'>
      
      <p className='font-semibold text-2xl'>Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)}> 

        {/* Section Name */}
        <div className='flex flex-col gap-2'>
            <label htmlFor='sectionName'>Section Name<sup className='text-pink-200'> *</sup></label>
            <input
                className='bg-richBlack-700 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base focus:outline-none'
                id='sectionName'
                disabled={loading}
                placeholder='Add a section to build your course'
                {...register("sectionName", {required:true})}
            />
            {
              errors.sectionName && (
                <span className='text-xs -mt-1 text-yellow-50'>
                  Section name is required
                </span>
              )
            }
        </div>

        <div className='flex items-end gap-2 mt-8'>
          {/* create section button */}
          <button className='flex gap-2 border rounded-lg px-6 py-3 border-yellow-50 w-fit'
          disabled={loading}>
              <IoMdAddCircleOutline className='text-yellow-50 text-2xl'/>
              <p className='text-base text-yellow-50 font-medium'>{editSectionName ? "Edit Section Name" : "Create Section"}</p>
          </button>

          {
            editSectionName && 
            <div onClick={cancelEdit} className='cursor-pointer text-sm text-richBlack-300 underline'>Cancel Edit</div>
          }
        </div>

      </form>

      {course.courseContent.length > 0 && <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>}

      <div className='flex gap-2 justify-end'>
        <button className='flex items-center cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold
        drop-shadow-[2px_2px_rgba(255,255,255,0.25)] text-richBlack-5 bg-richBlack-700'
          onClick={goBack}
        >
          <MdOutlineKeyboardArrowLeft/>
          Back
        </button>
        <IconBtn
            disabled={loading}
            text={"Next"}
            onclick={goToNext}
            customClasses={"text-base"}
        >
            <MdOutlineKeyboardArrowRight/>
        </IconBtn>

      </div>

    </div>
  )
}

export default CourseBuilderForm