import React from 'react';
import Cookies from 'js-cookie';
import './Search.css';

export default function Search({ TitleValue, setTitleValue, filterOption, setFilterOption, filterValue, setFilterValue, handleSearch }) {

    const handleFilterChange = (e) => {
        setFilterOption(e.target.value);
    };

    return (
        <div className='search-space'>
            <div className='row items'>

                <div className='col-md-6 search-name d-flex flex-row'>
                    <div>
                        <p>Search</p>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Search by Title'
                            value={TitleValue}
                            onChange={(e) => setTitleValue(e.target.value)}
                        />
                    </div>
                    <div className='vertical-line'></div>
                </div>

                <div className='col-md-3 search-filter'>
                    <p>Filter By:</p>
                    <select
                        className='form-control'
                        value={filterOption}
                        onChange={handleFilterChange}
                    >
                        {Cookies.get('type')=== 'Admin' && (
                            <option value="bookId">BookId</option>
                        )}
                        <option value="author">Author</option>
                        <option value="genre">Genre</option>
                        <option value="year">Year</option>
                    </select>
                </div>

                <div className='col-md-3 filter-search'>
                    <input
                        type="text"
                        className='form-control'
                        placeholder={`e.g. ${filterOption === 'bookId' ? '1001': filterOption === 'author' ? 'William Shakespeare' : filterOption === 'genre' ? 'Science Fiction' : filterOption === 'year' ? '1956' : ''}`}
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                    />
                </div>

                <div className='col-md-3 apply-button d-flex flex-row'>
                    <button className='btn btn-primary btn-md buttoning px-5' onClick={handleSearch}>Apply</button>
                </div>

            </div>
        </div>
    );
}
