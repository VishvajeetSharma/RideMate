import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'
import axios from 'axios'
import './map.css'

const CaptainRiding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    // console.log(ride);

    const [ finishRidePanel, setFinishRidePanel ] = useState(false)
    const finishRidePanelRef = useRef(null)
    const rideData = location.state?.ride

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

    const [distanceTime, setDistanceTime] = useState(null);

useEffect(() => {
    const fetchDistanceTime = async () => {
        const origin = ride?.pickup;
        const destination = ride?.destination;
        const token = localStorage.getItem('token');

        if (!origin || !destination) {
            console.warn('Missing origin or destination');
            return;
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-distance-time`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    origin,
                    destination
                }
            });

            setDistanceTime(response.data);
            console.log("Distance & Time:", response.data);
        } catch (error) {
            console.error('Error fetching distance/time:', error.response?.data || error.message);
        }
    };

    fetchDistanceTime();
}, []);



    useGSAP(() => {
        gsap.to(finishRidePanelRef.current, {
            transform: finishRidePanel ? 'translateY(0%)' : 'translateY(100%)',
            duration: 0.5,
            ease: 'power3.out'
        });
    }, [finishRidePanel]);


    return (
        <div className='h-screen relative flex flex-col justify-end z-0'>

            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="Images/RideMate.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10 z-50'
                onClick={() => {
                    setFinishRidePanel(true)
                }}
            >
                <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {

                }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
                {/* <h4 className='text-xl font-semibold'>{'4 KM away'}</h4> */}
                <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
                <div className='bg-red-600 text-white font-semibold p-2 rounded-lg px-5'><a href="tel:112"><i class="ri-alarm-warning-line"></i> SOS</a></div>
            </div>
            <div ref={finishRidePanelRef} className='fixed w-full z-50 bottom-0 bg-white px-3 py-10 pt-12'
            style={{ transform: 'translateY(100%)' }} 
            >
                <FinishRide
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel} 
                    distanceTime={distanceTime}
                    />
            </div>

            <div className='h-full fixed w-screen top-0 z-0'>
            <LiveTracking pointA={pointA} pointB={pointB} />
                
            </div>

        </div>
    )
}

export default CaptainRiding