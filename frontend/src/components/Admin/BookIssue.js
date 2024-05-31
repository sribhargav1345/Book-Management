import React, { useState } from 'react';
import "./BookIssue.css";

export default function BookIssue() {

    const [email, setEmail] = useState('');
    const [bookId, setBookId] = useState('');

    const action = "Issue";

    const handleSubmit = async(e) => {
        e.preventDefault();

        const url = `https://book-management-cjgu.onrender.com/api/books/${bookId}`;

        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, action })
        });

        let result = await response.json();

        if(!response.ok){
            alert(result.message || "Issue Failed");
        }
        else{
            alert(result.message || "Issuing Successfull");
        }

        setEmail('');
        setBookId('');
    }

    return (
        <div className='book-issue'>
            <div className="book-container">
                <div className="issue-card">
                    <div className='content'>
                        <div className='name-title'>
                            <h2 className="books-title mb-4">Book Issual</h2>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form1-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form1-group">
                                <label htmlFor="bookId">Book ID</label>
                                <input
                                    type="text"
                                    id="bookId"
                                    placeholder="Enter Book ID"
                                    value={bookId}
                                    onChange={(e) => setBookId(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="submit-btn">Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}
