import React from 'react';
import "./Search.css";

export default function Search() {
  return (
    <div className='search-space'>
        <div className='row items'>
            <div className='col-md-6 search-name d-flex flex-row'>
                <div>
                    <p>Search</p>
                    <input type='text' className='form-control' placeholder='Search' />
                </div>
                <div className='vertical-line'></div>
            </div>
            <div className='col-md-3 search-filter'>
                <p>Filter By:</p>
                <select className='form-control'> 
                    <option>Author</option>
                    <option>Genre</option>
                    <option>Year</option>
                </select>
            </div>
            <div className='col-md-3 filter-search'>
                <input type="text" className='form-control' placeholder='e.g. William Shakespeare' />
            </div>
            <div className='col-md-3 apply-button'>
                <button className='btn btn-primary btn-md buttoning'>Apply</button>
            </div>
        </div>
    </div>
  )
}
