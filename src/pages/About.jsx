import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import Footer from '../components/common/Footer'

import aboutus1 from '../assets/Images/aboutus1.webp'
import aboutus2 from '../assets/Images/aboutus2.webp'
import aboutus3 from '../assets/Images/aboutus3.webp'

const About = () => {
  return (
    <div>

        {/* section 1 */}
        <section className='bg-[#f6f6f6]'>
            
            <div className='relative w-11/12 max-w-maxContent mx-auto flex flex-col gap-10 items-center pt-14'>
                
                <div className='text-black font-semibold text-5xl'>
                    Driving Innovation in Online Education for a 
                    <div className='text-center'><HighlightText text={"Brighter Future"}/></div>
                </div>

                <div className='font-medium text-[#4B5563] text-base max-w-[55rem] text-center'>
                CourseHarbor is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </div>

                <div className='absolute bottom-8 h-[150px] w-[400px] rounded-full blur-[80px] bg-[#20B486]'></div>
                
                <div className='absolute -bottom-14 flex gap-6'>

                    <img src={aboutus1} alt='aboutus1' className='rounded-lg'/>
                    <img src={aboutus2} alt='aboutus2' className='rounded-lg'/>
                    <img src={aboutus3} alt='aboutus3' className='rounded-lg'/>

                </div>

                <div className='h-[280px]'></div>

            </div>

        </section>

        {/* section 2 */}
        <section className='bg-[#F0F8F7]'>
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col gap-6 items-center'>

                <div className='h-[100px]'></div>

                <div className='border-t border-white py-[90px] px-[70px]'>

                    <div className='relative flex gap-40 justify-between'>

                        <div className='flex flex-col text-[#4B5563]'>
                            <div className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent font-semibold text-4xl leading-[44px] mb-6'>
                                Our Founding Story
                            </div>
                            <div className='font-medium text-base mb-3'>
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </div>
                            <div className='font-medium text-base'>
                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>

        <Footer/>

    </div>
  )
}

export default About