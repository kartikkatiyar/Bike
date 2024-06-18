import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './progressBar';
import { motion } from 'framer-motion';

const RentingPrice = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(5);
    const [rentalPriceDaily, setRentalPriceDaily] = useState('');
    const [rentalPriceWeekly, setRentalPriceWeekly] = useState('');
    const [rentalPriceMonthly, setRentalPriceMonthly] = useState('');
    const [availabilitySchedule, setAvailabilitySchedule] = useState('');
    const [minDuration, setMinDuration] = useState('');
    const [maxDuration, setMaxDuration] = useState('');
    const [error, setError] = useState('');

    const handleNextClick = (e) => {
        e.preventDefault();

        if (!rentalPriceDaily || !rentalPriceWeekly || !rentalPriceMonthly || !availabilitySchedule || !minDuration || !maxDuration) {
            setError("Please fill all the required fields");
            return;
        } else {
            setError(""); // Clear the error
            setProgress((prevProgress) => Math.min(prevProgress + 1, 7));
            navigate("/BikeDocument");
        }
    };

    const handleInputChange = (setter) => (value) => {
        setter(value);
    };

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

                <h1 className="mb-5 text-2xl font-bold text-gray-900 md:text-5xl lg:text-2xl">Rental Info</h1>
                <ProgressBar progress={progress}></ProgressBar>

                {error && (
                    <div className="mb-5 w-full text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <div className="mb-5 w-full">
                    <label htmlFor="rentalPriceDaily" className="block mb-2 text-sm font-medium text-gray-900">
                        Rental Price <span className="font-semibold">daily</span> <span>*</span>
                    </label>
                    <CurrencyInput
                        id="rentalPriceDaily"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Enter daily rental price"
                        decimalsLimit={2}
                        prefix="₹"
                        value={rentalPriceDaily}
                        onValueChange={handleInputChange(setRentalPriceDaily)}
                        required
                    />
                </div>

                <div className="mb-5 w-full">
                    <label htmlFor="rentalPriceWeekly" className="block mb-2 text-sm font-medium text-gray-900">
                        Rental Price <span className="font-semibold">weekly</span> <span>*</span>
                    </label>
                    <CurrencyInput
                        id="rentalPriceWeekly"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Enter weekly rental price"
                        decimalsLimit={2}
                        prefix="₹"
                        value={rentalPriceWeekly}
                        onValueChange={handleInputChange(setRentalPriceWeekly)}
                        required
                    />
                </div>

                <div className="mb-5 w-full">
                    <label htmlFor="rentalPriceMonthly" className="block mb-2 text-sm font-medium text-gray-900">
                        Rental Price <span className="font-semibold">monthly</span> <span>*</span>
                    </label>
                    <CurrencyInput
                        id="rentalPriceMonthly"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Enter monthly rental price"
                        decimalsLimit={2}
                        prefix="₹"
                        value={rentalPriceMonthly}
                        onValueChange={handleInputChange(setRentalPriceMonthly)}
                        required
                    />
                </div>

                <div className="mb-5 w-full">
                    <label htmlFor="availabilitySchedule" className="block mb-2 text-sm font-medium text-gray-900">
                        Availability Schedule <span>*</span>
                    </label>
                    <input
                        type="text"
                        id="availabilitySchedule"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Enter availability schedule"
                        value={availabilitySchedule}
                        onChange={(e) => setAvailabilitySchedule(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-5 w-full">
                    <label htmlFor="minDuration" className="block mb-2 text-sm font-medium text-gray-900">
                        Minimum Rental Duration <span>*</span>
                    </label>
                    <input
                        type="number"
                        id="minDuration"
                        value={minDuration}
                        onChange={(e) => setMinDuration(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Enter minimum rental duration"
                        required
                    />
                </div>

                <div className="mb-5 w-full">
                    <label htmlFor="maxDuration" className="block mb-2 text-sm font-medium text-gray-900">
                        Maximum Rental Duration <span>*</span>
                    </label>
                    <input
                        type="number"
                        id="maxDuration"
                        value={maxDuration}
                        onChange={(e) => setMaxDuration(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Enter maximum rental duration"
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
    );
};

export default RentingPrice;
