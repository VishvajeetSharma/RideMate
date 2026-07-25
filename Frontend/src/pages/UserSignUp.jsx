import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/userContext';

const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { user, setUser } = React.useContext(UserDataContext);


  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');

    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img src="../public/images/RideMate.png" className='w-30 mb-5' />
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
            <div className='flex gap-3 mb-7'>
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

            <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
            <input
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className='bg-[#eeeeee] rounded px-4 py-2 mb-7 w-full text-lg placeholder:text-base'
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
              className='bg-[#eeeeee] rounded px-4 py-2 mb-7 w-full text-lg placeholder:text-base'
              placeholder='Password'
            />
            <div className='pb-3'>
              <input type="checkbox" required /> I agree to the <Link to="/user-terms" className='text-blue-600'>terms and conditions</Link>
            </div>
            <button
              className='bg-[#111] rounded text-white py-3 mb-3 w-full font-semibold text-lg'
            >
              Register
            </button>
          </form>
          <p className='text-center'>Already have an Account? <Link to='/login' className='text-blue-600'> Login Here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>By proceeding, you consent to get mails, including by automated means,
            from RideMate and its affiliates to the email provided.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignUp
