import React from 'react'
import { useNavigate } from 'react-router-dom'

const TagSquare = ({subject, tag}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/subject/${subject}/${tag}`)
    }
  return (
    <div 
        className='w-200 h-20 relative rounded-2xl shadow-2xl flex justify-center items-center font-bold border m-5 cursor-pointer transform transition duration-200 hover:scale-105 hover:shadow-lg'
        onClick={handleClick}>{tag}
    </div>
  )
}

export default TagSquare