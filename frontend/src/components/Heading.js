import React from 'react';
import "./Heading.css";

import iit from "../images/885.png";

export default function Heading() {
  return (
    <div className='container-search'>
        <div className='head-search'>
            <div className='imaging'>
                <img src={iit} alt='iitbh' className='imaging1'/>
            </div>
            <div className='heading'>
                <h1> IIT Bhilai BookHive </h1>
            </div>
        </div>
    </div>
  )
}
