import React from 'react';
import './Admin.css';

import Navbar from '../../components/Navbar/Navbar';
import Heading from '../../components/Heading/Heading';

import AddBooks from '../../components/Admin/AddBooks';
import BookIssue from '../../components/Admin/BookIssue';
import BookReturn from '../../components/Admin/BookReturn';

export default function Admin() {

  const User = "AdminDashboard";

  return (
    <div>
        <Navbar />
        <Heading User={User}/>
        <div className='admin-page'>
            <div>
                <h2> <AddBooks /> </h2>
            </div>
            <div>
                <h2> <BookIssue /> </h2>
            </div>
            <div>
                <h2> <BookReturn /> </h2>
            </div>
        </div>
    </div>
  )
}
