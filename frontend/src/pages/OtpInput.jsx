// src/components/OtpInput.js
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OtpInput = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading]=useState(false)
  const location = useLocation()

  const navigate = useNavigate()
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("")
    const phone = location.state.phone
    if (code) {
        try {
            setLoading(true)
           const response = await axios.post("http://localhost:8000/api/auth/token/", {mobile: phone, token: code}, {
            headers:{
                "Content-Type": "application/json"
            }
           })
           const {access, refresh, new_account}=response.data
           localStorage.setItem('accessToken', JSON.stringify(access))
           localStorage.setItem('refreshToken', JSON.stringify(refresh))
           toast.success("login successful")
           if (new_account) {
               navigate("/create-profile")
           }else{
            
               navigate("/profile")
            }
        } catch (err) {
            console.log("server error: ", err)
        }finally{
            setLoading(false)
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        { loading && <p>Loading...</p>}
        <h2 className="text-2xl font-bold mb-6 text-center">Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpInput;
