import React, { useEffect, useState } from "react"

// Get apiFunction and the endpoint
import { apiConnector } from "../../../services/apiConnector"
import { ratingsEndpoints } from "../../../services/apis"

import Slider from 'react-slick'
import FeedBackCard from './FeedBackCard'

const FeedBack = () => {

    const [reviews, setReviews] = useState([])
  
    useEffect(() => {
      ;(async () => {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success) {
          setReviews(data?.data)
        }
      })()
    }, [])

    var settings = {
        dots:true,
        infinite:false,
        speed:500,
        slidesToShow:2,
        slidesToScroll:1,
        responsive:[
        {
            breakpoint:1024,
            settings:{
                slidesToShow:1,
                slidesToScroll:1,
                infinite:false,
                dots:true
            }
        },
        {
            breakpoint:600,
            settings:{
                slidesToShow:1,
                slidesToScroll:1,
                infinite:false,
                dots:true
            }
        },
        {
            breakpoint:400,
            settings:{
                slidesToShow:1,
                slidesToScroll:1,
                infinite:false,
                dots:true
            }
        },
        ]
    }
  return (
    <section className='w-full bg-white py-24 p-4'>
        <div className='md:max-w-[1100px] m-auto max-w-[400px]'>
        <h1 className='py-4 text-3xl font-bold'>Students <span className='text-[#20B486]'>Feed back</span></h1>
            <p className='text-[#6D737A] py-2'>Discover inspiration and insights through recent reviews from our students. Their success stories reflect the transformative journey of learning and growth with CourseHarbor.</p>
            <Slider {...settings}>
                {reviews.map((review, i) => {
                    return (
                        <FeedBackCard review={review} key={i}/>
                    )
                })}
            </Slider>
        </div>
    </section>    
  )
}

export default FeedBack