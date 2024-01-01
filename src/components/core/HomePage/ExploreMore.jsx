import React, { useState } from 'react'
import {HomePageExplore} from '../../../data/homepage-explore' 
import HighlightText from '../HomePage/HighlightText'
import {HiUsers} from 'react-icons/hi'
import {FaSitemap} from 'react-icons/fa'

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag);

    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const toDisplay = HomePageExplore.filter((data)=>data.tag == currentTab);
    const courses = toDisplay[0].courses;

    return (
        <div className='relative flex flex-col items-center'>
        
            <div className='font-semibold text-4xl leading-[44px] text-richBlack-5 mt-12'>
                Unlock the <HighlightText text={"Power of Code"}/>
            </div>

            <div className='font-semibold text-richBlack-300 text-lg'>
                Learn to Build Anything You Can Imagine
            </div>

            <div className='flex items-center gap-5 bg-richBlack-800 text-richBlack-300 px-1 py-1 rounded-full
            drop-shadow-[0px_2px_rgba(255,255,255,0.25)] mt-5 mb-60'>
                {
                    HomePageExplore.map((data, index)=>{
                        return  <div key={index} onClick={()=>{setCurrentTab(data.tag); setCurrentCardIndex(0)}}
                                    className={`font-medium transition-all duration-200 px-8 py-2 rounded-full
                                                ${currentTab == data.tag ? `bg-richBlack-900 text-richBlack-5` : ``}
                                                hover:bg-richBlack-900 hover:text-richBlack-5 cursor-pointer`}>
                                    {data.tag}
                                </div>
                    })
                }
            </div>

            <div className='absolute top-64 flex gap-16'>
                {
                    courses.map((course, index)=>{
                        return  <div key={index} onClick={()=>{setCurrentCardIndex(index)}} className={`flex flex-col min-w-[380px] cursor-pointer
                                                                                 ${currentCardIndex == index ? `shadow-[13px_13px_0px_0px_rgb(255,214,10)] bg-white` : `bg-richBlack-800`}`}>
                                    <div className='px-6 pt-6 min-h-[244px]'>
                                        <div className={`font-semibold ${currentCardIndex == index ? `text-richBlack-800` : `text-richBlack-25`} text-xl`}>
                                            {course.heading}
                                        </div>
                                        <div className='text-richBlack-400 pb-20 pt-3'>
                                            {course.description}
                                        </div>
                                    </div>
                                    <div className={`flex justify-between px-6 pb-6 pt-4 ${currentCardIndex == index ? `text-blue-500` : `text-richBlack-300`}
                                     text-base font-medium border-t-2 border-richBlack-400 border-dashed`}>
                                        <div className='flex gap-2 items-center'>
                                            <HiUsers/>
                                            <div>{course.level}</div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <FaSitemap/>
                                            <div>{course.lessionNumber} Lession</div>
                                        </div>
                                    </div>
                                </div>
                    })
                }
            </div>

        </div>
    )
}

export default ExploreMore