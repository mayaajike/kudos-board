import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
    return (
        <div>
            <form className="searchForm">
                <input type="text" placeholder='Search Boards...' id='search-bar'></input>
                <button type="submit" id='search-button'>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;
