import React from 'react'
import { Link } from 'react-router-dom'

const AdminHome = () => {
  const admin = JSON.parse(localStorage.getItem('data'));

  return (
    <div className='h-screen relative bg-[url(../public/images/HomeBG.png)] bg-cover bg-center w-full'>
      {/* RideMate Logo */}
      <img src="../public/images/RideMate.png" className='w-30 ml-5 mt-5 z-10 absolute top-0 left-0' />
      <div className='absolute top-5 right-5 z-10'>
              <Link to='/admin-logout' className='flex bg-white h-10 justify-center rounded-full w-10 items-center'>
                <i className="text-lg font-medium ri-logout-box-r-line"></i>
              </Link>
            </div>
      
      {/* Admin Details Section with transparent white background */}
      <div className='absolute top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-op p-5 rounded-lg shadow-lg w-11/12 sm:w-1/3 z-20'>
        <h3 className='text-xl font-semibold text-gray-800 text-center'>Admin Details</h3>
        <div className='mt-3'>
          <p className='text-center'><span className='font-semibold'>Name:</span> {admin?.name}</p>
          <p className='text-center'><span className='font-semibold'>Email:</span> {admin?.email}</p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className='bg-white py-4 px-4 pb-7 absolute bottom-0 left-0 w-full'>
        <h2 className='text-2xl font-bold'>Welcome {admin?.name}</h2>
        <Link to='/captains-list' className='flex items-center justify-center w-full bg-orange-700 text-white py-3 rounded mt-5 font-semibold'>Captains List</Link>
        <Link to='/users-list' className='flex items-center justify-center w-full bg-green-600 text-white py-3 rounded mt-5 font-semibold'>Users List</Link>
      </div>
    </div>
  )
}

export default AdminHome
