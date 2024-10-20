import React from 'react'
import Template from '../components/core/Auth/Template'
import signup from '../assets/Images/signup.png'

const SignUp = () => {
  return (
    <Template
      title="Join the millions learning skills with CourseHarbor!"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={signup}
      formType="signup"
    />
  )
}

export default SignUp