import React from 'react'
import { useNavigate } from 'react-router-dom'

const TagSquare = ({subject, tag}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/subject/${subject}/${tag}`)
    }
  return (
    <div 
        className='w-200 h-20 relative rounded-2xl shadow-2xl flex justify-center items-center font-bold border m-5'
        onClick={handleClick}>{tag}
    </div>
  )
}

export default TagSquare