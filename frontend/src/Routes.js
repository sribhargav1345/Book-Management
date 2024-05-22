import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './screens/login';
import Books from './screens/books';


export default function P_Routes() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Books />} />
        </Routes>
      </Router>
    </div>
  )
}
