import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import ProgressBar from './progressBar';
import { motion } from 'framer-motion';

const BikeListing = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(4);
    const [bikeBrand, setBikeBrand] = useState(null);
    const [bikeModel, setBikeModel] = useState("");
    const [bikeCategory, setBikeCategory] = useState(null);
    const [yearManufacture, setYearManufacture] = useState(null);
    const [bikeCondition, setBikeCondition] = useState("");
    const [error, setError] = useState("");

    const handleNextClick = (e) => {
        e.preventDefault();

        if (!bikeBrand || !bikeModel || !bikeCategory || !yearManufacture || !bikeCondition) {
            setError("Please fill all the required fields");
            return;
        } else {
            setError(""); // Clear the error
            setProgress((prevProgress) => Math.min(prevProgress + 1, 7));
            navigate("/renting");
        }
    };

    const bikeOptions = [
        { value: 'TVS', label: 'TVS' },
        { value: 'Royal Enfield', label: 'Royal Enfield' },
        { value: 'YAMAHA', label: 'YAMAHA' },
        { value: 'BAJAJ', label: 'BAJAJ' },
        { value: 'Honda', label: 'Honda' },
        { value: 'Hero', label: 'Hero' },
        { value: 'KTM', label: 'KTM' },
        { value: 'Keeway', label: 'Keeway' },
        { value: 'Suzuki', label: 'Suzuki' },
        { value: 'Aprilia', label: 'Aprilia' },
        { value: 'Benelli', label: 'Benelli' },
        { value: 'BMW', label: 'BMW' },
        { value: 'CFMoto', label: 'CFMoto' },
        { value: 'Ducati', label: 'Ducati' },
        { value: 'Harley Davidson', label: 'Harley Davidson' },
        { value: 'Husqvarna', label: 'Husqvarna' },
        { value: 'Indian', label: 'Indian' },
        { value: 'Jawa', label: 'Jawa' },
        { value: 'Kawasaki', label: 'Kawasaki' },
        { value: 'Moto Guzzi', label: 'Moto Guzzi' },
        { value: 'Other', label: 'Other' },
    ];

    const bikeCategoryOptions = [
        { value: 'road', label: 'Road' },
        { value: 'mountain', label: 'Mountain' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'electric', label: 'Electric' },
        { value: 'cruiser', label: 'Cruiser' },
        { value: 'touring', label: 'Touring' },
        { value: 'bmx', label: 'BMX' },
        { value: 'folding', label: 'Folding' },
        { value: 'cyclocross', label: 'Cyclocross' },
        { value: 'gravel', label: 'Gravel' },
        { value: 'fat', label: 'Fat' },
        { value: 'track', label: 'Track' },
        { value: 'recumbent', label: 'Recumbent' },
        { value: 'cargo', label: 'Cargo' },
        { value: 'tandem', label: 'Tandem' },
    ];

    const yearOptions = [];
    for (let year = 2024; year >= 1985; year--) {
        yearOptions.push({ value: year, label: year.toString() });
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
                <h1 className='mb-5 text-2xl font-bold text-gray-900 md:text-5xl lg:text-2xl'>Bike Registration</h1>
                <ProgressBar progress={progress}></ProgressBar>

                {error && (
                    <div className="mb-5 w-full text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {/* Bike Brand */}
                <div className="mb-5 w-full">
                    <label htmlFor="bikeBrand" className="block mb-2 text-sm font-medium text-gray-900">Bike Brand <span>*</span></label>
                    <Select
                        id="bikeBrand"
                        options={bikeOptions}
                        placeholder="Select the brand of your bike"
                        isSearchable
                        onChange={(option) => setBikeBrand(option)}
                        required
                    />
                </div>

                {/* Bike Model */}
                <div className="mb-5 w-full">
                    <label htmlFor="bikeModel" className="block mb-2 text-sm font-medium text-gray-900">Bike Model <span>*</span></label>
                    <input
                        type="text"
                        id="bikeModel"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Model of the bike"
                        value={bikeModel}
                        onChange={(e) => setBikeModel(e.target.value)}
                        required
                    />
                </div>

                {/* Bike Category */}
                <div className="mb-5 w-full">
                    <label htmlFor="bikeCategory" className="block mb-2 text-sm font-medium text-gray-900">Bike Category <span>*</span></label>
                    <Select
                        id="bikeCategory"
                        options={bikeCategoryOptions}
                        placeholder="Select the category of your bike"
                        isSearchable
                        onChange={(option) => setBikeCategory(option)}
                        required
                    />
                </div>

                {/* Year of Manufacture */}
                <div className="mb-5 w-full">
                    <label htmlFor="yearManufacture" className="block mb-2 text-sm font-medium text-gray-900">Year of Manufacture <span>*</span></label>
                    <Select
                        id="yearManufacture"
                        options={yearOptions}
                        placeholder="Select the year of manufacture"
                        isSearchable
                        onChange={(option) => setYearManufacture(option)}
                        required
                    />
                </div>

                {/* Bike Condition */}
                <div className="mb-5 w-full">
                    <label htmlFor="bikeCondition" className="block mb-2 text-sm font-medium text-gray-900">Bike Condition <span>*</span></label>
                    <textarea
                        type="textarea"
                        row="2"
                        id="bikeCondition"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Condition of the bike (e.g., new, like new, used)"
                        value={bikeCondition}
                        onChange={(e) => setBikeCondition(e.target.value)}
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

export default BikeListing;
