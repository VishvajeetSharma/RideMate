import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {

  const {captain} = useContext(CaptainDataContext);
  // console.log(captain);

  if (!captain) {
    return <div>Loading captain data...</div>;
  }
  
  return (
    <div>
              <div className='flex justify-between items-center'>
          <div className='flex justify-start gap-3 items-center'>
            {/* <img src="\Images\driver.jpg" alt="" className='h-10 rounded-full w-10 object-cover' /> */}
            <h4 className='text-lg font-medium uppercase'>{captain?.fullname?.firstname + ' ' + captain?.fullname?.lastname || 'Please log in'}</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>₹295.20</h4>
            <p className='text-gray-600 text-sm'>Earned</p>
          </div>
        </div>

        <div className='flex bg-gray-100 justify-center p-3 rounded-xl gap-5 items-start mt-8'>

          <div className='text-center'>
            <i className="text-3xl font-extralight mb-2 ri-timer-2-line"></i>
            <h5 className='text-lg font-medium'>10.3</h5>
            <p className='text-gray-600 text-sm'>Hours Online</p>
          </div>

          <div className='text-center'>
            <i className="text-3xl font-extralight ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>10.3</h5>
            <p className='text-gray-600 text-sm'>Hours Online</p>
          </div>

          <div className='text-center'>
            <i className="text-3xl font-extralight ri-booklet-line"></i>
            <h5 className='text-lg font-medium'>10.3</h5>
            <p className='text-gray-600 text-sm'>Hours Online</p>
          </div>

        </div>
    </div>
  )
}

export default CaptainDetails
