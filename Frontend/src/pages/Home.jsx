import React, { useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/userContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const [ride, setRide] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('join', { userId: user._id, userType: 'user' });
  }, [])
  // console.log("user", user);

  socket.on('ride-confirmed', ride => {
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    // console.log("ride")
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride } })
  })

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (Array.isArray(response.data)) {
        setPickupSuggestions(response.data);
      } else {
        setPickupSuggestions([]); // Handle unexpected response structure
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setDestinationSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }
  const submitHandler = (e) => {
    e.preventDefault();
  }

  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, { pickup, destination },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    setFare(response.data);
    // console.log(response.data)
  };

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log("Ride created successfully", response.data);
      })
      .catch(error => {
        console.error("Error creating ride:", error);
      });
  }


  useGSAP(() => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        height: panelOpen ? '70%' : '0%',
        opacity: panelOpen ? 1 : 0,
        padding: panelOpen ? 24 : 0,
        duration: 0.5,
      });
      gsap.to(panelCloseRef.current, {
        opacity: panelOpen ? 1 : 0,
        duration: 0.5
      });
    }
  }, [panelOpen])

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(120%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(120%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(120%)'
      })
    }
  }, [vehicleFound])

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(120%)'
      })
    }
  }, [waitingForDriver])

  return (
    <div className='h-screen relative'>
      <img className='w-30 absolute left-5 top-5' src="Images/RideMate.png" alt="" />
      <div className='h-screen w-screen'>
        {/* image for temp use */}
        <img className='h-full w-full object-cover' src="Images/Homemap.gif" alt="" />
      </div>
      <div className='absolute top-5 right-5 z-10'>
        <Link to='/users/logout' className='flex bg-white h-10 justify-center rounded-full w-10 items-center'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='flex flex-col justify-end h-screen top-0 absolute w-full'>
        <div className='h-[38%] p-6 bg-white relative'>
          <h5 className='absolute top-6 right-6 text-2xl opacity-0'
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false)
            }}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e);
          }}>
            <div className="line absolute h-16 w-1 top-[38%] left-10 bg-gray-800 rounded-full"></div>
            <input
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
              type="text" placeholder='Add a pick-up location'
              onClick={() => {
                setPanelOpen(true);
                setActiveField('pickup');
              }}
              value={pickup}
              onChange={handlePickupChange}
            />
            <input
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
              type="text" placeholder='Enter your destination'
              onClick={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              value={destination}
              onChange={handleDestinationChange}

            />
          </form>
          <button
            onClick={findTrip}
            className='w-full bg-green-600 text-white py-2 rounded-lg my-5'>Find Trip</button>
        </div>

        {/* Location Panel */}
        <div ref={panelRef} className='h-0 bg-white opacity-0 overflow-hidden pb-5'>
          <LocationSearchPanel
            setVehiclePanel={setVehiclePanel}
            setPanelOpen={setPanelOpen}
            activeField={activeField}
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setDestination={setDestination}
            setPickup={setPickup}
          />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 px-3 pb-5 pt-12 bg-white translate-y-full'>
        <VehiclePanel
          fare={fare}
          selectVehicle={setVehicleType}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel} />
      </div>

      {/* Confirm Ride */}
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 px-3 pb-5 pt-12 bg-white translate-y-full'>
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound} />
      </div>

      {/* Waiting for ride */}
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 px-3 pb-5 pt-12 bg-white translate-y-full'>
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      {/* Waiting for driver */}
      <div ref={WaitingForDriverRef} className='fixed w-full z-10 bottom-0 px-3 pb-5 pt-12 bg-white'>
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver} />
      </div>

    </div>
  )
}

export default Home
