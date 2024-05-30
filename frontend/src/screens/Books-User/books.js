import React, { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

import Navbar from "../../components/Navbar/Navbar";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";

import bin from "../../images/bin.png";
import edit from "../../images/edit.png";

import "./books.css";

export default function Books() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [TitleValue, setTitleValue] = useState('');                               // Searching by title
    const [filterOption, setFilterOption] = useState('author');                     // Options: Author, genre, year
    const [filterValue, setFilterValue] = useState('');                             // Filter by option value

    const [editingBookId, setEditingBookId] = useState(null);
    const [editedBook, setEditedBook] = useState({ title: "", author: "", genre: "", year: "" });

    const [curr, setCurr] = useState(1);                                            // Pagination state
    const limit = 10;

    const loadBooks = useCallback(async () => {

        try {
            let query = '';

            if (TitleValue) {
                query += `?title=${TitleValue}`;
            }

            if (filterValue) {
                query += `${query ? '&' : '?'}${filterOption}=${filterValue}`;
            }

            const response = await fetch(`https://book-management-cjgu.onrender.com/api/books${query}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            setBooks(data.books);
            setLoading(false);

        }
        catch (error) {
            console.log("Error fetching Data", error);
            setLoading(false);
        }

    }, [TitleValue, filterOption, filterValue]);

    useEffect(() => {
        loadBooks();
    }, [loadBooks, setBooks]);

    const handleSearch = () => {
        setCurr(1);
        loadBooks();
    };

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
    }

    const handleEdit = (book) => {
        setEditingBookId(book._id);
        setEditedBook({ title: book.title, author: book.author, genre: book.genre, year: book.year });
    };

    const handleCancelClick = () => {
        setEditingBookId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBook({ ...editedBook, [name]: value });
    };

    const last = curr * limit;
    const first = last - limit;
    const currentBooks = books.slice(first, last);

    const paginate = pageNumber => setCurr(pageNumber);

    if (loading) {
        return (
            <div className='loading'>
                <h2> Loading... </h2>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <Heading />
            <Search
                TitleValue={TitleValue}
                setTitleValue={setTitleValue}
                filterOption={filterOption}
                setFilterOption={setFilterOption}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                handleSearch={handleSearch}
            />
            <div className='container mt-5'>
                <div className='tabling'>
                    <table className='tables'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Year Published</th>
                                {Cookies.get('type') === 'Admin' && (
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
                                    <td>{first + index + 1}</td>
                                    {Cookies.get('type') === 'Admin' && (
                                        <>
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
                                                    <td><button className='btn btn-sm' onClick={() => handleEdit(item)}><img src={edit} alt='edit' height='20px' /></button></td>
                                                    <td><button className='btn btn-sm' onClick={() => handleRemove(item._id)}><img src={bin} alt='delete' height='20px' /></button></td>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {Cookies.get('type') !== 'Admin' && (
                                        <>
                                            <td>{item.title}</td>
                                            <td>{item.author}</td>
                                            <td>{item.genre}</td>
                                            <td>{item.year}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='pagination'>
                        {[...Array(Math.ceil(books.length / limit)).keys()].map(number => (
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
