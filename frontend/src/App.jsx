import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import Problem from "./components/Problem"
import Subject from "./components/Subject"
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Store from './components/Store'

const App = () => {
  return (
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = "/subject/:subject" element = {<Subject />} />
      <Route path = "/subject/:subject/:tag" element = {<Problem />} />
      <Route path = "/signup" element = {<Signup />} />
      <Route path = "/login" element = {<Login />} />
      <Route path = "/profile" element = {<Profile />} />
      <Route path = "/store" element = {<Store />} />
    </Routes>
  );
}

export default App;