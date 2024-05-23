import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";

import "./books.css";

export default function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 10;

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetch("http://localhost:7000/api/books", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const response = await data.json();
                setBooks(response.books);

                console.log(response.books);
                setLoading(false);

            } catch (error) {
                console.log("Error fetching Data", error);
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <Heading />
            <div>
                <div className='container tabling mt-5'>
                    <table className='tables'>
                        <thead>
                            <tr>
                                <th> S.No </th>
                                <th> Name </th>
                                <th> Author </th>
                                <th> Genre </th>
                                <th> Year Published </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBooks.map((item, index) => (
                                <tr key={index}>
                                    <td>{indexOfFirstBook + index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='pagination'>
                        {[...Array(Math.ceil(books.length / booksPerPage)).keys()].map(number => (
                            <button key={number + 1} onClick={() => paginate(number + 1)} className='page-link'>
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
