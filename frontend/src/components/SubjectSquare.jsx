import React, {useState} from 'react'
import { Flame } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { VscDebug } from "react-icons/vsc";
import { TbMathIntegralX } from "react-icons/tb";
import { TbPrismLight } from "react-icons/tb";
import { useAuthContext } from '../hooks/useAuthContext';
import { FaDna } from "react-icons/fa";
import { FaCode } from "react-icons/fa";

import axios from 'axios'


const SubjectSquare = ({color, subject, streaks}) => {
  const navigate = useNavigate();
  const {user} = useAuthContext();
  const handleClick = () => {
    navigate(`/subject/${subject}`)
  }
  const [userData, setUserData] = useState({})
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
    } 

  return (
    <div className={`w-70 h-70 ${color} relative rounded-2xl shadow-2xl flex justify-center items-center text-white font-bold`} onClick={handleClick}>
      <div className = "absolute top-3 right-2 text-white bg-black/45 px-2 py-1 rounded flex text-xl">
      <Flame className = "w-5 h-7 text-write" />
      {user ? (
        <div>
      {subject == "ComSci" && (
        userData.testing_streak
        )}
        {subject == "Calculus" && (
          userData.calculus_streak
        )}
        {subject == "Biology" && (
          userData.biology_streak
        )}
        {subject == "Physics" && (
          userData.physics_streak
        )}
        </div>
      ) : (
        <div>0</div>
      )}
      </div>
      <div className= "absolute text-4xl top-3">
        {subject}
    </div>
    <div className="bg-black absolute w-full h-0.5 top-15" />
    {subject == "ComSci" && (
      <FaCode className='w-30 h-30 absolute top-25'/>
    )}
    {subject == "Calculus" && (
      <TbMathIntegralX className='w-30 h-30 absolute top-25'/>
    )}
    {subject == "Biology" && (
      <FaDna className='w-30 h-30 absolute top-25'></FaDna>
    )}
    {subject == "Physics" && (
      <TbPrismLight className='w-30 h-30 absolute top-25'/>
    )}
    </div>
    
  )
}

export default SubjectSquare