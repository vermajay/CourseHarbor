import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsApi"
import { getInstructorData } from "../../../services/operations/profileApi"
import InstructorChart from "./InstructorDashboard/InstructorChart"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const instructorApiData = await getInstructorData(token) //fetches courses with total amount generated and total students
      const result = await fetchInstructorCourses(token)

      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) setCourses(result)

      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated,0)
  const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled,0)

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-[#208486] mb-8">
          Hi {user?.firstName} 👋
        </h1>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div>
          <div className="my-4 flex h-[450px] space-x-4">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex-1 rounded-md bg-white p-6">
                <p className="text-lg font-bold text-black">Visualize</p>
                <p className="mt-4 text-xl font-medium text-black">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
            {/* Total Statistics */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-white p-6">
              <p className="text-lg font-bold text-black">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-richBlack-400">Total Courses</p>
                  <p className="text-3xl font-semibold text-black">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richBlack-400">Total Students</p>
                  <p className="text-3xl font-semibold text-black">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richBlack-400">Total Income</p>
                  <p className="text-3xl font-semibold text-black">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md bg-white p-6">
            {/* Render 3 courses */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-black">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="font-semibold text-[#208486]">View All</p>
              </Link>
            </div>
            <div className="my-4 flex items-start space-x-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="w-1/3">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[201px] w-full rounded-md object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-black">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-richBlack-700">
                        {course.studentsEnrolled.length} students
                      </p>
                      <p className="text-xs font-medium text-richBlack-700">
                        |
                      </p>
                      <p className="text-xs font-medium text-richBlack-700">
                        Rs. {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-white p-6 py-20">
          <p className="text-center text-2xl font-bold text-black">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-[#20B486]">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}
