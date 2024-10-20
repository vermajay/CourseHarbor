import RenderSteps from './RenderSteps'

export default function AddCourse(){
    return(
        <div className="flex">
            <div>
                <h1 className="text-[#208486] font-semibold text-4xl mb-12">Add Course</h1>
                <div className='flex flex-col items-center w-[37rem]'>
                    <RenderSteps/>
                </div>
            </div>
            <div className="fixed top-[6rem] left-[63rem] flex flex-col gap-6 p-6 rounded-lg w-[25rem] bg-white text-richBlack-700">
                <div className="text-lg font-semibold">⚡Course Upload Tips</div>
                <ul className="flex flex-col gap-4 list-disc text-xs font-medium pl-6">
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    )
}