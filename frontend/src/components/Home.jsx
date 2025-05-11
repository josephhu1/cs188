import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import SubjectSquare from "./SubjectSquare.jsx"

const Home = () => {
    const subjects = [
        {color: "bg-yellow-500", subject: "Testing"},
        {color: "bg-red-500", subject: "Calculus"},
        {color: "bg-green-500", subject: "x"},
        {color: "bg-blue-500", subject: "y"},
    ];
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-2 gap-20">
        {subjects.map((subject, i) => (
          <SubjectSquare key={i} color={subject.color} subject={subject.subject}
          />
        ))}
      </div>
    </div>
  )
}

export default Home;