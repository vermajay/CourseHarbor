import { useState, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux';

const ChipInput = ({label, id, placeholder, register, errors, setValue}) => {

  const [tag, setTag] = useState(null);
  const [tagList, setTagList] = useState([]);

  const {course, editCourse} = useSelector((state) => state.course)
  useEffect(() => {
    if (editCourse) {
      setTagList(course.tag)
    }
    register(id, { required: true, validate: (value) => value.length > 0 })
  }, [])

  useEffect(()=>{
    setValue(id, tagList);
  }, [tagList]);


  const handleAddTag = () => {
    if(tag){
      setTagList([...tagList, tag]);
      setTag("");
    }
  }

  const handleRemoveTag = (index) => {
    const updatedTagList = [...tagList];
    updatedTagList.splice(index, 1);
    setTagList(updatedTagList);
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter' || event.key == ','){
      event.preventDefault();
      handleAddTag();
    }
  }

  return (
    <div className='flex flex-col items-start gap-2'>
      <label htmlFor={id}>{label}<sup className='text-pink-200'> *</sup></label>
      {
        tagList.length > 0 && (
          <div className='flex flex-wrap gap-2 py-1'>
              {
                tagList.map((tag, index)=>(
                  <div key={index} className='flex items-center gap-2 px-2 py-[0.15rem] rounded-full bg-[#20B486]'>
                      <span>{tag}</span>
                      <button onClick={()=>handleRemoveTag(index)} type='button'>
                        <RxCross2/>
                      </button>
                  </div>
                ))
              }
          </div>
        )
      }
      <input
        className='bg-richBlack-25 text-black rounded-[0.5rem] p-[12px] drop-shadow-[0_2px_rgba(255,255,255,0.25)] font-medium text-base focus:outline-none w-full'
        id={id}
        placeholder={placeholder}
        value={tag}
        onChange={(e)=>setTag(e.target.value)}
        onKeyDown={(e)=>handleKeyPress(e)}
      />
      {
        errors[id] && (
          <span className='text-xs -mt-1 text-[#20B486]'>
            {label} are required
          </span>
        )
      }
    </div>
  )
}

export default ChipInput