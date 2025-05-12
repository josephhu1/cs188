import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import { useParams, useNavigate } from 'react-router-dom';

const Problem = () => {
  const navigate = useNavigate();
  const {subject, tag} = useParams();
  const [problem, setProblem] = useState({});
  const [answer, setAnswer] = useState("");
  const [solved, setSolved] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const handleAnswer  = (x) => {
    setAnswer(x.target.value)
  }
    useEffect(() => {
    axios
        .get(`http://localhost:5555/problems/random/${tag}`)
        .then((response) => {
            if (!response){
                throw new Error("Problem does not exist");
            }
            setProblem(response.data);
          }).catch((error) => {
            alert("Problem does not exist")
            navigate(`/subject/${subject}`)
          });
    }, [])

    const handleReveal = () => {
      setIncorrect(false);
      setReveal(true);
    }
    const handleSubmit = () => {
      if (answer == problem.answer){
        setSolved(true);
        setReveal(true);
        setIncorrect(false);
      }
      else {
        setIncorrect(true);
      }
    }
    const handleHome = () => {
      navigate("/")
    }
    const handleNext = () => {
      navigate(0)
    }


  return (
    <div>
      <Navbar/>
      <div className='flex-col flex items-center justify-center'>
      <div className='text-5xl my-10 mx-10'>{subject}: {tag}</div>
      <img src = {problem.image} className='w-120 h-120'></img>
      <div className='m-2'>This problem is from: {problem.source}</div>
      <input className = "w-full max-w-md px-4 py-2 border border-black-300 rounded-lg m-1 my-3"
      type = "text" value = {answer} onChange={handleAnswer} placeholder='Enter Answer'></input>
        {reveal ? (
        <div className="space-x-15">
          <button onClick = {handleHome} className="rounded px-4 py-2 bg-yellow-500 text-white">Return Home</button>
          <button onClick = {handleNext} className="rounded px-4 py-2 bg-green-500 text-white">Next Problem</button>
        </div>
        ) : (
        <div className="space-x-15">
          <button onClick = {handleSubmit} className="rounded px-4 py-2 bg-yellow-500 text-white">Enter Answer</button>
          <button onClick = {handleReveal} className="rounded px-4 py-2 bg-green-500 text-white">Reveal Solution</button>
        </div>
        )}
        {incorrect && (
          <div className='m-3 text-xl bg-red-500/40'>Incorrect answer</div>
        )}
        {solved && (
          <div className='m-3 text-xl bg-green-500/40'>Correct answer! +100 points</div>
          // TODO: add points
        )}
        {reveal && (
          <div className='m-3 text-xl bg-yellow-500/40'>Solution: {problem.answer}</div>
        )}
      </div>
      </div>
  )
}

export default Problem