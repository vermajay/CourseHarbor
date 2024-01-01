import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
      
        <div className='font-semibold text-4xl leading-[44px] text-richBlack-5'>
            Get in Touch
        </div>
        <div className='font-medium text-base text-richBlack-300'>
            We'd love to here from you, please fill out this form.
        </div>
        <div>
            <ContactUsForm/>
        </div>

    </div>
  )
}

export default ContactFormSection