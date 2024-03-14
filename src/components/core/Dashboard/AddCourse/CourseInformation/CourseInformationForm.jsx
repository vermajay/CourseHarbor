import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import {addCourseDetails, editCourseDetails, fetchCourseCategories} from '../../../../../services/operations/courseDetailsApi'
import { toast } from 'react-hot-toast';
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import ChipInput from './ChipInput';
import Upload from '../Upload';
import RequirementField from './RequirementField';
import { setStep, setCourse } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn'
import { COURSE_STATUS } from '../../../../../utils/constants';

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors}
    } = useForm();
 
    const dispatch = useDispatch();
    const {token} = useSelector((state)=> state.auth);
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);


    useEffect(()=>{
        
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories?.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }
        getCategories();

        if(editCourse){
            console.log("edit course-> ", course);
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();

        if( 
            currentValues.courseTitle !== course.courseName || 
            currentValues.courseShortDesc !== course.courseDescription || 
            currentValues.coursePrice !== course.price ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        )
            return true;
        else
            return false;
    }

    //handles next button click 
    const onSubmit = async(data) => {
        
        if(editCourse){

            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();
        
                formData.append("courseId", course._id);
        
                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle);
                }
                if(currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription", data.courseShortDesc);
                }
                if(currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }
                if(currentValues.courseCategory._id !== course.category._id){
                    formData.append("category", data.courseCategory);
                }
                if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
                if(currentValues.courseTags.toString() !== course.tag.toString()){
                    formData.append("tag", JSON.stringify(data.courseTags));
                }
                if(currentValues.courseImage !== course.thumbnail){
                    formData.append("thumbnail", data.courseImage);
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if(result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            }
            else{
                toast.error("No changes made so far");
            }
            console.log("PRINTING edited course-> ", result);
            
            return;
        }
        
        //create a new Course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("price", data.coursePrice);
        formData.append("category", data.courseCategory);
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("thumbnail", data.courseImage);

        setLoading(true);
        console.log("BEFORE add course API call");
        console.log("PRINTING FORMDATA", formData);
        const result = await addCourseDetails(formData,token);
        if(result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
        console.log("PRINTING FORMDATA", formData);
        console.log("PRINTING result", result);

    }

    if(loading)
    return (
        <div className='grid place-items-center rounded-lg border border-richBlack-700 bg-richBlack-800 p-6 w-full'>
            <div className='spinner'></div>
        </div>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)}
     className='rounded-lg border border-richBlack-700 bg-richBlack-800 p-6 w-full space-y-8 text-richBlack-5 text-sm leading-[22px]'>
      
        {/* Course Title */}
        <div className='flex flex-col gap-2'>
            <label htmlFor='courseTitle'>Course Title<sup className='text-pink-200'> *</sup></label>
            <input
                className='bg-richBlack-700 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base focus:outline-none'
                id='courseTitle'
                placeholder='Enter Course Title'
                {...register("courseTitle", {required:true})}
            />
            {
              errors.courseTitle && (
                <span className='text-xs -mt-1 text-yellow-50'>
                  Course Title is required
                </span>
              )
            }
        </div>

        {/* Course Short Description */}
        <div className='flex flex-col gap-2'>
            <label htmlFor='courseShortDesc'>Course Short Description<sup className='text-pink-200'> *</sup></label>
            <textarea
                className='min-h-[140px] bg-richBlack-700 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base focus:outline-none'
                id='courseShortDesc'
                placeholder='Enter Description'
                {...register("courseShortDesc", {required:true})}
            />
            {
              errors.courseShortDesc && (
                <span className='text-xs -mt-1 text-yellow-50'>
                  Course Description is required
                </span>
              )
            }
        </div>

        {/* Course Price */}
        <div className='relative flex flex-col gap-2'>
            <label htmlFor='coursePrice'>Course Price<sup className='text-pink-200'> *</sup></label>


            <div className='flex gap-3 items-center bg-richBlack-700 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base'>
                <HiOutlineCurrencyRupee className='text-richBlack-400 text-2xl'/>
                <input
                    className='bg-richBlack-700 focus:outline-none'
                    id='coursePrice'
                    type='number'
                    placeholder='Enter Course Price'
                    {...register("coursePrice", {required:true})}
                />
            </div>

            {
              errors.coursePrice && (
                <span className='text-xs -mt-1 text-yellow-50'>
                  Course Price is required
                </span>
              )
            }
        </div>

        {/* Course Category */}
        <div className='flex flex-col gap-2'>
            <label htmlFor='courseCategory'>Course Category<sup className='text-pink-200'> *</sup></label>
            <select
                className='bg-richBlack-700 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base focus:outline-none'
                id='courseCategory'
                defaultValue=""
                {...register("courseCategory", {required:true})}
            >
                <option value="" disabled>Choose a Category</option>
                {
                    !loading && courseCategories?.map((category, index)=>(
                        <option key={index} value={category?._id}>{category?.name}</option>
                    ))
                }

            </select>
            {
              errors.courseCategory && (
                <span className='text-xs -mt-1 text-yellow-50'>
                  Course Category is required
                </span>
              )
            }
        </div>

        {/* Custom component for tag input */}
        <ChipInput 
            label="Tags"
            id="courseTags"
            placeholder="Enter tags and press Enter"
            register={register}
            errors={errors}
            setValue={setValue}
        />

        {/* Component for uploading course thumbnail and getting preview */}
        <Upload
            label="Course Thumbnail"
            id="courseImage"
            register={register}
            errors={errors}
            setValue={setValue}
            editData={editCourse ? course?.thumbnail : null}
        />

        {/* Benefits of the course */}
        <div className='flex flex-col gap-2'>
            <label htmlFor='courseBenefits'>Benefits of the Course<sup className='text-pink-200'> *</sup></label>
            <textarea
                className='min-h-[140px] bg-richBlack-700 rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base focus:outline-none'
                id='courseBenefits'
                placeholder='Enter Benefits of the Course'
                {...register("courseBenefits", {required:true})}
            />
            {
              errors.courseBenefits && (
                <span className='text-xs -mt-1 text-yellow-50'>
                  Course benefits are required
                </span>
              )
            }
        </div>

        {/* Custom component for requirement field */}
        <RequirementField 
            label="Requirements/Instructions"
            id="courseRequirements"
            register={register}
            errors={errors}
            setValue={setValue}
        />

        <div className='flex gap-2 justify-end'>
            {
                editCourse && (
                    <button
                        onClick={()=>dispatch(setStep(2))}
                        disabled={loading}
                        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richBlack-300 py-[8px] px-[20px] font-semibold text-richBlack-900`}
                    >
                        Continue Without Saving
                    </button>
                )
            }   
            <IconBtn
                text={editCourse ? "Save Changes" : "Next"}
                customClasses={"text-base"}
            >
                <MdOutlineKeyboardArrowRight/>
            </IconBtn>
        </div>
      
    </form>
  )
}

export default CourseInformationForm