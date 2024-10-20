import React from 'react'
import ContactUsForm from '../components/core/ContactPage/ContactUsForm'
import Footer from '../components/common/Footer'
import image from "../assets/Images/contactus.png"

const Contact = () => {
  return (
    <div>
      
        {/* section 1 */}
        <section>

            <div className='w-11/12 max-w-maxContent mx-auto gap-6 items-center'>
            
                <div className='flex gap-10 py-[90px]'>


                    {/* contact details */}
                    <div className='flex flex-col gap-10 p-8 rounded-xl h-fit'>
                        <img className='' src={image} alt='conatct-us' width={558} height={504} loading='lazy'/>
                    </div>

                    {/* from */}
                    <div className='flex flex-col gap-8'>

                        <div className='flex flex-col gap-3 ml-16'>
                            <div className='font-semibold text-[#208486] text-4xl leading-[44px] max-w-[80%]'>
                                Got a Idea? We've got the skills. Let's team up
                            </div>
                            <div className='font-medium text-[#4B5563] text-base w-fit'>
                                Tell us more about yourself and what you've got in mind.
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <ContactUsForm/>
                        </div>

                    </div>

                </div>

            </div>

        </section>

        <Footer/>

    </div>
  )
}

export default Contact