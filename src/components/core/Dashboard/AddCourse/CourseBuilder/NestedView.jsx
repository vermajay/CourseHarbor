import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsApi'
import { setCourse } from '../../../../../slices/courseSlice'
import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from './SubSectionModal'

const NestedView = ({handleChangeEditSectionName}) => {

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubSection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleteSection = async(sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
    },
    token,
    )
    console.log("course after section delete-> ", result)
    if(result){
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async(subSectionId, sectionId) => {
    const result = await deleteSubSection({subSectionId, sectionId}, token)
    //result contains the updated section
    if(result){
        const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }

  return (
    <>
      <div className="rounded-lg bg-richBlack-25 text-black p-6 px-8">
      
      {
        course.courseContent.map((section)=>(
          //Secton dropdown
          <details key={section._id}>
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richBlack-700 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-black" />
                <p className="font-semibold text-black">
                  {section.sectionName}
                </p>
              </div>

              {/* buttons -> edit, delete, drop icon */}
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="text-xl text-black" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-[#ff0000]" />
                </button>
                <span className="font-medium text-black">|</span>
                <AiFillCaretDown className={`text-xl text-black`} />
              </div>
            </summary>

            <div className="px-6 pb-4">
                {/* Render All Sub Sections Within a Section */}
                {
                  section.subSection.map((subSection) => (
                    <div
                      key={subSection?._id}
                      onClick={() => setViewSubSection(subSection)}
                      className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richBlack-700 py-2"
                    >

                      <div className="flex items-center gap-x-3 py-2 ">
                        <RxDropdownMenu className="text-2xl text-black" />
                        <p className="font-semibold text-black">
                          {subSection.title}
                        </p>
                      </div>

                      {/* buttons - edit, delete */}
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-x-3"
                        >
                          <button
                            onClick={() => setEditSubSection({ ...subSection, sectionId: section._id })}
                          >
                            <MdEdit className="text-xl text-black" />
                          </button>
                          <button
                            onClick={() =>
                              setConfirmationModal({
                                text1: "Delete this Sub-Section?",
                                text2: "This lecture will be deleted",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: () => handleDeleteSubSection(subSection._id, section._id),
                                btn2Handler: () => setConfirmationModal(null),
                              })
                            }
                          >
                            <RiDeleteBin6Line className="text-xl text-[#FF0000]" />
                          </button>
                        </div>  

                    </div>
                  ))
                }
                  {/* Add New Lecture to Section */}
                  <button
                    onClick={() => setAddSubSection(section._id)}
                    className="mt-3 flex items-center gap-x-1 text-[#20B486]"
                  >
                    <FaPlus className="text-lg" />
                    <p>Add Lecture</p>
                  </button>
            </div>

          </details>
        ))
      }
    </div>

      {/*MODALS*/}
      {
        addSubSection ? 
        (
          <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true}/>
        ) :
        viewSubSection ?
        (
          <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>
        ) :
        editSubSection ?
        (
          <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/>
        ) :
        (<></>)
      }

      {/* Confirmation Modal */}
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
      }
    </>
  )
}

export default NestedView