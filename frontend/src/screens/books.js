import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import Search from "../components/Search";
import bin from "../images/bin.png";
import edit from "../images/edit.png";

import "./books.css";

export default function Books() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingBookId, setEditingBookId] = useState(null);
    const [editedBook, setEditedBook] = useState({ title: "", author: "", genre: "", year: "" });

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 10;

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetch("https://book-management-cjgu.onrender.com/api/books", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const response = await data.json();
                setBooks(response.books);
                setLoading(false);

            } catch (error) {
                console.log("Error fetching Data", error);
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    const handleRemove = async (bookId) => {
        try {
            const response = await fetch(`https://book-management-cjgu.onrender.com/api/books/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            if (result.success) {
                setBooks(books.filter(book => book._id !== bookId));
            } 
            else {
                console.error("Failed to delete book:", result.error);
            }
        } 
        catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const handleEditClick = (book) => {
        setEditingBookId(book._id);
        setEditedBook({ title: book.title, author: book.author, genre: book.genre, year: book.year });
    };

    const handleSaveClick = async (bookId) => {
        try {

            const response = await fetch(`https://book-management-cjgu.onrender.com/api/books/${bookId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedBook)
            });

            const result = await response.json();

            if (result.success) {
                setBooks(books.map(book => book._id === bookId ? result.book : book));
                setEditingBookId(null);
            } 
            else {
                console.error("Failed to update book:", result.error);
            }
        } 
        catch (error) {
            console.error("Error updating book:", error);
        }
    };

    const handleCancelClick = () => {
        setEditingBookId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBook({ ...editedBook, [name]: value });
    };

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
            <Search />
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
                                {!localStorage.getItem('authToken') && (
                                    <>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {currentBooks.map((item, index) => (
                                <tr key={item._id || index}>
                                    <td>{indexOfFirstBook + index + 1}</td>
                                    {editingBookId === item._id ? (
                                        <>
                                            <td><input type="text" name="title" value={editedBook.title} onChange={handleChange} /></td>
                                            <td><input type="text" name="author" value={editedBook.author} onChange={handleChange} /></td>
                                            <td><input type="text" name="genre" value={editedBook.genre} onChange={handleChange} /></td>
                                            <td><input type="text" name="year" value={editedBook.year} onChange={handleChange} /></td>

                                            <td><button onClick={() => handleSaveClick(item._id)}>Save</button></td>
                                            <td><button onClick={handleCancelClick}>Cancel</button></td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{item.title}</td>
                                            <td>{item.author}</td>
                                            <td>{item.genre}</td>
                                            <td>{item.year}</td>
                                            {!localStorage.getItem('authToken') && (
                                                <>
                                                    <td><button onClick={() => handleEditClick(item)}><img src={edit} alt="Edit" height='20px' width='20px' /></button></td>
                                                    <td><button onClick={() => handleRemove(item._id)}><img src={bin} alt="Delete" height='20px' width='20px' /></button></td>
                                                </>
                                            )}
                                        </>
                                    )}
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
