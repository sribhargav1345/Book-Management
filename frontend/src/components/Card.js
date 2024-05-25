import React, { useState } from 'react';
import GoogleLoginButton from "./GoogleLogin";

import './Card.css';

import book_icon from "../images/books-icon.png";

const LoginForm = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await fetch("https://book-management-cjgu.onrender.com/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.Stringify({ email: email, password: password })
        });

        const result = response.json();

        if(!result.success){
            alert("Enter Valid Credentials");
        }

    };

    return (
        <div className='complete'>
            <div className="login-container">
                <div className="login-card">
                    <div className='d-flex flex-row'>
                        <img src={book_icon} alt="icon" style={{ height: '30px', width: '30px'}}/>
                        <h2 className="login-title ms-3">Books Management System</h2>
                    </div>
                    <h5>Log in to your account</h5>
                    <p>Don't have an account? <a href="#">Sign Up</a></p>

                    <GoogleLoginButton />

                    <div className="divider">
                        <hr />
                        <span>Or with email and password</span>
                        <hr />
                    </div>

                    <form onSubmit={handleSubmit}>
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

                        <button type="submit" className="submit-btn"> Submit </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
