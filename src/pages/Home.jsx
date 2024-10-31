import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/CTAButton'
import Footer from '../components/common/Footer'

import TimeLineImage from '../assets/Images/TimelineImage.png'
import TimeLineLogo1 from '../assets/TimeLineLogo/Logo1.svg'
import TimeLineLogo2 from '../assets/TimeLineLogo/Logo2.svg'
import TimeLineLogo3 from '../assets/TimeLineLogo/Logo3.svg'
import TimeLineLogo4 from '../assets/TimeLineLogo/Logo4.svg'
import Stats from '../components/core/HomePage/Stats'
import Categories from '../components/core/HomePage/Categories'
import Feedback from '../components/core/HomePage/Feedback'
import home_signup from "../assets/Images/home_signup.png"
import heroImg from '../assets/Images/heroImg.png'

const Home = () => {
  return (
    <div>

        {/* Section 1 - hero section */}
        <section className='w-full bg-[#F9F9F9] py-24 p-4'>
            <div className='md:max-w-[1100px] m-auto grid md:grid-cols-2 max-w-[400px]'>
                <div className='flex flex-col justify-start gap-4'>
                    <p className='py-2 text-4xl text-[#208486] font-bold'>START TO SUCCESS</p>
                    <h1 className='md:leading-[42px] py-2 md:text-3xl text-lg font-semibold'>
                        Unlock your <span className='text-[#208486]'>learning potential</span> with our online courses from <span className='text-[#208486]'>professional</span> and <span className='text-[#208486]'>trusted</span> instructors.
                    </h1>
                    <p className='py-2 text-lg text-gray-900'>Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</p>
                    <CTAButton active={true} linkTo={"/signup"}>
                        Start Learning
                    </CTAButton>
                </div>
                <img src={heroImg} alt="hero" className='md:order-last order-first'/>
            </div>
        </section>

        {/* Section 2 */}
        <div className='bg-pureGreys-5 text-richBlack-700'>

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

            </div>

        </div>

        {/* Section 3 */}
        <Categories/>

        {/* Section 4 */}
        <section className='bg-[#1F8586]'>
            <div className='w-11/12 max-w-maxContent mx-auto'>
                <Stats/>
            </div>
        </section>

        {/* Section 5 */}
        <Feedback/>

        {/* Section 6 */}
        <section className='w-full bg-white py-24 p-4 items-center'>
            <div className='md:max-w-[1100px] m-auto grid md:grid-cols-2 gap-8 max-w-[400px]'>
                <img src={home_signup} alt="hero" className='w-[500px] mx-auto'/>
                <div className='flex flex-col justify-start gap-4'>
                    <div>
                    <h1 className='md:leading-[42px] py-8 md:text-3xl text-lg font-semibold'>
                        Join one of the best <span className='text-[#208486]'>platforms for online</span> courses from all over the world
                    </h1>
                    <CTAButton active={true} linkTo={"/signup"}>
                        Sign up now!
                    </CTAButton>
                    </div>
                </div>
            </div>
        </section>

        {/* Footer */}
        <Footer/>

    </div>
  )
}

export default Home