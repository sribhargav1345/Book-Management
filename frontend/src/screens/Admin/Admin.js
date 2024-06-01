import React from 'react';
import './Admin.css';
import Cookies from 'js-cookie';
import Navbar from '../../components/Navbar/Navbar';
import Heading from '../../components/Heading/Heading';
import AddBooks from '../../components/Admin/AddBooks';
import BookIssue from '../../components/Admin/BookIssue';
import BookReturn from '../../components/Admin/BookReturn';

export default function Admin() {
    const User = "AdminDashboard";

    if (Cookies.get('type') !== "Admin") {
        return (
            <div className='d-flex justify-content-center'>
                <h3>401 Unauthorized</h3>
            </div>
        );
    }

    return (
        <div>
            <Navbar User={User} />
            <Heading User={User} />
            <div className='admin-page'>
                <div className='admin-card'>
                    <h2><AddBooks /></h2>
                </div>
                <div className='admin-card'>
                    <h2><BookIssue /></h2>
                </div>
                <div className='admin-card'>
                    <h2><BookReturn /></h2>
                </div>
            </div>
        </div>
    );
}
