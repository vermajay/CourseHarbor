import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import CTAButton from './CTAButton'
import {FaArrowRight} from 'react-icons/fa'

const CodeBlocks = ({position, heading, subheading, ctabtn1, ctabtn2, codeBlock, backgroudGradient, codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>

        {/* Section 1 */}
        <div className='flex flex-col gap-5 w-[50%]'>
            {heading}
            <div className='text-richBlack-300 font-bold w-[85%]'>
                {subheading}
            </div>
            <div className='flex gap-7 mt-8'>
                <CTAButton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
                    <div className='flex items-center gap-2'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
                    {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* Section 2 */}
        <div className='relative w-[100%] lg:w-[500px] select-none'>
        
            {/* bg gradient */}
            <div className={`absolute left-10 h-[220px] w-[300px] rounded-[50%] blur-2xl ${backgroudGradient}`}></div>

            <div className='border-2 flex gap-3
            border-[#ffffff22] p-4 bg-gradient-to-r from-[#0E1A2D3D] to-[#111E3261] backdrop-blur-2xl'>

                <div className='flex flex-col text-center text-richBlack-400 font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`flex flex-col gap-2 font-bold font-mono ${codeColor}`}>
                    <TypeAnimation
                        sequence={[codeBlock, 2000, ""]}
                        repeat={Infinity}
                        style = {
                            {
                                whiteSpace: "pre-line",
                            }
                        }
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>

    </div>
  )
}

export default CodeBlocks
