import React from 'react'

const ConfirmRide = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setConfirmRidePanel(false)
            }} className='p-1 text-center absolute top-0 w-[92%]'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm Your Ride</h3>
            <div className='flex flex-col gap-2 justify-between items-center'>
                <img src="Images/car.webp" alt="" className='h-20' />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                    <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.pickup}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Pickup</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                    <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.destination}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Destination</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                    <i className="text-lg ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare?.[props.vehicleType] ?? "N/A"}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Payment Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={()=>{
                    props.createRide()
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg relative bottom-2'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide
