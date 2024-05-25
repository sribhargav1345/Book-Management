import React, { useState } from 'react';
import './Search.css';

export default function Search() {

    const [showPopup, setShowPopup] = useState(false);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState(0);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        const url = `https://book-management-cjgu.onrender.com/api`;

        const response = await fetch(url , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, genre, year })
        });

        const result = response.json();
        if(result.success){
            console.log("Book added successfully");
        }

        alert("Book Added Successfully");
        setShowPopup(false);

    };

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
                <div className='col-md-3 apply-button d-flex flex-row'>
                    <button className='btn btn-primary btn-md buttoning'>Apply</button>
                    <button className='btn btn-primary btn-sm addchey' onClick={togglePopup} data-tooltip="Add Book">+</button>
                </div>
            </div>
            {showPopup && (
                <div className='popup'>
                    <div className='popup-inner'>
                        <h2 className='align-center'>Add a Book</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Title:
                                <input type='text' name='title' className='form-control' required value={title} onChange={(e) => setTitle(e.target.value)}/>
                            </label>
                            <label>
                                Author:
                                <input type='text' name='author' className='form-control' required value={author} onChange={(e) => setAuthor(e.target.value)}/>
                            </label>
                            <label>
                                Genre:
                                <input type='text' name='genre' className='form-control' required value={genre} onChange={(e) => setGenre(e.target.value)}/>
                            </label>
                            <label>
                                Year:
                                <input type='number' name='year' className='form-control' required value={year} onChange={(e) => setYear(e.target.value)}/>
                            </label>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                            <button type='button' className='btn btn-secondary' onClick={togglePopup}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
