import React from 'react'
import Template from '../components/core/Auth/Template'
import login from '../assets/Images/login.webp'

const LogIn = () => {
  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={login}
      formType="login"
    />
  )
}

export default LogIn