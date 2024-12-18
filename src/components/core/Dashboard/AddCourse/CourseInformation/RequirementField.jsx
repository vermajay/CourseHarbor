import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({label, id, register, errors, setValue}) => {

    const {course, editCourse} = useSelector((state) => state.course)

    const [requirement, setRequirement] = useState(null);
    const [requirementList, setRequirementList] = useState([]);


    const handleAddRequirement = () => {
        if(requirement){
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

    useEffect(()=>{
        if(editCourse){
            setRequirementList(course.instructions)
        }
        register(id, {required:true});
    }, []);

    useEffect(()=>{
        setValue(id, requirementList);
    }, [requirementList]);

  return (
    <div className='flex flex-col items-start gap-2'>
        <label htmlFor={id}>{label}<sup className='text-pink-200'> *</sup></label>
        <input
            className='bg-richBlack-25 text-black rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base focus:outline-none w-full'
            id={id}
            value={requirement}
            onChange={(e)=>setRequirement(e.target.value)}
        />
        {
            errors[id] && (
                <span className='text-xs -mt-1 text-[#20B486]'>
                    {label} are required
                </span>
            )
        }
        <button onClick={handleAddRequirement} type='button' className='font-semibold text-base text-[#20B486]'>
            Add
        </button>
        {
            requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((requirement, index)=>(
                            <li key={index} className='flex items-center gap-2'>
                                <span>{requirement}</span>
                                <button onClick={()=>handleRemoveRequirement(index)} type='button' 
                                className='text-xs text-richBlack-500'>
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
    </div>
  )
}

export default RequirementField