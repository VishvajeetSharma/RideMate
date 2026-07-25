import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain); // Update the captain state
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
        toast.success('Login Successful!');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          toast.error('Your account is blocked.');
        } else if (error.response.status === 401) {
          toast.error('Invalid email or password.');
        } else {
          toast.error('An error occurred. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className='flex flex-col h-screen justify-between p-7'>
      <div>
        <img src="../public/images/RideMateCaptain.png" className='w-30 mb-10' />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='bg-[#eeeeee] rounded text-lg w-full mb-7 placeholder:text-base px-4 py-2'
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='bg-[#eeeeee] rounded text-lg w-full mb-7 placeholder:text-base px-4 py-2'
            placeholder='Password'
          />

          <button
            className='bg-[#111] rounded text-lg text-white w-full font-semibold mb-3 py-3'
          >
            Login
          </button>
        </form>
        <p className='text-center'>Want to Join a fleet? <Link to='/captain-signup' className='text-blue-600'> Register as a Captain</Link></p>
      </div>
      <div>
        <Link to='/login' 
          className='flex bg-[#d5622d] justify-center rounded text-lg text-white w-full font-semibold items-center mb-5 py-3'>
          Sign in as User
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CaptainLogin;
