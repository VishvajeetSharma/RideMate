import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminData = localStorage.getItem('userType');

    if (adminData !== '"admin"') {
      // Not an admin, redirect to admin login
      navigate('/admin-login');
    } else {
      // Admin found, stop loading
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <>
      {children}
    </>
  );
};

export default AdminProtectedWrapper;
