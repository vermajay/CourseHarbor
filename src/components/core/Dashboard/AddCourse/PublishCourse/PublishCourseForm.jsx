import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice'
import IconBtn from '../../../../common/IconBtn'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsApi'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'

const PublishCourseForm = () => {

  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(course?.status === COURSE_STATUS.PUBLISHED){
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async() => {
    // check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourses()
      return
    }

    const formData = new FormData();
    formData.append("courseId", course._id)
    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      goToCourses()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    handleCoursePublish();
  }

  return (
    <div className="rounded-md bg-white text-black p-6 w-full">
      
      <p className="text-2xl font-semibold">
        Publish Settings
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richBlack-500 text-richBlack-400 focus:ring-2 focus:ring-richBlack-5"
            />
            <span className="ml-2 text-richBlack-400">
              Make this course as public
            </span>
          </label>
        </div>
        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">

          <button className='flex items-center cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold
          drop-shadow-[2px_2px_rgba(255,255,255,0.25)] text-richBlack-5 bg-richBlack-700'
          disabled={loading}
          type="button"
          onClick={goBack}
          >
            <MdOutlineKeyboardArrowLeft/>
            Back
          </button>

          <IconBtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    
    </div>
  )
}

export default PublishCourseForm