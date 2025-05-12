import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import TagSquare from './TagSquare';

const Subject = () => {
  const navigate = useNavigate();
  const {subject} = useParams();
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
        .get(`http://localhost:5555/problems/tags/${subject}`)
        .then((response) => {
            if (!response){
                throw new Error("Subject does not exist");
            }
            setTags(response.data);
            setFilteredTags(response.data)
          }).catch((error) => {
            alert("Subject does not exist")
            navigate("/")
          });
    }, [])
  const [filteredTags, setFilteredTags] = useState(tags);
  const handleSearch  = (x) => {
    const searchTag = x.target.value
    setSearch(searchTag)
    
    const filteredSearch = tags.filter((tag) =>
      tag.toLowerCase().includes(searchTag.toLowerCase())
      
    )
    setFilteredTags(filteredSearch)
  }
  return (
    <div>
      <Navbar/>
      <div className='flex-col flex items-center justify-center'>
        <div className='text-3xl m-3'>What topic in particular?</div>
      <input className = "w-full max-w-md px-4 py-2 border border-black-300 rounded-lg m-10"
      type = "text" value = {search} onChange={handleSearch} placeholder='Search'></input>
      <div>
        {filteredTags.map((tag, i) => ( <TagSquare key = {i} subject={subject} tag={tag}/>))}
      </div>
      </div>
    </div>
  )
}

export default Subject