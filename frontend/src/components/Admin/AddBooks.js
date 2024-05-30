import React, { useState } from 'react';
import "./AddBooks.css";

export default function AddBooks() {

    const [showPopup,setShowPopup] = useState(false);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState(null);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleSubmit = async() => {

    }

    return (
        <div className='add-books'>
            <div className="books-container">
                <div className="books-card">
                    <div className='content'>

                        <div className='title'>
                            <h2 className="books-title">Add Books</h2>
                        </div>

                        <div className='cate'>

                            <div className='one-book'>
                                <p className='me-4 mt-3'>Single Book:</p>
                                <button className='btn btn-primary btn-md buttoning' onClick={handleSubmit}>Add Book</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            {showPopup && (
                <div className='popup'>
                    <div className='popup-inner'>
                        <h2 className='align-center'>Add a Book</h2>

                        <form onSubmit={handleSubmit}>
                            <label>
                                Title:
                                <input type='text' name='title' className='form-control' required value={title} onChange={(e) => setTitle(e.target.value)} />
                            </label>
                            <label>
                                Author:
                                <input type='text' name='author' className='form-control' required value={author} onChange={(e) => setAuthor(e.target.value)} />
                            </label>
                            <label>
                                Genre:
                                <input type='text' name='genre' className='form-control' required value={genre} onChange={(e) => setGenre(e.target.value)} />
                            </label>
                            <label>
                                Year:
                                <input type='number' name='year' className='form-control' required value={year} onChange={(e) => setYear(e.target.value)} />
                            </label>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                            <button type='button' className='btn btn-secondary' onClick={togglePopup}>Close</button>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
}
