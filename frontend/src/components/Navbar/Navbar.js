import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

import bookicon from "../../images/books-icon.png";
import "./Navbar.css"

export default function CustomNavbar(User) {

    const navigate = useNavigate();
    //console.log(User.User);

    const handleLogout = async () => {

        Cookies.remove('authToken');
        Cookies.remove('type');

        navigate("/login");
    }

    const handleAdmin = async () => {

        if(User.User !== "AdminDashboard") navigate("/admin");
        else navigate("/");
    }

    return (
        <Navbar variant="dark" expand="lg" className="p-2 navbar-items">
            <Navbar.Brand href="#" className="d-flex align-items-center text-black">
                <div className='d-flex mx-4'>
                    <img
                        src={bookicon}
                        alt="Logo"
                        width="30"
                        height="30"
                        className="d-inline-block align-top me-2"
                    />
                    <span className="font-weight-bold" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.5rem' }}>
                        BookHive
                    </span>
                </div>
            </Navbar.Brand>

            {Cookies.get('type') === "Admin" &&
                <div className="d-flex ms-auto">

                    {User.User !== "AdminDashboard" && (
                        <Nav>
                            <button className='btn logout-button' onClick={handleAdmin}> Admin</button>
                        </Nav>
                    )}
                    {User.User === "AdminDashboard" && (
                        <Nav>
                            <button className='btn logout-button' onClick={handleAdmin}> Books</button>
                        </Nav>
                    )}

                    <Nav>
                        <button className='btn logout-button' onClick={handleLogout}> Logout</button>
                    </Nav>
                </div>
            }

            {Cookies.get('type') !== "Admin" &&
                <Nav className='ms-auto'>
                    <button className='btn logout-button' onClick={handleLogout}> Logout</button>
                </Nav>
            }


        </Navbar>
    );
}