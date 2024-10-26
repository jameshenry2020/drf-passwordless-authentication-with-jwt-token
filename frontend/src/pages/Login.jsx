// src/components/PhoneNumberInput.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

const PhoneNumberLogin= () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState("")
  const navigation =useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber) {
       try {
        const res = await axios.post("http://localhost:8000/auth/mobile/", {mobile: phoneNumber}, {
            headers:{
                "Content-Type":"application/json"
            }
           })
           toast.success("code to login has been sent")
           navigation("/security-code", {state: {phone: phoneNumber, replace: true}})

           
       } catch (err) {
          console.log("server err: ", err)
       }
    }else{
        setError("Phone Number is required")
    }
  };

  return (
    <div className="min-h-screen  w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login with Phone Number</h2>
        <p>{error ? error : ""}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="phone"
              type="tel"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhoneNumberLogin;
