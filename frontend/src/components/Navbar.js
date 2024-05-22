import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomNavbar() {
    return (
        <Navbar variant="dark" expand="lg" className="p-2 navbar-items">
            <Navbar.Brand href="#" className="d-flex align-items-center text-black">
                <div className='d-flex mx-4'>
                    <img
                        src="data:image/jpeg;base64,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" // Replace with your logo path
                        alt="Logo"
                        width="30"
                        height="30"
                        className="d-inline-block align-top me-2"
                    />
                    <span className="font-weight-bold" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.25rem' }}>
                        Bhargav Ram
                    </span>
                </div>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
}