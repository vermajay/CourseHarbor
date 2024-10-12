import React from 'react'
import { FooterLink2 } from '../../data/footer-links'
import LogoFullLight from '../../assets/Logo/Logo-Full-Light.png'
import {BsFacebook, BsGoogle, BsTwitter, BsYoutube} from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-richBlack-800 flex flex-col border-t-[1px] border-richBlack-600 px-[120px] py-[52px]
    text-richBlack-400 text-sm leading-[22px] font-normal'>
      
        <div className='flex'>

            <div className='flex gap-7'>

                <div className='flex flex-col gap-3'>
                    <img src={LogoFullLight}/>
                    <p className='font-semibold text-base text-richBlack-25'>Company</p>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/about'>About</Link>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/careers'>Careers</Link>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/affiliates'>Affiliates</Link>
                    <div className='flex text-xl gap-3'>
                        <BsFacebook/>
                        <BsGoogle/>
                        <BsTwitter/>
                        <BsYoutube/>
                    </div>
                </div>

                <div className='flex flex-col gap-3 pr-16'>
                    <p className='font-semibold text-base text-richBlack-25'>Resources</p>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/articles'>Articles</Link>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/blog'>Blog</Link>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/chart-sheet'>Chart Sheet</Link>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/code-challenges'>Code Challenges</Link>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/docs'>Docs</Link>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/projects'>Projects</Link>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/videos'>Videos</Link>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/workspaces'>Workspaces</Link>
                    <p className='font-semibold text-base text-richBlack-25 mt-3'>Support</p>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/help-center'>Help Center</Link>
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='font-semibold text-base text-richBlack-25'>Plans</p>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/paid-memberships'>Paid Memberships</Link>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/for-students'>For Students</Link>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/business-solutions'>Business Solutions</Link>
                    <p className='font-semibold text-base text-richBlack-25 mt-3'>Community</p>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/forums'>Forums</Link>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/chapters'>Chapters</Link>
                    <Link className='hover:text-richBlack-25 transition-all duration-200' to='/events'>Events</Link>
                </div>

            </div>

            <div className='w-[1px] h-[630px] bg-richBlack-700 ml-20'></div>

            <div className='flex gap-20 ml-6'>
                {
                    FooterLink2.map((Section, index)=>{
                        return (
                            <div key={index}>
                                <div className='font-semibold text-base text-richBlack-25'>{Section.title}</div>
                                {
                                    Section.links.map((Data, index)=>{
                                        return (
                                            <div key={index} className='my-3'>
                                                <Link className='hover:text-richBlack-25 transition-all duration-200' to={Data.link}>{Data.title}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>

        </div>

        <div className='w-full h-[1px] bg-richBlack-700 mt-5'></div>

        <div className='flex justify-between mt-12'>

            <div className='flex gap-2'>
            <Link className='hover:text-richBlack-25 transition-all duration-200' to='/privacy-policy'>Privacy Policy</Link>
            <p className='text-richBlack-600'>|</p>
            <Link className='hover:text-richBlack-25 transition-all duration-200' to='/cookie-policy'>Cookie Policy</Link>
            <p className='text-richBlack-600'>|</p>
            <Link className='hover:text-richBlack-25 transition-all duration-200' to='/terms'>Terms</Link>
            </div>

            <div>
                Made with <span className='text-[#FF0000]'>❤️</span> Jay Verma © 2024 CourseHarbor
            </div>

        </div>
      
    </div>
  )
}

export default Footer