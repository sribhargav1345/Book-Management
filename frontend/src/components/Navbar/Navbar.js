import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

import bookicon from "../../images/books-icon.png";
import "./Navbar.css"

export default function CustomNavbar(User) {

    const navigate = useNavigate();

    const handleLogout = async () => {
        Cookies.remove('authToken');
        Cookies.remove('type');
        navigate("/login");
    }

    const handleAdmin = async () => {
        if (User.User !== "AdminDashboard") navigate("/admin");
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
                        className="d-inline-block align-top me-2 icon-class"
                    />
                    <span className="font-weight-bold bookhive">
                        BookHive
                    </span>
                </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto flex-column flex-md-row">
                    {Cookies.get('type') === "Admin" && (
                        <>
                            {User.User !== "AdminDashboard" && (
                                <Nav.Item className="my-1 my-lg-0">
                                    <button className='btn logout-button' onClick={handleAdmin}>Admin</button>
                                </Nav.Item>
                            )}
                            {User.User === "AdminDashboard" && (
                                <Nav.Item className="my-1 my-lg-0">
                                    <button className='btn logout-button' onClick={handleAdmin}>Books</button>
                                </Nav.Item>
                            )}
                        </>
                    )}
                    <Nav.Item className="my-1 my-lg-0">
                        <button className='btn logout-button' onClick={handleLogout}>Logout</button>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
