import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import SubjectSquare from "./SubjectSquare"

const Home = () => {
    const subjects = [
        {color: "bg-yellow-500", subject: "Testing"},
        {color: "bg-red-500", subject: "Calculus"},
        {color: "bg-green-500", subject: "x"},
        {color: "bg-blue-500", subject: "y"},
    ];
  return (
    <div>
    {/* <h1 className='text-3xl text-center justify-center leading-none flex items-center'>What topic are you struggling with?</h1> */}
    <Navbar />
    <h1 className='text-3xl text-center mb-0 translate-y-20'>What subject would you like to practice?</h1>
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