import React from 'react';
import './SearchBar.css';

const SearchBar = ({  setBoards, searchQuery, setSearchQuery, handleSearch, searchResults, setSearchResults }) => {

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
        if (event.target.value === '') {
            setSearchResults([]);
          }
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(searchQuery).then(() => {
        }).catch((error) => {
          console.error(error);
        });
      };

    return (
        <div>
            <form className="searchForm" onSubmit={handleSubmit} style={{ display: location.pathname === '/boards' ? 'block' : 'none' }}>
                <input type="search" placeholder='Search Boards...' id='search-bar' value={searchQuery} onChange={handleChange} />
                <button type="submit" id='search-button'>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;
