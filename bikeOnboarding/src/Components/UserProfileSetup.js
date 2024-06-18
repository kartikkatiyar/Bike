import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ProgressBar from './progressBar';
import bikeImage from "../Components/Photos/360_F_322712645_JFiBlbE3w1qdds8yiDJnHFuunwePhWFq.jpg";
import bikeImage2 from "../Components/Photos/Ladies-in-Ladakh.008.jpg";
import bikeImage3 from "../Components/Photos/2022-rebel-abs-300-gallery-04-2400xauto_jpg.avif";
import bikeImage4 from "../Components/Photos/Guide-to-Group-Riding-1.jpg";

const UserProfileSetup = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(2);
    const [businessName,setBusinessName] = useState("")
    const [businessAddress,setBusinessAddress] = useState("")
    const [businessRegNum,setBusinessRegNum] = useState("")
    const [pan,setpan] = useState("")
    const [gst,setGst] = useState("")
    const [error,setError] = useState("")

    const handleChange =(e) => {
        const {id, value} = e.target
        if (id === "name") setBusinessName(value)
        if(id === "address") setBusinessAddress(value)
        if(id === "businessRegistration") setBusinessRegNum(value)
        if(id === "pan") setpan(value)
        if(id === "gst") setGst(value)

    }

    const handleNextClick = (e) => {
        e.preventDefault();

        if(!businessName || !businessAddress || !businessRegNum || !pan || !gst){
            setError("Plz fill all the required feilds")
            return;
        }
        else{
            setError("")
            setProgress((prevProgress) => Math.min(prevProgress + 1, 7));
            navigate("/documentUpload");

        }
        
    }



    return (
        <div className='flex justify-center items-center w-full h-screen bg-gray-100'>
            <motion.form
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col justify-center items-center p-10 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3"
            >
                <h1 className="mb-5 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-xl">
                    Rent<span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"> myRide</span>
                </h1>
                
                <h1 className='mb-5 text-2xl font-bold text-gray-900 md:text-5xl lg:text-2xl'>About your business</h1>
                <ProgressBar progress={progress}></ProgressBar>
                {error && (
                    <div className="mb-5 w-full text-red-600 text-sm">
                        {error}
                    </div>
                )}
                <div className="mb-5 w-full">
                    <label htmlFor="Business name" className="block mb-2 text-sm font-medium text-gray-900">Business name <span>*</span></label>
                    <input
                        type="text"
                        value={businessName}
                        onChange={handleChange}
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Your Business name"
                        required
                    />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Business Address <span>*</span></label>
                    <textarea
                        id="address"
                        value={businessAddress}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Your address"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="businessRegistration" className="block mb-2 text-sm font-medium text-gray-900">Business Registration Number <span>*</span></label>
                    <input
                        type="text"
                        id="businessRegistration"
                        value={businessRegNum}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Business registration number"
                        required
                    />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="pan" className="block mb-2 text-sm font-medium text-gray-900">PAN <span>*</span></label>
                    <input
                        type="text"
                        id="pan"
                        value={pan}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="PAN for tax purposes"
                        required
                    />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="gst" className="block mb-2 text-sm font-medium text-gray-900">GST <span>*</span></label>
                    <input
                        type="text"
                        id="gst"
                        value={gst}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="GST for tax purposes"
                        required
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

export default UserProfileSetup;
