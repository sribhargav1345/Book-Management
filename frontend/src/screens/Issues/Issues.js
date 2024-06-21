import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Navbar from "../../components/Navbar/Navbar";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search_IssueReturn/Search";

import "./Issues.css";

export default function Issues() {
    const [details, setDetails] = useState([]); 
    const [loading, setLoading] = useState(true); 

    const [name, setName] = useState("");

    const [filterOption, setFilterOption] = useState('email'); 
    const [filterValue, setFilterValue] = useState(''); 

    const [curr, setCurr] = useState(1); 
    const limit = 10;

    let navigate = useNavigate();

    const last = curr * limit;
    const first = last - limit;
    const detail = details.slice(first, last);

    const paginate = pageNumber => setCurr(pageNumber);

    useEffect(() => {
        if (!Cookies.get('authToken')) {
            navigate('/login');
        }

        if (Cookies.get('type') !== "Admin") {
            navigate('/');
        }
    }, [navigate]);

    const loadDetails = useCallback(async () => {
        setLoading(true);
        try {
            let query = '';

            if (name) {
                query += `?name=${name}`;
            }

            if (filterOption && filterValue) {
                query += `${query ? '&' : '?'}${filterOption}=${filterValue}`;
            }

            const response = await fetch(`http://localhost:7000/api/issues${query}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            setDetails(data.issues || []); 
        } catch (error) {
            console.error("Error fetching Data", error);
        } finally {
            setLoading(false);
        }
    }, [name, filterOption, filterValue]);

    useEffect(() => {
        loadDetails();
    }, [loadDetails]);

    const handleSearch = () => {
        setCurr(1);
        loadDetails();
    }

    if (loading) {
        return (
            <div className='loading'>
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <Heading />
            <Search
                name={name}
                setName={setName}
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
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>BookId</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detail.map((item, index) => (
                                <tr key={item._id || index}>
                                    <td>{first + index + 1}</td> 
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.bookId}</td>
                                    <td>{item.date}</td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='pagination'>
                        {[...Array(Math.ceil(details.length / limit)).keys()].map(number => (
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
