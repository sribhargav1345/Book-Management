import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './screens/Login/login';
import Books from './screens/Books-User/books';
import SignUpForm from './screens/Signup/signup';
import Admin from './screens/Admin/Admin';
import Issues from './screens/Issues/Issues';
import Returns from './screens/Returns/Returns';

export default function P_Routes() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Books />} />
          <Route exact path="/register" element={<SignUpForm />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/issues" element={<Issues/>} />
          <Route exact path="/returns" element={<Returns/>} />
        </Routes>
      </Router>
    </div>
  )
}
