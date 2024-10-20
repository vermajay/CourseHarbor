import React from 'react'
import quotationMark from '../../../assets/Images/quotationMark.png'

const FeedBackCard = () => {
  return (
    <div className='bg-white p-8 border shadow-sm my-8 mx-2'>
        <div className='flex justify-between'>
            <div className='flex gap-4'>
                <img src={"https://api.dicebear.com/9.x/lorelei/svg"} alt="feedback" />
                <div>
                    <h1>Jenny Wilson</h1>
                    <p>UI/UX Designer</p>
                </div>
                <img src={quotationMark} alt="quote" className='h-8' />
            </div>
        </div>
        <div className='py-8'>
            <h3 className='text-lg'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto praesentium distinctio excepturi dolor, nihil unde exercitationem eligendi sit quam nemo cumque, tenetur hic, quasi atque. Fuga saepe vitae cum quasi!</h3>
        </div>
    </div>
  )
}

export default FeedBackCard