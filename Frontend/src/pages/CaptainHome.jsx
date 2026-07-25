import React, { useContext, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { CaptainDataContext } from '../context/CaptainContext'
import { SocketContext } from '../context/SocketContext'
import axios from 'axios'

const CaptainHome = () => {

  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);
 

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);

  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const confirmRidePopUpPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  useEffect(() => {
    socket.emit('join', {userId: captain._id,userType: 'captain' })

    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                socket.emit('update-location-captain', {
                    userId: captain._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            })
        }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()
}, [])

socket.on('new-ride', (data) => {
  setRide(data);
  setRidePopUpPanel(true);
})

async function confirmRide() {

  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

      rideId: ride._id,
      captainId: captain._id,


  }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })

  setRidePopUpPanel(false)
  setConfirmRidePopUpPanel(true)

}

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
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopUpPanel])


  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopUpPanel])

  return (
    <div className='h-screen'>
      <div className='flex justify-between p-6 w-full fixed items-center top-0'>
        <div>
          <img className='w-30' src="Images/RideMate.png" alt="" />
        </div>
        <div>
          <Link to='/captains/logout' className='flex bg-white h-10 justify-center rounded-full w-10 items-center'>
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
          </Link>
        </div>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="Images/Homemap.gif" alt="" />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      {/* Ride Pop Up */}
      <div ref={ridePopUpPanelRef} className='bg-white w-full bottom-0 fixed pb-5 pt-12 px-3 translate-y-full z-10'>
        <RidePopUp
        ride={ride}        
        setRidePopUpPanel={setRidePopUpPanel} 
        setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
        confirmRide={confirmRide}
        distanceTime={distanceTime}
        />
      </div>

      {/* User's Details */}
      <div ref={confirmRidePopUpPanelRef} className='bg-white h-screen w-full bottom-0 fixed pb-5 pt-12 px-3 translate-y-full z-10'>
        <ConfirmRidePopUp
        ride={ride}
        setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}  
        setRidePopUpPanel={setRidePopUpPanel}
        distanceTime={distanceTime}
        />
      </div>
    </div>
  )
}

export default CaptainHome
