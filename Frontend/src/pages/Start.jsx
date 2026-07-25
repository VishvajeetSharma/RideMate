import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='h-screen bg-[url(../public/images/HomeBG.png)] bg-cover bg-center pt-5 w-full bg-red-400 flex justify-between flex-col'>
        <img src="../public/images/RideMate.png" className='w-30 ml-5' />
        <div className='bg-white py-4 px-4 pb-7'>
            <h2 className='text-2xl font-bold'>Get Started with RideMate</h2>
            <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
