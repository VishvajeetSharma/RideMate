import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom' // Added useLocation
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'
import axios from 'axios'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {} 
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()
    console.log(ride);
    const [pointA, setPointA] = useState(null);
    const [pointB, setPointB] = useState(null);

    const [error, setError] = useState(null);

    const pickup = ride.pickup;
    const destination = ride.destination;
    const token = localStorage.getItem('token');
    
    const fetchCoordinatesA = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/maps/get-coordinate`, {
                params: { address: pickup },
                headers: {
                    Authorization: `Bearer ${token}` // pass the token in headers
                }
            });
            setPointA(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch coordinates');
        }
    };

    const fetchCoordinatesB = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/maps/get-coordinate`, {
                params: { address: destination },
                headers: {
                    Authorization: `Bearer ${token}` // pass the token in headers
                }
            });
            setPointB(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch coordinates');
        }
    };

    useEffect(() => {
        fetchCoordinatesA();
        fetchCoordinatesB();
    }, []);
    

    socket.on("ride-ended", () => {
        navigate('/home')
    })


    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>


            <div className='h-2/3'>
            {/* <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}> */}
      <LiveTracking pointA={pointA} pointB={pointB} />
    {/* </div> */}

            </div>
            <div className='h-1/3 p-4 mt-1'>
                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>

                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-2'>

                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>{ride?.destination}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Destination</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-currency-line"></i>
                            <div className='w-full'>
                                <div className='flex justify-between items-center w-full'>
                                <h3 className='text-lg font-medium'>₹{ride?.fare} </h3> <div className='bg-red-600 text-white font-semibold p-2 rounded-lg px-5'><a href="tel:112"><i class="ri-alarm-warning-line"></i> SOS</a></div>
                                </div>
                                <p className='text-sm -mt-3 text-gray-600'>Cash Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Riding