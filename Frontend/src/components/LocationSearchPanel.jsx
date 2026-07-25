import React from 'react'

const LocationSearchPanel = ({ suggestions, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
        // setVehiclePanel(true)
        // setPanelOpen(false)
    }

    return (
      <div className='h-full overflow-y-scroll'>
          {suggestions && suggestions.length > 0 ? (
              suggestions.map((elem, idx) => (
                  <div key={elem.place_id} 
                      onClick={() => handleSuggestionClick(elem.structured_formatting.main_text)} 
                      className='flex gap-4 border-2 p-3 m-0 border-gray-50 active:border-black rounded-xl items-center  justify-start'>
                      
                      <h2 className='bg-[#eee] h-8 flex items-center justify-center rounded-full w-[15%]'>
                          <i className="ri-map-pin-fill"></i>
                      </h2>
                      <div className='block items-center justify-end w-[85%]'>
                      <h4 className='font-medium'>{elem.structured_formatting.main_text}</h4> <br />
                      <p className='text-xs text-gray-600 -mt-5'>{elem.structured_formatting.secondary_text}</p>
                      </div>
                  </div>
              ))
          ) : (
              <h4 className='text-gray-500 text-center mt-3'>No suggestions found</h4>
          )}
      </div>
  );
  
}

export default LocationSearchPanel