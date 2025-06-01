import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import SubjectSquare from "./SubjectSquare"
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';


const Home = () => {
    const subjects = [
        {color: "bg-yellow-500", subject: "Testing"},
        {color: "bg-red-500", subject: "Calculus"},
        {color: "bg-green-500", subject: "Biology"},
        {color: "bg-blue-500", subject: "y"},
    ];
    const { user } = useAuthContext()
    // Check streak
  const [userData, setUserData] = useState({})
  const today = new Date()
  const tmr = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
  if (user) {
    axios
        .get(`http://localhost:5555/user/username/${user.username}`)
        .then((response) => {
            if (!response){
                throw new Error("User does not exist");
            }
            setUserData(response.data);
          }).catch((error) => {
            alert("User does not exist")
          });
    if ((userData.calculus_date != today.toLocaleDateString() && userData.calculus_date != tmr.toLocaleDateString()) && userData.calculus_date != undefined){
        axios
        .post(`http://localhost:5555/user/streak_reset/Calculus/${user.username}`)
        .then((response) => {
            if (!response){
                throw new Error("User does not exist");
            }
          }).catch((error) => {
            alert("User does not exist")
          });
    }
    if ((userData.testing_date != today.toLocaleDateString() && userData.testing_date != tmr.toLocaleDateString()) && userData.testing_date != undefined){
        axios
        .post(`http://localhost:5555/user/streak_reset/Testing/${user.username}`)
        .then((response) => {
            if (!response){
                throw new Error("User does not exist");
            }
          }).catch((error) => {
            alert("User does not exist")
          });
    }
    }
  return (
    <div>
    <Navbar />
    <h1 className='text-3xl text-center font-semibold mt-10'>What subject would you like to practice?</h1>
    <p className="text-center text-md text-gray-600 italic font-medium mt-1 mb-6">
      🧠 Answer questions. 🎯 Earn points. 🎁 Unlock cool stuff!
    </p>

    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-2 gap-20">
        {subjects.map((subject, i) => (
          <SubjectSquare key={i} color={subject.color} subject={subject.subject}
          />
        ))}
      </div>
    </div>
    </div>
  )
}

export default Home;