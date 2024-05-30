import React from 'react';

import "./login.css";

import book_bg from "../../images/book-lib.jpg";
import LoginForm from "../../components/Login/Login";

export default function Login() {

    return (
        <div className='d-flex flex-row'>
            <div className='picture'>
                <img src={book_bg} alt="dp" style={{ width: '100%', height: '100vh'}}/>
            </div>
            <div className='cards'>
                <LoginForm />
            </div>
        </div>
    )
}
