import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './progressBar';
import { motion } from 'framer-motion';

const Compliance = () => {
    const [insurance, setInsurance] = useState(null);
    const [ownershipDocs, setOwnershipDocs] = useState(null);
    const [maintenanceRecords, setMaintenanceRecords] = useState(null);
    const navigate  = useNavigate()
    const [progress,setProgress] = useState(7);

    const handleNextClick = (e) => {
        e.preventDefault()
        setProgress((prevProgress) => Math.min(prevProgress + 1, 7))
        navigate("/thankyou")
    }
      const handleFileChange = (setter) => (e) => {
        setter(e.target.files[0]);
      };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100"> 
    <motion.form
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col justify-center items-center p-10 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3'
          
      >
        
    <h1 className="mb-5 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-xl">
            Rent<span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"> myRide</span>
          </h1>
    <h1 className="mb-5 text-2xl font-bold text-gray-900 md:text-5xl lg:text-2xl">Compliance and Safety Checks</h1>

    <ProgressBar progress={progress}></ProgressBar>
  
  <div className="mb-5 w-full">
    <label htmlFor="insurance" className="block mb-2 text-sm font-medium text-gray-900">Bike Insurance <span>*</span></label>
    <input
      type="file"
      id="insurance"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      onChange={handleFileChange(setInsurance)}
      required
    />
  </div>

  <div className="mb-5 w-full">
    <label htmlFor="ownershipDocs" className="block mb-2 text-sm font-medium text-gray-900">Ownership Documents <span>*</span></label>
    <input
      type="file"
      id="ownershipDocs"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      onChange={handleFileChange(setOwnershipDocs)}
      required
    />
  </div>

  <div className="mb-5 w-full">
    <label htmlFor="maintenanceRecords" className="block mb-2 text-sm font-medium text-gray-900">Maintenance Records (Optional)</label>
    <input
      type="file"
      id="maintenanceRecords"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      onChange={handleFileChange(setMaintenanceRecords)}
    />
  </div>
  <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm w-full cursor-pointer px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleNextClick}
          >
            Next
          </button>

      </motion.form>

    </div>

    
    
        
  )
}

export default Compliance