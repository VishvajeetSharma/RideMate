import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';  // Import both toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles
import { Link, useLocation } from 'react-router-dom';  // Import Link and useLocation

const AdminCaptains = () => {
    const [user, setUser] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const location = useLocation();  // Get the current location

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/captainslist`, {
            headers: {
                'Content-Type': "application/json"
            }
        })
        console.log(response);

        if (response.data.code === 200) {
            setUser(response.data.data);
        }
    }

    const handleBlock = async (el) => {
        const payload = {
            status: el.isBlock ? false : true
        }
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/captainblock/${el._id}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.data.code === 200) {
            toast.success("Status Updated Successfully");
            fetchData();
        } else {
            toast.error("Error updating status");
        }
    }

    // Function to determine the active link
    const isActiveLink = (path) => {
        return location.pathname === path ? 'text-white bg-blue-500' : 'text-blue-500';
    }

    // Filter captains based on search query
    const filteredCaptains = user.filter((el) => {
        const fullName = `${el.fullname.firstname} ${el.fullname.lastname}`.toLowerCase();
        const email = el.email.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
    });

    return (
        <>
            <div className='sticky top-0 bg-white mb-1'>
                {/* Navbar */}
                <nav className="bg-gray-800 p-4">
                    <div className="flex justify-center space-x-8 me-15">
                        <Link to="/users-list" className={`text-lg font-semibold py-2 px-4 rounded ${isActiveLink('/users-list')}`}>
                            Users List
                        </Link>
                        <Link to="/captains-list" className={`text-lg font-semibold py-2 px-4 rounded ${isActiveLink('/captains-list')}`}>
                            Captains List
                        </Link>
                    </div>
                </nav>

                {/* Search Box */}
                <div className="flex justify-center p-4">
                    <input
                        type="text"
                        placeholder="Search Captains by Name or Email"
                        className="px-4 py-2 rounded-lg border border-gray-300 w-[95%]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
                    />
                </div>
            </div>

            {/* Captains List Section */}
            <div className="flex justify-center items-center w-full p-1">
                {/* Flex container to center cards horizontally */}
                <div className='absolute top-5 right-5 z-10'>
                    <Link to='/admin' className='flex bg-white h-10 justify-center rounded-full w-10 items-center'>
                        <i className="text-lg font-medium ri-home-gear-line"></i>
                    </Link>
                </div>
                <div className="grid w-[90%] gap-6">
                    {filteredCaptains.map((el) => (
                        <div key={el._id} className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col items-center p-10">
                                <h5 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                    {el.fullname.firstname + ' ' + el.fullname.lastname}
                                </h5>
                                <span className="text-base text-gray-500 dark:text-gray-400">{el.email}</span>
                                <span className="text-base text-gray-900 dark:text-gray-900">{el.vehicle.plate}</span>
                                <span className="text-base text-gray-500 dark:text-gray-400 capitalize">{el.vehicle.vehicleType}</span>
                                <div className="flex mt-4 md:mt-6">
                                    <button
                                        onClick={() => handleBlock(el)}
                                        className={`inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 
                                        ${el.isBlock ? 'bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700' : 'bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700'}`}
                                    >
                                        {el.isBlock ? "UNBLOCK" : "BLOCK"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </>
    );
}

export default AdminCaptains;
