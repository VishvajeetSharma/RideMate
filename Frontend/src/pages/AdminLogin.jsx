import React from 'react';
import { useForm } from 'react-hook-form'; // Form Validation
import { yupResolver } from '@hookform/resolvers/yup'; // Form Validation
import * as yup from 'yup'; // Form Validation
import axios from 'axios'; // Fetch data
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const AdminLogin = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleData = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/login`, payload, {
        headers: { 'Content-Type': "application/json" }
      });

      if (response.data.code === 200) {
        localStorage.setItem('data', JSON.stringify(response.data.data));
        localStorage.setItem('userType', JSON.stringify("admin"));

        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 1500,
        });

        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else {
        toast.error("Invalid Email or Password!", {
          position: "top-center",
          autoClose: 1500,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center  min-h-screen bg-gray-50 px-4">
        <div className="p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img src="/Images/admin.png" alt="Admin Icon" className="h-20" />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-6">Admin Sign In</h2>
          <form onSubmit={handleSubmit(handleData)} className="space-y-6">
            <div>
                
            <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
              <input
                {...register('email')}
                className="bg-[#eeeeee] rounded px-4 py-2 mb-2 w-full text-lg placeholder:text-base"
                type="email"
                placeholder="Enter Your Email"
              />
              {errors.email?.message && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>
            <div>
                
            <h3 className='text-lg font-medium mb-2'>What's your password?</h3>
              <input
                {...register('password')}
                className="bg-[#eeeeee] rounded px-4 py-2 mb-2 w-full text-lg placeholder:text-base"
                type="password"
                placeholder="Enter Password"
              />
              {errors.password?.message && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
            <div>
              <input
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
                value="LOGIN"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
