import React from 'react'
import quotationMark from '../../../assets/Images/quotationMark.png'
import { FaStar } from "react-icons/fa"
import ReactStars from "react-rating-stars-component"

const FeedBackCard = ({review}) => {

    const truncateWords = 30;

  return (
    <div className='bg-white p-8 border shadow-sm my-8 mx-2'>
        <div className='flex justify-between'>
            <div className='flex gap-4'>
                <img width={100} className='rounded-md'
                    src={ review?.user?.image ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt="feedback"
                />
                <div>
                    <h1>{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                    <p className='font-medium'>{review?.course?.courseName}</p>
                </div>
                <img src={quotationMark} alt="quote" className='h-8' />
            </div>
        </div>
        <div className='py-8'>
            <h3 className='text-lg'>
            {review?.review.split(" ").length > truncateWords
                ? `${review?.review
                    .split(" ")
                    .slice(0, truncateWords)
                    .join(" ")} ...`
                : `${review?.review}`}
            </h3>
        </div>
        <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[#1F8586]">
                {review.rating.toFixed(1)}
            </h3>
            <ReactStars
                count={5}
                value={review.rating}
                size={20}
                edit={false}
                activeColor="#1F8586"
                emptyIcon={<FaStar />}
                fullIcon={<FaStar />}
            />
        </div>
    </div>
  )
}

export default FeedBackCard