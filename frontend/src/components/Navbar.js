import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import bookicon from "../images/books-icon.png";
import "./Navbar.css"

export default function CustomNavbar() {
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

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <button className='btn logout-button'><Link to="/login"> Logout </Link></button>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
}