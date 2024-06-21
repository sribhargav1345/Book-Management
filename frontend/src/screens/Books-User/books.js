import React, { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

import Navbar from "../../components/Navbar/Navbar";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";

import bin from "../../images/bin.png";
import edit from "../../images/edit.png";

import "./books.css";
import { useNavigate } from 'react-router-dom';

export default function Books() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [TitleValue, setTitleValue] = useState('');                               // Searching by title

    const userType = Cookies.get('type');
    const state = userType === 'Admin' ? 'bookId' : 'author';

    const [filterOption, setFilterOption] = useState(state);                     // Options: Author, genre, year
    const [filterValue, setFilterValue] = useState('');                             // Filter by option value

    const [editingBookId, setEditingBookId] = useState(null);
    const [editedBook, setEditedBook] = useState({ title: "", author: "", genre: "", year: "", count: 1 });

    const [curr, setCurr] = useState(1);                                            // Pagination state
    const limit = 10;

    const navigate = useNavigate();

    const loadBooks = useCallback(async () => {

        try {
            let query = '';

            if (TitleValue) {
                query += `?title=${TitleValue}`;
            }

            if (filterValue) {
                query += `${query ? '&' : '?'}${filterOption}=${filterValue}`;
            }

            const response = await fetch(`http://localhost:7000/api/books${query}`, {
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
    }, [loadBooks, setBooks, editedBook.count]);

    const handleSearch = () => {
        setCurr(1);
        loadBooks();
    };

    const handleRemove = async (bookid) => {
        try {
            const response = await fetch(`http://localhost:7000/api/books/${bookid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            if (result.success) {
                setBooks(books.filter(book => book._id !== bookid));
            }
            else {
                console.error("Failed to delete book:", result.error);
            }
        }
        catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const handleSaveClick = async (bookid) => {

        try {
            const response = await fetch(`http://localhost:7000/api/books/${bookid}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedBook)
            });

            const result = await response.json();

            if (result.success) {
                setBooks(books.map(book => book._id === bookid ? result.book : book));
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
        setEditedBook({ title: book.title, author: book.author, genre: book.genre, year: book.year, count: book.count });
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

    if (!Cookies.get('authToken')) {
        navigate('/login');
        return;
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
            <div className='table-prop container mt-5'>
                <div className='tabling'>
                    <table className='tables'>
                        <thead>
                            <tr>
                                {userType === 'Admin' && (
                                    <>
                                        <th>Book-ID</th>
                                    </>
                                )}
                                {userType !== 'Admin' && (
                                    <>
                                        <th>S.No</th>
                                    </>
                                )}
                                <th>Name</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Year Published</th>
                                {userType === 'Admin' && (
                                    <>
                                        <th>Count</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {currentBooks.map((item, index) => (
                                <tr key={item._id || index}>
                                    {userType === 'Admin' && (
                                        <>
                                            {editingBookId === item._id ? (
                                                <>
                                                    <td>{item.bookId}</td>
                                                    <td><input type="text" name="title" value={editedBook.title} onChange={handleChange} /></td>
                                                    <td><input type="text" name="author" value={editedBook.author} onChange={handleChange} /></td>
                                                    <td><input type="text" name="genre" value={editedBook.genre} onChange={handleChange} /></td>
                                                    <td><input type="text" name="year" value={editedBook.year} onChange={handleChange} /></td>
                                                    <td><input type="text" name="count" value={editedBook.count} onChange={handleChange} /></td>
                                                    <td><button onClick={() => handleSaveClick(item._id)}>Save</button></td>
                                                    <td><button onClick={handleCancelClick}>Cancel</button></td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>{item.bookId}</td>
                                                    <td>{item.title}</td>
                                                    <td>{item.author}</td>
                                                    <td>{item.genre}</td>
                                                    <td>{item.year}</td>
                                                    <td>{item.count}</td>
                                                    <td><button className='btn btn-sm' onClick={() => handleEdit(item)}><img src={edit} alt='edit' height='20px' /></button></td>
                                                    <td><button className='btn btn-sm' onClick={() => handleRemove(item._id)}><img src={bin} alt='delete' height='20px' /></button></td>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {userType !== 'Admin' && (
                                        <>
                                            <td>{first + index + 1}</td>
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
