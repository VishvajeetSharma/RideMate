import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
      <h5 onClick={()=>{
        props.setVehiclePanel(false)
      }} className='p-1 text-center absolute top-0 w-[92%]'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a vehicle</h3>
              {/* Rides */}
              <div onClick={()=>{
                props.selectVehicle('car')
                props.setConfirmRidePanel(true)
              }} className='flex w-full items-center justify-between p-3 border-2 border-gray-50 active:border-black rounded-xl mb-2'>
                <img src="Images/car.webp" alt="" className='h-10  w-[20%]' />
                <div className='ml-2 w-[54%]'>
                  <h4 className='font-medium text-lg'>RMate Car <span className='ms-0.5'><i className="ri-user-fill"></i>4</span></h4>
                  <h5 className='font-medium text-sm'>2 mins away</h5>
                  <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold w-[15%] pe-4'>{props.fare?.car ? `₹${props.fare.car}` : 'Fare not available'}</h2>
              </div>

              <div onClick={()=>{
                props.selectVehicle('moto')
                props.setConfirmRidePanel(true)
              }} className='flex w-full items-center justify-between p-3 border-2 border-gray-50 active:border-black rounded-xl mb-2'>
                <img src="Images/bike.webp" alt="" className='h-10 w-[20%]' />
                <div className='ml-2 w-[54%]'>
                  <h4 className='font-medium text-lg'>RMate Moto <span className='ms-0.5'><i className="ri-user-fill"></i>1</span></h4>
                  <h5 className='font-medium text-sm'>2 mins away</h5>
                  <p className='font-normal text-xs text-gray-600'>Affordable, moto rides</p>
                </div>
                <h2 className='text-lg font-semibold w-[15%] pe-4'>{props.fare?.moto ? `₹${props.fare.moto}` : 'Fare not available'}</h2>
              </div>

              <div onClick={()=>{
                props.selectVehicle('auto')
                props.setConfirmRidePanel(true)
              }} className='flex w-full items-center justify-between p-3 border-2 border-gray-50 active:border-black rounded-xl mb-2'>
                <img src="Images/auto.webp" alt="" className='h-10  w-[20%]' />
                <div className='ml-2 w-[54%]'>
                  <h4 className='font-medium text-lg'>RMate Auto <span className='ms-0.5'><i className="ri-user-fill"></i>3</span></h4>
                  <h5 className='font-medium text-sm'>2 mins away</h5>
                  <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
                </div>
                <h2 className='text-lg font-semibold w-[15%] pe-4'>{props.fare?.auto ? `₹${props.fare.auto}` : 'Fare not available'}</h2>
              </div>
    </div>
  )
}

export default VehiclePanel
