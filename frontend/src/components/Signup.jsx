import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import { FcGlobe } from "react-icons/fc";
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {dispatch} = useAuthContext()
    const navigate = useNavigate();

    const handleUsername = (x) => {
        setUsername(x.target.value)
    }
    const handlePassword = (x) => {
        setPassword(x.target.value)
    }
    const handleSubmit = async () => {
        try {
            const user_data = {
                username: username,
                password: password
            }
        const response = await fetch('http://localhost:5555/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user_data)
        });
        const json = await response.json()
        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(json))
            dispatch({type: "LOGIN", payload: json})
            alert("Registration success! Redirecting home.")
            navigate("/")
        }
        else {
            alert("Registration failed. Make sure your email is correct.")
        }

        } catch (error) {
            console.error('Register failed: ', error);
        }
    }
    

  return (
    <div>
        <Navbar/>
        <div className='flex-col flex items-center justify-center'>
            <div className='text-5xl my-5 mx-10'>Register</div>
            <div className="bg-sky-300 w-180 h-180 relative rounded-2xl shadow-2xl">
                <div className='relative left-5 top-5 text-2xl'>Username:</div>
                <input className = "w-full max-w-md px-4 py-2 border border-black-300 rounded-lg m-10"
                type = "text" value = {username} onChange={handleUsername} placeholder='Username'></input>
                <div className='relative left-5 top-5 text-2xl'>Password:</div>
                <input className = "w-full max-w-md px-4 py-2 border border-black-300 rounded-lg m-10"
                type = "text" value = {password} onChange={handlePassword} placeholder='Password'></input>
                <div className="relative left-10">
                    <button onClick = {handleSubmit} className="rounded px-4 py-2 bg-green-500 text-white">Register</button>
                </div>
                <FcGlobe className='h-60 w-auto m-2 relative absolute left-60 top-15'/>
            </div>
        </div>
    </div>
  )
}

export default Signup