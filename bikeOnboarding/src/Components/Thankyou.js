import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ThankYouPage = () => {
    const navigate = useNavigate();

    // Function to navigate back to the home page
    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100"> 
         <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col justify-center items-center p-10 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3"
            
        >
            
                <h1 className="mb-5 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-xl">
                    Thank You!
                </h1>
                <p className="text-lg text-gray-900 mb-5">
                    You will receive a provider license on your email within 24 hours.
                </p>
                <button
                    onClick={handleGoHome}
                    className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm w-full cursor-pointer px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Go Back Home
                </button>
        </motion.div>

        </div>
       
    );
};

export default ThankYouPage;