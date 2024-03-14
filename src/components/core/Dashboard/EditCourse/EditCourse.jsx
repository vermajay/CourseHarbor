import React, { useEffect, useState } from 'react'
import RenderSteps from '../AddCourse/RenderSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsApi'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'

const EditCourse = () => {

  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {

//;(async () => { ... })()
// This is an immediately invoked asynchronous function expression (IIFE). It's a way to execute asynchronous code immediately after declaring it.
// The semicolon before the IIFE is used to prevent potential issues when the code is concatenated or minified with other scripts.
    
    ;(async()=>{                              
      setLoading(true)
      const result = await getFullDetailsOfCourse(courseId, token)
      if (result?.courseDetails) {
        dispatch(setEditCourse(true))
        dispatch(setCourse(result?.courseDetails))
      }
      setLoading(false)
    })()
    
  }, [])

  if(loading){
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richBlack-5">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderSteps/>
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richBlack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  )
}

export default EditCourse