import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';

import './Signup.css';

import book_icon from "../../images/books-icon.png";

const SignUpForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://book-management-cjgu.onrender.com/api/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "Failed to create user");
            return;
        }

        alert("User Created Successfully");

        Cookies.set('authToken', result.token, { expires: 1, sameSite: 'Lax' });
        Cookies.setItem('type', 'User', { expires: 1, sameSite: 'Lax' });
        
        setEmail('');
        setName('');
        setPassword('');

        navigate("/");
    };

    return (
        <div className='complete2'>
            <div className="signup-container">
                <div className="signup-card">
                    <div className='d-flex flex-row'>
                        <img src={book_icon} alt="icon" style={{ height: '30px', width: '30px' }} />
                        <h2 className="signup-title ms-3">Library Management System</h2>
                    </div>
                    <h5 className='mb-4'>Register with your account</h5>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="name"
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>

                        <button type="submit" className="submit-btn mb-3"> Submit </button>

                    </form>
                    <p>Aldready have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
