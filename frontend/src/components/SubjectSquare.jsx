import React from 'react'
import { Flame } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

const SubjectSquare = ({color, subject, streaks}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // enforce login later on
    navigate(`/subject/${subject}`)
  }

  return (
    <div className={`w-70 h-70 ${color} relative rounded-2xl shadow-2xl flex justify-center items-center text-white font-bold`} onClick={handleClick}>
      <div className = "absolute top-2 right-2 text-white bg-black/40 px-2 py-1 rounded flex text-xl">
      <Flame className = "w-5 h-7 text-write" />
      {/* add streak handling later */}
        0
      </div>
      <div className= "text-4xl">
        {subject}
    </div>
    </div>
  )
}

export default SubjectSquare