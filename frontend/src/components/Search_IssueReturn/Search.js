import React from 'react';
import './Search.css';

export default function Search({ name, setName, filterOption, setFilterOption, filterValue, setFilterValue, handleSearch }) {
    
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        <option value="email">Email</option>
                        <option value="bookId">BookId</option>
                    </select>
                </div>

                <div className='col-md-3 filter-search'>
                    <input
                        type="text"
                        className='form-control'
                        placeholder={`e.g. ${filterOption === 'email' ? 'library@gmail.com' : filterOption === 'bookId' ? '1001' : ''}`}
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                    />
                </div>

                <div className='col-md-3 apply-button d-flex flex-row'>
                    <button className='btn btn-primary btn-md buttoninging px-5' onClick={handleSearch}>Apply</button>
                </div>
            </div>
        </div>
    );
}
