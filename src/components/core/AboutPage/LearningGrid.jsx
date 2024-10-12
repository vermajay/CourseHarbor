import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/CTAButton'

const LearningGrid = () => {

    const LearningGridArray = [
        {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description:
            "CourseHarbor partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/",
        },
        {
          order: 1,
          heading: "Curriculum Based on Industry Needs",
          description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description:
            "The learning process uses the namely online and offline.",
        },
        {
          order: 3,
          heading: "Certification",
          description:
            "You will get a certificate that can be used as a certification during job hunting.",
        },
        {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description:
            "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
        },
        {
          order: 5,
          heading: "Ready to Work",
          description:
            "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
        },
    ];

  return (
    <div className='grid lg:grid-cols-4'>
      {
        LearningGridArray.map((grid, index) => (
            <div key={index} 
                className={`${grid.order == -1 && 'bg-transparent lg:col-span-2'}
                            ${grid.order % 2 == 0 ? 'bg-richBlack-800' : 'bg-richBlack-700'}
                            ${grid.order == 3 && 'lg:col-start-2'}`}>

                {
                    grid.order == -1 ?
                    (
                        <div className='flex flex-col items-start gap-5 mr-10'>
                            <div className='font-semibold text-4xl leading-[44px] text-richBlack-5 max-w-[35rem]'>
                                {grid.heading}{" "}
                                <HighlightText text={grid.highlightText}/>
                            </div>
                            <div className='font-medium text-base text-richBlack-300'>
                                {grid.description}
                            </div>
                            <CTAButton active={true} linkTo={grid.BtnLink}>
                                {grid.BtnText}
                            </CTAButton>
                        </div>
                    )
                    :
                    (
                        <div className='flex flex-col p-8 gap-8 pb-20'>
                            <div className='text-richBlack-5 font-semibold text-lg'>
                                {grid.heading}
                            </div>
                            <div className='text-richBlack-100 text-sm leading-[22px]'>
                                {grid.description}
                            </div>
                        </div>
                    )
                }

            </div>
        ))
      }
    </div>
  )
}

export default LearningGrid