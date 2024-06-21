import React, { useState } from 'react';
import "./AddBooks.css";

export default function AddBooks() {

    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState(null);
    const [count, setCount] = useState(1);
    const [bookId, setBookId] = useState(null);
    const [file, setFile] = useState(null);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const UploadPopUp = () => {
        setShowPopup2(!showPopup2);
    };

    const handleSubmit_Single = async (event) => {
        event.preventDefault();

        const url = `http://localhost:7000/api/`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, genre, year, count, bookId })
        });

        const result = await response.json();

        setTitle("");
        setAuthor("");
        setGenre("");
        setYear(null);
        setBookId(null);
        setCount(0);

        if (!response.ok) {
            console.log(result.message || "Warning! Book Not Added");
            setShowPopup(false);
            return;
        }

        alert("Book Added Successfully");
        setShowPopup(false);
    };

    const handleSubmit_Multiple = async (event) => {
        event.preventDefault();

        if(!file){
            alert("Please upload a CSV File");
            return;
        }

        console.log("Came here");

        const formData = new FormData();
        formData.append('file', file);

        const url = `http://localhost:7000/api/upload/`;

        try{
            const response = await fetch(url, {
                method: "POST",
                body: formData
            });
    
            const result = await response.json();
            console.log("Cheppan");
    
            if (!response.ok) {
                console.log(result.message || "Warning! Books Not Added");
                setShowPopup2(false);
                return;
            }
    
            alert(result.message || "Books Added Successfully");
            setShowPopup2(false);
        }
        catch(error){
            console.log("Error handling Multiple Files");
            alert("Error handling Multiple Files");
        }
    };

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
                                <button className='btn btn-primary btn-md buttoning' onClick={togglePopup}>Add Book</button>
                            </div>

                            <div className='multi-book'>
                                <p className='me-4 mt-3'>Multiple Books:</p>
                                <button className='btn btn-primary btn-md buttoning' onClick={UploadPopUp}>Add Books(.csv)</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            {showPopup && (
                <div className='popup'>
                    <div className='popup-inner'>
                        <h2 className='align-center pop-title'>Add a Book</h2>

                        <form onSubmit={handleSubmit_Single}>
                            <label>
                                Title:
                                <input type='text' name='title' className='form-control' required value={title} onChange={(e) => setTitle(e.target.value)} />
                            </label>
                            <label>
                                Author:
                                <input type='text' name='author' className='form-control' required value={author} onChange={(e) => setAuthor(e.target.value)} />
                            </label>
                            <div className='d-flex'>
                                <label className='me-3'>
                                    Genre:
                                    <input type='text' name='genre' className='form-control' required value={genre} onChange={(e) => setGenre(e.target.value)} />
                                </label>
                                <label>
                                    Count:
                                    <input type='number' name='count' className='form-control' required value={count} onChange={(e) => setCount(e.target.value)} />
                                </label>
                            </div>
                            <div className='d-flex'>
                                <label className='me-3'>
                                    BookId:
                                    <input type='number' name='year' className='form-control' required value={bookId} onChange={(e) => setBookId(e.target.value)} />
                                </label>
                                <label>
                                    Year:
                                    <input type='number' name='year' className='form-control' required value={year} onChange={(e) => setYear(e.target.value)} />
                                </label>
                            </div>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                            <button type='button' className='btn btn-secondary' onClick={togglePopup}>Close</button>
                        </form>

                    </div>
                </div>
            )}
            {showPopup2 && (
                <div className='popup'>
                    <div className='popup-inner'>
                        <h2 className='align-center pop-title2 mb-5'>Add Books via CSV file</h2>
                        <form onSubmit={handleSubmit_Multiple}>
                            <label className='pop-csv'>
                                <p style={{fontWeight: '600'}}> Upload CSV: </p>
                                <input type='file' accept='.csv' className='form-control' required onChange={handleFileChange} />
                            </label>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                            <button type='button' className='btn btn-secondary' onClick={UploadPopUp}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}