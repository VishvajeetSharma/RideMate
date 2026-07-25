import React from 'react'

const RidePopUp = (props) => {

console.log(props);

    return (
        <div className='p-3 pt-0'>
            <h5 onClick={() => {
                props.setRidePopUpPanel(false)
            }} className='p-1 text-center absolute top-0 w-[92%]'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-9'>New ride available!</h3>

            <div className='flex items-center justify-between p-3 bg-yellow-200 rounded-xl'>
                <div className='flex items-center gap-3'>
                    <img src="/Images/user.avif" alt="" className='w-12 h-12 rounded-full object-cover' />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                </div>
                <div>
                <h6 className='text-sm font-semibold uppercase'>{props.distanceTime?.distance}</h6>
                <h6 className='text-sm font-semibold uppercase'>{props.distanceTime?.duration}</h6>
                </div>
                
            </div>

            <div className='flex flex-col gap-2 justify-between items-center'>

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            {/* <h3 className='text-lg font-medium'>%^@/11-A</h3> */}
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            {/* <h3 className='text-lg font-medium'>%^@/11-A</h3> */}
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
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
                <div className='flex mt-5 w-full items-center justify-between'>
                    <button onClick={() => {
                        props.setRidePopUpPanel(false)
                    }} className=' bg-gray-300 text-gray-800 font-semibold p-3 px-12 rounded-lg'>Ignore
                    </button>
                    <button onClick={() => {
                        props.setConfirmRidePopUpPanel(true)
                        props.confirmRide();
                    }} className=' bg-green-600 text-white font-semibold p-3 px-12 rounded-lg'>Accept
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp
