import React from 'react'
import {IoMdChatbubbles, IoIosCall} from 'react-icons/io'
import {BsGlobeCentralSouthAsia} from 'react-icons/bs'
import ContactUsForm from '../components/core/ContactPage/ContactUsForm'
import Footer from '../components/common/Footer'

const Contact = () => {
  return (
    <div>
      
        {/* section 1 */}
        <section>

            <div className='w-11/12 max-w-maxContent mx-auto gap-6 items-center'>
            
                <div className='flex gap-10 py-[90px]'>

                    {/* contact details */}
                    <div className='bg-richBlack-800 flex flex-col gap-10 p-8 rounded-xl h-fit'>

                        <div className='flex gap-4'>
                            <IoMdChatbubbles size={27} className='text-richBlack-100'/>
                            <div className='flex flex-col'>
                                <div className='font-semibold text-richBlack-5 text-lg leading-[26px] mb-1'>
                                    Chat with us
                                </div>
                                <div className='text-richBlack-200 font-medium text-sm leading-[22px]'>
                                    Our friendly team is here to help.
                                </div>
                                <div className='text-richBlack-200 font-medium text-sm leading-[22px]'>
                                    info@studynotion.com
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <BsGlobeCentralSouthAsia size={27} className='text-richBlack-100'/>
                            <div className='flex flex-col'>
                                <div className='font-semibold text-richBlack-5 text-lg leading-[26px] mb-1'>
                                    Visit us
                                </div>
                                <div className='text-richBlack-200 font-medium text-sm leading-[22px]'>
                                    Come and say hello at our office HQ.
                                </div>
                                <div className='text-richBlack-200 font-medium text-sm leading-[22px]'>
                                    Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <IoIosCall size={27} className='text-richBlack-100'/>
                            <div className='flex flex-col'>
                                <div className='font-semibold text-richBlack-5 text-lg leading-[26px] mb-1'>
                                    Call us
                                </div>
                                <div className='text-richBlack-200 font-medium text-sm leading-[22px]'>
                                    Mon - Fri From 8am to 5pm
                                </div>
                                <div className='text-richBlack-200 font-medium text-sm leading-[22px]'>
                                    +123 456 7890
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* from */}
                    <div className='flex flex-col rounded-xl border border-richBlack-600 gap-8 py-14'>

                        <div className='flex flex-col gap-3 ml-16'>
                            <div className='font-semibold text-richBlack-5 text-4xl leading-[44px] max-w-[80%]'>
                                Got a Idea? We've got the skills. Let's team up
                            </div>
                            <div className='font-medium text-richBlack-300 text-base w-fit'>
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