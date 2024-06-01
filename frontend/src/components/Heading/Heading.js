import React from 'react';
import "./Heading.css";

import iit from "../../images/885.png";

export default function Heading(User) {

  return (
    <div className='container-search'>
      <div className='head-search'>
        <div className='imaging'>
          <img src={iit} alt='iitbh' className='imaging1' />
        </div>
        <div className='heading'>
          {User.User === "AdminDashboard" && (<h1 className='heads'> <span className='no-dis'>IIT Bhilai -</span> Admin Dashboard</h1>)}
          {User.User !== "AdminDashboard" && (<h1 className='heads2'> IIT Bhilai BookHive </h1>)}
        </div>
      </div>
    </div>
  )
}
