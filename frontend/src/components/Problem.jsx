import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Problem = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate();
  const {subject, tag} = useParams();
  const [problem, setProblem] = useState({});
  const [answer, setAnswer] = useState("");
  const [solved, setSolved] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [userData, setUserData] = useState({})
  const [date, setDate] = useState("")
  const [streakUpdated, setStreakUpdated] = useState(false);
  useEffect(() => {
    const today = new Date()
    const stringToday = today.toLocaleDateString()
    setDate(stringToday)
  }, []);


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

    const playSuccessSound = () => {
      new Audio('/images/duo.mp3').play();
    };

    const playErrorSound = () => {
      new Audio('/images/fail.mp3').play(); 
    };

    const handleStreak = () => {
      axios
        .post(`http://localhost:5555/user/streak/${subject}/${user.username}`)
        .then((response) => {
            if (!response){
                throw new Error("User does not exist");
            }
          }).catch((error) => {
            alert("User does not exist")
          });
    }
    const handleSubmit = () => {
      if (answer == problem.answer){
        setSolved(true);
        setReveal(true);
        playSuccessSound();
        setIncorrect(false);
        switch(subject) {
          case "ComSci":
            if (date != userData.testing_date){
              setStreakUpdated(true)
              handleStreak()
            }
            break;
          case "Calculus":
            if (date != userData.calculus_date){
              setStreakUpdated(true)
              handleStreak()
            }
            break;
        }
        axios
            .post(`http://localhost:5555/user/points/${user.username}`)
            .then((response) => {
                if (!response){
                    throw new Error("User does not exist");
                }
              }).catch((error) => {
                alert("User does not exist")
              });
        

      }
      else {
        setIncorrect(true);
        playErrorSound();
      }
    }
    const handleHome = () => {
      navigate("/")
    }
    const handleNext = () => {
      navigate(0)
    }
    if (!user) {
      navigate("/login")
    }
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
    <div>
      <Navbar/>
      <div className='flex-col flex items-center justify-center'>
      <div className='text-5xl my-10 mx-10'>{subject}: {tag}</div>
      <img src = {problem.image}></img>
      <div className='m-2'>This problem is from: {problem.source}</div>
      {problem.options && problem.options.length > 0 ? (
        <div className="flex flex-col space-y-3 my-3">
          {problem.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i); // A, B, C...
            return (
              <button
                key={i}
                onClick={() => setAnswer(letter)}
                className={`w-full max-w-md px-4 py-2 rounded-lg border ${
                  answer === letter ? 'bg-blue-500 text-white' : 'bg-white'
                }`}
              >
                {letter}. {opt}
              </button>
            );
          })}
        </div>
      ) : (
        <input
          className="w-full max-w-md px-4 py-2 border border-black-300 rounded-lg m-1 my-3"
          type="text"
          value={answer}
          onChange={handleAnswer}
          placeholder="Enter Answer"
        />
      )}

        {reveal ? (
        <div className="space-x-15">
          <button onClick = {handleHome} className="rounded px-4 py-2 bg-yellow-500 text-white">Return Home</button>
          <button onClick = {handleNext} className="rounded px-4 py-2 bg-green-500 text-white">Next Problem</button>
        </div>
        ) : (
        <div className="space-x-15">
          <button onClick = {handleReveal} className="rounded px-4 py-2 bg-yellow-500 text-white">Reveal Solution</button>
          <button onClick = {handleSubmit} className="rounded px-4 py-2 bg-green-500 text-white">Enter Answer</button>
        </div>
        )}
        {incorrect && (
          <div className='m-3 text-xl bg-red-500/40'>Incorrect answer</div>
        )}
        {solved && (
          <div className='m-3 text-xl bg-green-500/40'>Correct answer! +100 points</div>
        )}
        {streakUpdated && (
          <div className='m-3 text-xl bg-orange-500/40'>Streak updated!</div>
        )}
        {reveal && (
          <div className='m-3 text-xl bg-yellow-500/40'>Solution: {problem.answer}</div>
        )}
      </div>
      </div>
  )
}

export default Problem