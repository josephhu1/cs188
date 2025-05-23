import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { FcGlobe } from "react-icons/fc";
import { HiBars3 } from "react-icons/hi2";
import { FaHome } from "react-icons/fa";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import React, {useState, useEffect} from 'react'
import axios from 'axios';

export default function Navbar() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const handleClickHome = () => {
    navigate("/")
  }
  const { logout } = useLogout()
  const handleLogout = () => {
    logout()
    navigate("/")
  }
  const handleRegister = () => {
    navigate("/signup")
  }
  const handleLogin = () => {
    navigate("/login")
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
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-25 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          </div>
          <div className="items-center justify-center sm:items-stretch sm:justify-start">
            <FaHome onClick = {handleClickHome} className="h-15 w-auto m-2 text-white"/>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch">
            <div className="flex shrink-0 items-center">
              <FcGlobe className="h-15 w-auto m-2"/>
              <div className='text-white text-5xl'>
                Asteria
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {user ? (
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={userData.pfp}
                    className="size-15 rounded-full"
                  />
                </MenuButton>
                <div className='text-white'>{userData.points} points</div>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
            ) : (
            <div className="space-x-15">
              <button onClick = {handleRegister} className="rounded px-4 py-2 bg-yellow-500 text-white">Register</button>
              <button onClick = {handleLogin} className="rounded px-4 py-2 bg-green-500 text-white">Login</button>
            </div>
            )}
          </div>
        </div>
      </div>

    </Disclosure>
  )
}
