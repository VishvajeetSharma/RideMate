import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
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
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img src="../public/images/RideMate.png" className='w-30 mb-10' />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='bg-[#eeeeee] rounded px-4 py-2 mb-7 w-full text-lg placeholder:text-base'
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='bg-[#eeeeee] rounded px-4 py-2 mb-7 w-full text-lg placeholder:text-base'
            placeholder='Password'
          />

          <button
            className='bg-[#111] rounded text-white py-3 mb-3 w-full font-semibold text-lg'
          >
            Login
          </button>
        </form>
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'> Create new Account</Link></p>
      </div>
      <div>
        <Link to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center rounded text-white py-3 mb-5 w-full font-semibold text-lg'>
          Sign in as Captain
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserLogin;
