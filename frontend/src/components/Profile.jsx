import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Profile = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [authChecked, setAuthChecked] = useState(false);

  // First useEffect to allow AuthContext to initialize
  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthChecked(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

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
  }, [user, navigate, authChecked]);

  const handleAvatarSelect = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
  };

  const handleSaveAvatar = async () => {
    if (!selectedAvatar) return;

    try {
      const response = await axios.post(
        `http://localhost:5555/user/update-pfp/${user.username}`,
        { pfp: selectedAvatar }
      );

      if (response.data) {
        setUserData(response.data.user);
        setMessage('Profile picture updated successfully!');
        
        // Clear the message after 3 seconds
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      setMessage('Failed to update profile picture. Please try again.');
    }
  };

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
      <div className="flex-col flex items-center justify-center">
        <div className="text-5xl my-5 mx-10">Your Profile</div>
        
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="bg-sky-300 w-full max-w-2xl p-6 rounded-2xl shadow-2xl">
            <div className="flex flex-col items-center mb-6">
              <div className="text-2xl mb-4">Current Avatar</div>
              <img
                src={userData.pfp}
                alt="Current profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div className="mt-4 text-xl">Username: {userData.username}</div>
              <div className="mt-2 text-xl">Points: {userData.points}</div>
            </div>

            <div className="mt-8">
              <div className="text-2xl mb-4">Select a new avatar</div>
              <div className="grid grid-cols-3 gap-6">
                {avatars.map((avatar, index) => (
                  <div 
                    key={index} 
                    className={`cursor-pointer p-4 rounded-lg hover:bg-sky-400 transition-colors ${
                      selectedAvatar === avatar ? 'bg-sky-400 ring-4 ring-blue-600' : ''
                    }`}
                    onClick={() => handleAvatarSelect(avatar)}
                  >
                    <img
                      src={avatar}
                      alt={`Avatar option ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleSaveAvatar}
                className="rounded px-6 py-2 bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                Save Avatar
              </button>
            </div>

            {message && (
              <div className="mt-4 p-2 text-center rounded bg-green-100 text-green-800">
                {message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 