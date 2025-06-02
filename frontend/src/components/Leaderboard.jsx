import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Leaderboard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [authChecked, setAuthChecked] = useState(false);
  const [currentUserRank, setCurrentUserRank] = useState(null);

  const [leaderboard, setLeaderboard] = useState([]);


  // First useEffect to allow AuthContext to initialize
  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthChecked(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

const getLeague = (points) => {
  if (points >= 2000) return { name: 'Masters', color: 'text-purple-600' };
  if (points >= 1500) return { name: 'Platinum', color: 'text-teal-500' };
  if (points >= 700) return { name: 'Gold', color: 'text-yellow-500' };
  if (points >= 200) return { name: 'Silver', color: 'text-gray-400' };
  return { name: 'Bronze', color: 'text-amber-800' };
};

  // Main useEffect to load data after auth check
  useEffect(() => {
    // Don't do anything until we've checked auth status
    if (!authChecked) return;
    
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/user/username/${user.username}`);
        if (response.data) {
          setUserData(response.data);
          setSelectedAvatar(response.data.pfp);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5555/user/users'); // or /user/users
    if (response.data) {
      const sorted = response.data.sort((a, b) => b.points - a.points);

      // Set top 10 users

      // Find current user's index
      const index = sorted.findIndex(u => u.username === user.username);
      if (index !== -1) {
        setCurrentUserRank({
          ...sorted[index],
          rank: index + 1,
        });
      }
      setLeaderboard(sorted.slice(0, 10));

      console.log('currentUserRank', currentUserRank);
      console.log('Fetched usernames:', sorted.map(u => u.username));
console.log('Logged-in user:', user?.username);
    }
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  }
};


    // Fetch avatar collection
    const fetchAvatars = async () => {
      try {
        const response = await axios.get('http://localhost:5555/user/avatars');
        if (response.data) {
          setAvatars(response.data);
        }
      } catch (error) {
        console.error('Error fetching avatars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchAvatars();
    fetchUsers();
  }, [user, navigate, authChecked]);



  // If we haven't performed the auth check yet, show a loading indicator
  if (!authChecked) {
    return (
      <div>
        <Navbar />
        <div className="flex-col flex items-center justify-center mt-10">
          <div>Loading...</div>
        </div>
      </div>
    );
  }


  return (
     <div>
        <Navbar />
        <div className="flex-col flex items-center justify-center mt-10">
        </div>
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">🏆 Leaderboard</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Rank</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Points</th>
            <th className="border border-gray-300 p-2">League</th>
          </tr>
        </thead>

        <tbody>
          {leaderboard.map((u, index) => (
            <tr key={u.username} className="text-center hover:bg-gray-100 transition">
              <td className="border border-gray-300 p-2 font-semibold text-lg text-yellow-500">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
              </td>
              <td className="border border-gray-300 p-2 flex items-center gap-3 justify-center">
                <img
                  src={u.pfp}
                  alt="avatar"
                  className="w-10 h-10 rounded-full ring-2 ring-indigo-400"
                />
                <span className="font-medium text-gray-800">{u.username}</span>
              </td>
              <td className="border border-gray-300 p-2 text-indigo-600 font-semibold">{u.points}</td>
              <td className={`border border-gray-300 p-2 text-sm font-semibold ${getLeague(u.points).color}`}>
                {getLeague(u.points).icon} {getLeague(u.points).name}
              </td>
            </tr>
          ))}
        </tbody>
          <tbody>
          {currentUserRank && currentUserRank.rank > 10 && (
            <>
              <tr className="text-center">
                <td colSpan="4" className="text-gray-400 italic py-2">And here you are!</td>
              </tr>
              <tr key={currentUserRank.username} className="text-center bg-yellow-50 font-semibold ring-1 ring-yellow-300">
                <td className="border border-gray-300 p-2 text-yellow-600">{currentUserRank.rank}</td>
                <td className="border border-gray-300 p-2 flex items-center gap-3 justify-center">
                  <img
                    src={currentUserRank.pfp}
                    alt="avatar"
                    className="w-10 h-10 rounded-full ring-2 ring-indigo-400"
                  />
                  <span className="text-gray-800">{currentUserRank.username}</span>
                </td>
                <td className="border border-gray-300 p-2 text-indigo-600">{currentUserRank.points}</td>
                <td className={`border border-gray-300 p-2 ${getLeague(currentUserRank.points).color}`}>
                  {getLeague(currentUserRank.points).icon} {getLeague(currentUserRank.points).name}
                </td>
              </tr>
            </>
          )}
        </tbody>
    </table>

    </div>
  </div>

  );
};



export default Leaderboard; 