import React, {useState} from 'react'
import { Flame } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { VscDebug } from "react-icons/vsc";
import { TbMathIntegralX } from "react-icons/tb";


const SubjectSquare = ({color, subject, streaks}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // enforce login later on
    navigate(`/subject/${subject}`)
  }

  return (
    <div className={`w-70 h-70 ${color} relative rounded-2xl shadow-2xl flex justify-center items-center text-white font-bold`} onClick={handleClick}>
      <div className = "absolute top-3 right-2 text-white bg-black/45 px-2 py-1 rounded flex text-xl">
      <Flame className = "w-5 h-7 text-write" />
      {/* add streak handling later */}
        0
      </div>
      <div className= "absolute text-4xl top-3">
        {subject}
    </div>
    <div className="bg-black absolute w-full h-0.5 top-15" />
    {subject == "Testing" && (
      <VscDebug className='w-30 h-30 absolute top-25'/>
    )}
    {subject == "Calculus" && (
      <TbMathIntegralX className='w-30 h-30 absolute top-25'/>
    )}
    {subject == "x" && (
      <div>x</div>
    )}
    {subject == "y" && (
      <div>y</div>
    )}
    </div>
    
  )
}

export default SubjectSquare