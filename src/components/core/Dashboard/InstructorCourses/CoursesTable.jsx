import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsApi'

import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import ConfirmationModal from '../../../common/ConfirmationModal'
import { formatDate } from '../../../../services/formatDate'
import { COURSE_STATUS } from '../../../../utils/constants'

const CoursesTable = ({courses, setCourses}) => {

  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if(result){
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  return (
    <>
      <Table>
        <Thead>
            <Tr className="flex gap-x-10 rounded-t-md border-b border-b-[#208486] px-6 py-2 bg-white">
              <Th className="flex-1 text-left text-sm font-medium uppercase text-black">
                Courses
              </Th>
              <Th className="text-left text-sm font-medium uppercase text-black">
                Duration
              </Th>
              <Th className="text-left text-sm font-medium uppercase text-black">
                Price
              </Th>
              <Th className="text-left text-sm font-medium uppercase text-black">
                Actions
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {
              courses?.length === 0 ?
              (
                <Tr className="flex gap-x-10 border-b border-[#208486] px-6 py-8 bg-white">
                  <Td className="py-10 text-center text-2xl font-medium text-black">
                    No courses found
                    {/* TODO: Need to change this state */}
                  </Td>
                </Tr>
              ) :
              (
                courses.map((course) => (
                  <Tr
                    key={course._id}
                    className="flex gap-x-10 border-b border-[#208486] px-6 py-8 bg-white"
                  >
                    <Td className="flex flex-1 gap-x-4">
                      <img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className="h-[148px] w-[220px] rounded-lg object-cover"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="text-lg font-semibold text-black">
                          {course.courseName}
                        </p>
                        <p className="text-black text-sm">
                          {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                            ? course.courseDescription
                                .split(" ")
                                .slice(0, TRUNCATE_LENGTH)
                                .join(" ") + "..."
                            : course.courseDescription}
                        </p>
                        <p className="text-black text-sm">
                          Created: {formatDate(course.createdAt)}
                        </p>
                        {course.status === COURSE_STATUS.DRAFT ? (
                          <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-[#20B486] px-2 py-[2px] text-[12px] font-medium text-white">
                            <HiClock size={14} />
                            Drafted
                          </p>
                        ) : (
                          <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-[#20B486] px-2 py-[2px] text-[12px] font-medium text-white">
                            <FaCheck size={10}/>
                            Published
                          </p>
                        )}
                      </div>
                    </Td>
                    <Td className="text-sm font-medium text-richBlack-700">
                      2hr 30min
                    </Td>
                    <Td className="text-sm font-medium text-richBlack-700">
                      ₹ {course.price}
                    </Td>
                    <Td className="text-sm font-medium text-richBlack-700">
                      <button
                        disabled={loading}
                        onClick={() => {
                          navigate(`/dashboard/edit-course/${course._id}`)
                        }}
                        title="Edit"
                        className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeanGreen-300"
                      >
                        <FiEdit2 size={20} />
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => {
                          setConfirmationModal({
                            text1: "Do you want to delete this course?",
                            text2: "All the data related to this course will be deleted",
                            btn1Text: !loading ? "Delete" : "Loading...  ",
                            btn2Text: "Cancel",
                            btn1Handler: !loading
                              ? () => handleCourseDelete(course._id)
                              : () => {},
                            btn2Handler: !loading
                              ? () => setConfirmationModal(null)
                              : () => {},
                          })
                        }}
                        title="Delete"
                        className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </Td>
                  </Tr>
                ))
              )
            }
          </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CoursesTable