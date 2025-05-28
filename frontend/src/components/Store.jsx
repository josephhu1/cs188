import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useAuthContext } from '../hooks/useAuthContext';
import Confetti from 'react-confetti'
import { useWindowSize } from '@react-hook/window-size'


const Store = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({});
  const [avatars, setAvatars] = useState([
    { src: "/images/avatar1.png", name: "Shark Kid", cost: 100 },
    { src: "/images/avatar2.png", name: "Cat", cost: 100 },
    { src: "/images/avatar3.png", name: "Glasses Guy", cost: 100 }
  ]);

  const mysteryAvatars = [
    { id: "mystery1", src: "/images/mystery1.png", name: "Frieren1" },
    { id: "mystery2", src: "/images/mystery2.png", name: "Frieren2" },
    { id: "mystery3", src: "/images/mystery3.png", name: "Frieren3" }
  ];

  const [opening, setOpening] = useState(false);
  const [unlockedAvatar, setUnlockedAvatar] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();


  // Load user info
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5555/user/username/${user.username}`)
        .then((response) => {
          if (response.data) {
            setUserData(response.data);
          }
        })
        .catch((error) => {
          console.error("User not found", error);
        });
    }
  }, [user]);

  const handleMysteryBox = () => {
    setOpening(true);
    setUnlockedAvatar(null);
    setShowConfetti(false);

    setTimeout(() => {
      // Filter out already unlocked avatars
      const eligible = mysteryAvatars.filter(
        (a) => !userData.inventory_pfp?.includes(a.id)
      );

      if (eligible.length === 0) {
        alert("🎉 You already own all mystery avatars!");
        setOpening(false);
        return;
      }

      const randomIndex = Math.floor(Math.random() * eligible.length);
      const randomAvatar = eligible[randomIndex];
      setUnlockedAvatar(randomAvatar);
      setOpening(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 5 seconds

      axios
        .post(`http://localhost:5555/user/unlock-avatar/${user.username}`, {
          avatarId: randomAvatar.id
        })
        .then((res) => {
          setUserData(res.data.user); // refresh user points + inventory
        })
        .catch((err) => console.error("Failed to save unlocked avatar", err));
    }, 2000);
  };

  return (
    <div>
      <Navbar />

      <h1 className="text-4xl text-center font-bold mt-10">🛍️ Welcome to the Store</h1>
      <p className="text-center text-lg mb-10">Here you can unlock new avatars and items!</p>

      {/* Avatar Grid */}
      <div className="flex justify-center items-start mt-4">
        <div className="grid grid-cols-3 gap-10">
          {avatars.map((avatar, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-lg text-center">
              <img src={avatar.src} alt={avatar.name} className="w-28 h-28 rounded-full mx-auto" />
              <p className="mt-3 text-sm text-gray-600">Cost: {avatar.cost} points</p>
              <button
                className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={userData.points < avatar.cost}
              >
                {userData.points < avatar.cost ? "Not enough points" : "Buy"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mystery Box Section */}
      <div className="flex flex-col items-center mt-12">
        {showConfetti && <Confetti width={width} height={height} />}

        {opening ? (
          <img
            src="/images/mysterybox.png"
            alt="Opening..."
            className="w-32 h-32 animate-bounce"
          />
        ) : unlockedAvatar ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">🎉 You unlocked: {unlockedAvatar.name}!</h2>
            <img
              src={unlockedAvatar.src}
              alt={unlockedAvatar.name}
              className="w-32 h-32 mx-auto glow-border"
            />
          </div>
        ) : (
          <button
            onClick={handleMysteryBox}
            //disabled={userData.points < 100}
            className="px-6 py-3 text-white text-lg bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            🎁 Open Mystery Box (100 pts)
          </button>
        )}
      </div>
    </div>
  );
};

export default Store;
