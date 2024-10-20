import React from 'react'

const Stats = () => {

    const stats = [
        {
            count: "5000+",
            label: "Active Students"
        },
        {
            count: "10+",
            label: "Mentors"
        },
        {
            count: "200+",
            label: "Courses"
        },
    ]

  return (
    <div className='px-[85px] py-[90px] flex justify-around'>
      {
        stats.map((stat, index) => (

            <div key={index} className='flex flex-col items-center gap-1'>

                <div className='text-white font-bold text-5xl leading-[38px]'>
                    {stat.count}
                </div>
                <div className='text-richBlack-5 text-2xl font-semibold'>
                    {stat.label}
                </div>

            </div>
        ))
      }
    </div>
  )
}

export default Stats