import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/CTAButton'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from '../components/common/Footer'

import banner from '../assets/Images/banner.mp4'
import TimeLineImage from '../assets/Images/TimelineImage.png'
import TimeLineLogo1 from '../assets/TimeLineLogo/Logo1.svg'
import TimeLineLogo2 from '../assets/TimeLineLogo/Logo2.svg'
import TimeLineLogo3 from '../assets/TimeLineLogo/Logo3.svg'
import TimeLineLogo4 from '../assets/TimeLineLogo/Logo4.svg'
import KnowYourProgress from '../assets/Images/Know_your_progress.svg'
import CompareWithOthers from '../assets/Images/Compare_with_others.svg'
import PlanYourLessons from '../assets/Images/Plan_your_lessons.svg'
import Instructor from '../assets/Images/Instructor.png'
import ReviewSlider from '../components/common/ReviewSlider'

const Home = () => {
  return (
    <div>

        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
        text-white justify-between'>
       
            <Link to={"/signup"}>
                <div className='group mt-16 p-1 bg-richBlack-800 rounded-full transition-all duration-200
                 hover:scale-95 font-bold text-richBlack-200 drop-shadow-[0_2px_rgba(255,255,255,0.25)] hover:drop-shadow-none'>
                    <div className='flex items-center gap-2 rounded-full px-10 py-[5px] transition-all
                     duration-200 group-hover:bg-richBlack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-4xl font-semibold mt-7'>
                Empower Your Future with <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='mt-5 w-[85%] text-center text-lg font-bold text-richBlack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex gap-7 mt-14'>
                <CTAButton active={true} linkTo={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkTo={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            {/* video */}
            <div className='mx-3 my-16 shadow-[-3px_-3px_40px_0px_#118AB2]'>
                <video className='shadow-[20px_20px_0px_0px_rgb(255,255,255)]' autoPlay loop muted>
                    <source src={banner} type='video/mp4'/>
                </video>
            </div>

            {/* Code Section 1 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row"}

                    heading={
                    <div className='text-4xl font-semibold'>
                        Unlock your <HighlightText text={"coding potential"}/> with our online courses.
                    </div>}

                    subheading = {
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }

                    ctabtn1={
                        {
                            btnText: "Try it Yourself",
                            linkTo: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkTo: "/login",
                            active: false,
                        }
                    }

                    codeBlock = {`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8"/>\n<meta name="viewport", initial-scale=1"/>\n<title>React</title>\n</head>\n<body>\n<noscript>JavaScript</noscript>\n</body>\n</html>`}

                    codeColor={"text-yellow-25"}

                    backgroudGradient={"bg-gradient-to-r from-[#991b1b89] via-[#ca8b0483] to-[#eab20883]"}
                />
            </div>

            {/* Code Section 2 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row-reverse"}

                    heading={
                    <div className='text-4xl font-semibold'>
                        Start <HighlightText text={"coding in seconds"}/>
                    </div>}

                    subheading = {
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }

                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            linkTo: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkTo: "/login",
                            active: false,
                        }
                    }

                    codeBlock = {`import React from 'react'\nimport { Link } from 'react-router-dom'\nimport {FaArrowRight} from 'react-icons/fa'\n\nconst Home = () => {\n  return (\n<div></div>\n  )\n}\n\nexport default Home`}

                    codeColor={"text-[#D3F5FE]"}

                    backgroudGradient={"bg-gradient-to-r from-[#38BDF870] to-[#BAE6FD70]"}
                />
            </div>

            <ExploreMore/>

        </div>


        {/* Section 2 */}
        <div className='bg-pureGreys-5 text-richBlack-700'>

            <div className='h-[320px] section2_bg_image'>

                <div className='w-11/12 max-w-maxContent flex flex-col items-center mx-auto gap-5'>

                    <div className='h-[210px]'></div>
                    
                    <div className='flex gap-7'>
                        <CTAButton active={true} linkTo={"/signup"}>
                            <div className='flex items-center gap-2'>
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkTo={"/login"}>
                            Learn More
                        </CTAButton>
                    </div>

                </div>

            </div>

            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col gap-16 py-[90px]'>

                <div className='flex justify-between gap-16'>
                    <div className='text-richBlack-900 text-4xl font-semibold w-[45%]'>
                        Get the skills you need for a <HighlightText text={"job that is in demand."}/>
                    </div>
                    <div className='flex flex-col items-start gap-10 w-[40%]'>
                        <p className='font-medium'>
                            The modern CourseHarbor is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </p>
                        <CTAButton active={true} linkTo={"/signup"}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>

                {/* TimeLine Section */}
                <div className='flex justify-between'>

                    <div className='flex flex-col gap-10 mt-7 ml-4'>

                        <div className='flex items-center gap-7'>
                            <div className='flex items-center justify-center w-[52px] h-[52px] rounded-full bg-white shadow-[0px_0px_20px_3px_#00000010]'>
                                <img src={TimeLineLogo1} alt="TimeLineLogo1"/>
                            </div>
                            <div>
                                <p className='font-semibold text-lg text-richBlack-800'>Leadership</p>
                                <p>Fully committed to the success company</p>
                            </div>
                        </div>

                        <div className='w-[50px] rotate-90 border border-dashed border-richBlack-100'></div>

                        <div className='flex items-center gap-7'>
                            <div className='flex items-center justify-center w-[52px] h-[52px] rounded-full bg-white shadow-[0px_0px_20px_3px_#00000010]'>
                                <img src={TimeLineLogo2} alt="TimeLineLogo2"/>
                            </div>
                            <div>
                                <p className='font-semibold text-lg text-richBlack-800'>Responsibility</p>
                                <p>Students will always be our top priority</p>
                            </div>
                        </div>

                        <div className='w-[50px] rotate-90 border border-dashed border-richBlack-100'></div>

                        <div className='flex items-center gap-7'>
                            <div className='flex items-center justify-center w-[52px] h-[52px] rounded-full bg-white shadow-[0px_0px_20px_3px_#00000010]'>
                                <img src={TimeLineLogo3} alt="TimeLineLogo3"/>
                            </div>
                            <div>
                                <p className='font-semibold text-lg text-richBlack-800'>Flexibility</p>
                                <p>The ability to switch is an important skills</p>
                            </div>
                        </div>

                        <div className='w-[50px] rotate-90 border border-dashed border-richBlack-100'></div>

                        <div className='flex items-center gap-7'>
                            <div className='flex items-center justify-center w-[52px] h-[52px] rounded-full bg-white shadow-[0px_0px_20px_3px_#00000010]'>
                                <img src={TimeLineLogo4} alt="TimeLineLogo4"/>
                            </div>
                            <div>
                                <p className='font-semibold text-lg text-richBlack-800'>Solve the problem</p>
                                <p>Code your way to a solution</p>
                            </div>
                        </div>
                    
                    </div>
                
                    <div>
                        <div className='relative shadow-[1px_1px_40px_0px_#118AB2]'>

                            <img className='shadow-[20px_20px_0px_0px_rgb(255,255,255)]' src={TimeLineImage} alt="TimeLineImage"/>

                            <div className='absolute -bottom-14 left-[50%] translate-x-[-50%] bg-caribbeanGreen-700 p-[42px]
                             flex justify-evenly items-center gap-9'>
                                <div className='flex items-center gap-6'>
                                    <p className='text-white text-4xl leading-[44px] font-bold'>10</p>
                                    <p className='text-caribbeanGreen-300 text-sm font-medium'>YEARS EXPERIENCES</p>
                                </div>
                                <div className='w-[70px] rotate-90 h-[1px] bg-caribbeanGreen-500'></div>
                                <div className='flex items-center gap-6'>
                                    <p className='text-white text-4xl leading-[44px] font-bold'>250</p>
                                    <p className='text-caribbeanGreen-300 text-sm font-medium'>TYPES OF COURSES</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-center mt-[90px] gap-12'>
                    
                    <div className='text-center'>
                        <p className='text-richBlack-900 text-4xl font-semibold'>
                            Your swiss knife for <HighlightText text={"learning any language"}/>
                        </p>

                        <p className='font-medium max-w-[54rem] mt-3'>
                            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                        </p>
                    </div>

                    <div className='relative h-[470px] w-full'>
                        <div className='absolute left-14 h-[450px] w-[450px]'>
                            <img src={KnowYourProgress} alt="KnowYourProgress"/>
                        </div>
                        <div className='absolute -top-14 left-[50%] translate-x-[-50%] h-[550px] w-[500px]'>
                            <img src={CompareWithOthers} alt="CompareWithOthers"/>
                        </div>
                        <div className='absolute -top-14 right-10 h-[500px] w-[500px]'>
                            <img src={PlanYourLessons} alt="PlanYourLessons"/>
                        </div>
                    </div>

                    <div className='-mt-3'>
                        <CTAButton active={true} linkTo={"/signup"}>
                            Learn More
                        </CTAButton>
                    </div>

                </div>

            </div>

        </div>


        {/* Section 3 */}
        <div className='w-11/12 max-w-maxContent mx-auto flex flex-col gap-16 py-[90px] text-richBlack-300'>
            
            {/* Instructor Section  */}
            <div className='flex gap-20'>

                <div className='w-[80%]'>
                    <img className='shadow-[-20px_-20px_0px_0px_rgb(255,255,255)]' src={Instructor} alt="Instructor"/>
                </div>

                <div className='flex flex-col gap-10 items-start justify-center mr-5'>
                    <div className='text-richBlack-5 font-semibold text-4xl leading-[44px]'>
                        Become an
                        <div className='leading-[44px]'>
                            <HighlightText text={"instructor"}/>
                        </div>
                    </div>
                    <div className='font-medium'>
                        Instructors from around the world teach millions of students on CourseHarbor. We provide the tools and skills to teach what you love.
                    </div>
                    <div>
                        <CTAButton active={true} linkTo={"/signup"}> 
                            <div className='flex items-center gap-2'>
                                Start Teaching Today
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                    </div>
                </div>

            </div>

            <div>
                <div className='text-center text-white font-semibold text-4xl leading-[44px]'>Reviews from other learners</div>
            </div>

            <ReviewSlider />

        </div>

        {/* Footer */}
        <Footer/>

    </div>
  )
}

export default Home