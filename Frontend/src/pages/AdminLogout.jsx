import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutAdmin = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/logout`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/admin-login');
                }
            } catch (error) {
                console.error("Admin logout failed:", error);
            }
        };

        logoutAdmin();
    }, [navigate]);

    return <div>Logging out admin...</div>;
};

export default AdminLogout;
