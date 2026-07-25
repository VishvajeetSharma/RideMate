import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
const CaptainSignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({});
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');


  const [vehicleType, setVehicleType] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  }
  return (
    <div>
      <div className='py-5 px-5 h-screen flex flex-col justify-between'>
        <div>
          <img src="../public/images/RideMateCaptain.png" className='w-30 mb-5' />
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <h3 className='text-lg font-medium mb-2'>What's our Captain's name?</h3>
            <div className='flex gap-3 mb-5'>
              <input
                type='text'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base'
                placeholder='First name...'
              />
              <input
                type='text'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base'
                placeholder='Last name...'
              />
            </div>

            <h3 className='text-lg font-medium mb-2'>What's our Captain's email?</h3>
            <input
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className='bg-[#eeeeee] rounded px-4 py-2 mb-5 w-full text-lg placeholder:text-base'
              placeholder='email@example.com'
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className='bg-[#eeeeee] rounded px-4 py-2 mb-5 w-full text-lg placeholder:text-base'
              placeholder='Password'
            />
            <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className='bg-[#eeeeee] rounded px-4 py-2 mb-3 w-full text-lg'
            >
              <option value="">Select vehicle type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>

            <input
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              className='bg-[#eeeeee] rounded px-4 py-2 mb-3 w-full text-lg placeholder:text-base'
              placeholder='Vehicle color'
            />

            <input
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              className='bg-[#eeeeee] rounded px-4 py-2 mb-3 w-full text-lg placeholder:text-base'
              placeholder='Vehicle plate number'
            />

            <input
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              className='bg-[#eeeeee] rounded px-4 py-2 mb-7 w-full text-lg placeholder:text-base'
              placeholder='Vehicle capacity'
            />
            <div className='py-3'>
              <input type="checkbox" required /> I agree to the <Link to="/captain-terms" className='text-blue-600'>terms and conditions</Link>
            </div>

            <button
              className='bg-[#111] rounded text-white py-3 mb-3 w-full font-semibold text-lg'
            >
              Register
            </button>
          </form>
          <p className='text-center mb-3'>Already have an Account? <Link to='/captain-login' className='text-blue-600'> Login Here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight mb-7 pb-5'>By proceeding, you consent to get mails, including by automated means,
            from RideMate and its affiliates to the email provided.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignUp
