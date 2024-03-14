import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourseForm from './PublishCourse/PublishCourseForm';

const RenderSteps = () => {

  const {step} = useSelector((state) => state.course);

  const Steps = [
    {
      id: 1,
      title: "Course Information"
    },
    {
      id: 2,
      title: "Course Builder"
    },
    {
      id: 3,
      title: "Publish Course"
    },
  ]

  return (
    <div className='flex flex-col items-center w-full'>

      <div className='flex select-none'>
        {
          Steps.map((Step)=>(

            <div className='flex items-center'>
              <div className={`w-[34px] h-[34px] rounded-full border flex items-center justify-center 
              ${Step.id === step ? 'border-yellow-50 bg-yellow-900 text-yellow-50' : 
              'border-richBlack-700 bg-richBlack-800 text-richBlack-300'} text-lg font-semibold
              ${Step.id < step && 'text-richBlack-900 bg-yellow-50'}`}>

                {
                  Step.id < step ? <FaCheck/> : Step.id
                }
              
              </div>
              {
                Step.id != Steps.length && (
                  <div className={`w-[12.5rem] border-dashed border-b-2 ${Step.id < step ? 'border-yellow-50' : 'border-richBlack-400'}`}></div>
                )
              }
            </div>  

          ))
        }
      </div>
        
      <div className='flex justify-between w-full select-none mt-2 pr-4 mb-14'>
        {
          Steps.map((Step)=>(
            <div className={`${Step.id <= step ? 'text-richBlack-5' : 'text-richBlack-500'} text-sm`}>
              {Step.title}
            </div>
          ))
        }
      </div>

      {step === 1 && <CourseInformationForm/>}
      {step === 2 && <CourseBuilderForm/>}
      {step === 3 && <PublishCourseForm/>}

    </div>
  )
}

export default RenderSteps