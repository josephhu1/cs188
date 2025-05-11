import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import Problem from "./components/Problem"
import Subject from "./components/Subject"

const App = () => {
  return (
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = "/:subject" element = {<Subject />} />
      <Route path = "/:subject/:tag" element = {<Problem />} />
    </Routes>
  );
}

export default App;