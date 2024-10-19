import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import Stats from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'

import aboutus1 from '../assets/Images/aboutus1.webp'
import aboutus2 from '../assets/Images/aboutus2.webp'
import aboutus3 from '../assets/Images/aboutus3.webp'
import FoundingStory from '../assets/Images/FoundingStory.png'

const About = () => {
  return (
    <div>

        {/* section 1 */}
        <section className='bg-richBlack-800'>
            
            <div className='relative w-11/12 max-w-maxContent mx-auto flex flex-col gap-6 items-center pt-14'>
                
                <div className='text-richBlack-5 font-semibold text-4xl leading-[44px]'>
                    Driving Innovation in Online Education for a 
                    <div className='text-center'><HighlightText text={"Brighter Future"}/></div>
                </div>

                <div className='font-medium text-richBlack-300 text-base max-w-[55rem] text-center'>
                CourseHarbor is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </div>

                <div className='absolute bottom-24 h-[140px] w-[300px] rounded-full blur-2xl bg-[#F09819]'></div>
                
                <div className='absolute -bottom-14 flex gap-6'>

                    <img src={aboutus1} alt='aboutus1'/>
                    <img src={aboutus2} alt='aboutus2'/>
                    <img src={aboutus3} alt='aboutus3'/>

                </div>

                <div className='h-[280px]'></div>

            </div>

        </section>

        {/* section 2 */}
        <section>
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col gap-6 items-center'>

                <div className='h-[100px]'></div>

                <div className='text-richBlack-100 font-semibold text-4xl leading-[52px] text-center mb-12'>
                    <span className='text-richBlack-600 font-black text-5xl font-mono'>"</span>
                    We are passionate about revolutionizing the way we learn. Our innovative platform 
                    <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-bold'> combines technology</span>
                    , 
                    <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent font-bold'> expertise</span>
                    , and community to create an 
                    <span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent font-bold'> unparalleled educational experience.</span>
                    <span className='text-richBlack-600 font-black text-5xl font-mono'>"</span>
                </div>

                <div className='border-t border-richBlack-600 py-[90px] px-[70px]'>

                    <div className='relative flex gap-40 justify-between'>

                        <div className='flex flex-col'>
                            <div className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent font-semibold text-4xl leading-[44px] mb-6'>
                                Our Founding Story
                            </div>
                            <div className='text-richBlack-300 font-medium text-base mb-3'>
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </div>
                            <div className='text-richBlack-300 font-medium text-base'>
                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                            </div>
                        </div>

                        <div className='absolute right-36 top-20 h-[150px] w-[350px] rounded-full
                            bg-gradient-to-r from-[#EC008C] to-[#FC6767] blur-[100px]'>
                        </div>

                        <img src={FoundingStory} alt='FoundingStory' className='object-contain z-0'/>

                    </div>

                    <div className='flex gap-40 justify-between mt-[130px]'>

                        <div className='flex flex-col'>
                            <div className='bg-gradient-to-br from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent font-semibold text-4xl leading-[44px] mb-6'>
                                Our Vision
                            </div>
                            <div className='text-richBlack-300 font-medium text-base'>
                                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <div className='bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-semibold text-4xl leading-[44px] mb-6'>
                                Our Mission
                            </div>
                            <div className='text-richBlack-300 font-medium text-base'>
                                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>

        {/* section 3 */}
        <section className='bg-richBlack-800'>
            <div className='w-11/12 max-w-maxContent mx-auto'>
                <Stats/>
            </div>
        </section>

        {/* section 4 */}
        <section>
            <div className='w-11/12 flex flex-col items-center gap-40 max-w-maxContent mx-auto py-[90px]'>
                <LearningGrid/>
                <ContactFormSection/>
            </div>
        </section>

        <Footer/>

    </div>
  )
}

export default About