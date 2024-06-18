import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ProgressBar from "./progressBar";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import auth from "../config/firebase";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(1);
  const [name, setName] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phn, setPhn] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
const[userCred,setUserCred] = useState(null);
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") setName(value);
    if (id === "lastname") setLast(value);
    if (id === "email") setEmail(value);
    if (id === "phone") setPhn(value);
  };

  const handleNextClick = (e) => {
    e.preventDefault();

    if (!email || !name || !last || !phn) {
      setError("Please fill all the required fields");
      return;
    } else {
      setError(""); // Clear the error
      setProgress((prevProgress) => Math.min(prevProgress + 1, 7));
      navigate("/profileSetup");
    }
  };

  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha");
      const userCredentials = await signInWithPhoneNumber(
        auth,
        "+" + phn,
        recaptcha
      );
      setUserCred(userCredentials)
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const confirmOtp = async () => {
    const data = await userCred.confirm(otp);
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      <motion.form
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col justify-center items-center p-5 sm:p-10 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3"
      >
        <h1 className="mb-5 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-4xl">
          Rent
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            {" "}
            myRide
          </span>
        </h1>

        <h1 className="mb-5 text-2xl font-semibold text-gray-900 md:text-3xl lg:text-2xl">
          Finish Your Profile
        </h1>

        <ProgressBar progress={progress}></ProgressBar>

        {error && (
          <div className="mb-5 w-full text-red-600 text-sm">{error}</div>
        )}

        <div className="mb-5 w-full">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            First Name <span>*</span>
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Your first name"
            onChange={handleChange}
            value={name}
            required
          />
        </div>
        <div className="mb-5 w-full">
          <label
            htmlFor="lastname"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Last Name <span>*</span>
          </label>
          <input
            type="text"
            value={last}
            id="lastname"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Your last name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5 w-full">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email <span>*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="name@flowbite.com"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-5 w-full">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Phone <span>*</span>
          </label>
          <PhoneInput
            containerClass="mb-2 w-full"
            value={phn}
            inputClass="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            buttonClass="border-l border-gray-300"
            dropdownClass="bg-white border border-gray-300 rounded-lg shadow-lg"
            onChange={(value) => setPhn(value)}
            country={"in"}
          />
        </div>
        <button onClick={sendOtp}>Send OTP</button>
        <input onChange={(e) => setOtp(e.target.value)}></input>
        <button onClick={confirmOtp}>Confirm OTP</button>

        <div id="recaptcha"></div>
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

export default UserRegistration;
