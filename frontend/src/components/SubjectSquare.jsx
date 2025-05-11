import React from 'react'

const SubjectSquare = ({color = "bg-red-500", subject= "x"}) => {
  return (
    <div className={`w-70 h-70 ${color} rounded-2xl shadow-2xl flex justify-center items-center text-white text-4xl font-bold`}>
        {subject}
    </div>
  )
}

export default SubjectSquare