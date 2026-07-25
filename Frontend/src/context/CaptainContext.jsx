import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();


const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (captainData) =>{
        setCaptain(captainData);
    }

    const values = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    }

    
    return (
        <CaptainDataContext.Provider value={values}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext