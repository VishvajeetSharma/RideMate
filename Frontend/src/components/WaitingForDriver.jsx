import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
            <h5 onClick={() => {
                props.setWaitingForDriver(false)
            }} className='p-1 text-center absolute top-0 w-[92%]'>
              <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <div className='flex items-center justify-between'>
            <img src="Images/car.webp" alt="" className='h-12' />
            <div className='text-right'>
              <h2 className='text-lg font-medium -mt-1 -mb-1 capitalize'>{props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}</h2>
              <h4 className='text-xl font-semibold'>{props.ride?.captain.vehicle.plate}</h4>
              <p className='text-sm text-gray-600'>Maruti Swift</p>
              <h1 className='text-lg font-semibold'>{props.ride?.otp} </h1>
            </div>
            </div>
            <div className='flex flex-col gap-2 justify-between items-center'>
                
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.pickup}</h3>
                            {/* <p className='text-sm -mt-1 text-gray-600'>Badshahnagar Metro, Lucknow</p> */}
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.destination}</h3>
                            {/* <p className='text-sm -mt-1 text-gray-600'>Badshahnagar Metro, Lucknow</p> */}
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Payment Cash</p>
                        </div>
                    </div>
                </div>
                <button><img src="Images/loading.gif" className='h-30 -mt-5' alt="" /></button>
            </div>
        </div>
  )
}

export default WaitingForDriver
