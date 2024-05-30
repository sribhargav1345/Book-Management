import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import GoogleLoginButton from "./GoogleLogin";

import './Login.css';

import book_icon from "../../images/books-icon.png";

const LoginForm = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user,setUser] = useState(null);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await fetch("https://book-management-cjgu.onrender.com/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if(!response.ok){
            alert("Enter Valid Credentials");
            return;
        }

        navigate("/");
        Cookies.set('authToken', result.token, { expires: 1, sameSite: 'Lax' });


        const token = result.token;

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken);

                if(user.email === 'bollapragadasri@iitbhilai.ac.in' ){
                    Cookies.set('type', 'Admin', { expires: 1, sameSite: 'Lax' });
                }
                else {
                    Cookies.set('type', 'User', { expires: 1, sameSite: 'Lax' });
                }
            }
            catch (error) {
                // Cookies.remove('authToken');
                // navigate('/login');
                console.log(error);
            }
        } 
        else {
            console.log("User not Logged In");
        }
    };

    return (
        <div className='complete'>
            <div className="login-container">
                <div className="login-card">
                    <div className='d-flex flex-row'>
                        <img src={book_icon} alt="icon" style={{ height: '30px', width: '30px'}}/>
                        <h2 className="login-title ms-3">Library Management System</h2>
                    </div>
                    <h5>Log in to your account</h5>
                    <p>Don't have an account? <a href="/register">Sign Up</a></p>

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
