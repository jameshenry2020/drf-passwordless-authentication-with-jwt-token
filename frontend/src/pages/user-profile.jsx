import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser]=useState({})
    const token = JSON.parse(localStorage.getItem("accessToken")) 
     
     

    const fetchUser = async () => {
        const result = await axios.get("http://localhost:8000/api/auth/users", {
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        if (result.status == 200) {
            setUser(result.data)
        }else{
            return null
        }
    }

    // useEffect(() => {
    //    fetchUser()
    // }, [])
    
    if (!token) {
       return <Navigate to={"/login"} replace/>
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Name</h3>
          <p className="text-gray-700">{user.name}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Email</h3>
          <p className="text-gray-700">{user.email}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Bio</h3>
          <p className="text-gray-700">{user.mobile}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
