import React from 'react';
import '../CSS/Header.css';
import SearchBar from './SearchBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineArrowBackIos } from "react-icons/md";

export default function Header(props){
    const { boards, setBoards, toggleBoardModal, toggleCardModal, searchResults, setSearchResults, searchQuery, setSearchQuery, handleSearch, handleFilter } = props;
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <header>
                <MdOutlineArrowBackIos className="back-button" style={{ display: location.pathname !== '/boards' ? 'block' : 'none' }} onClick={() => navigate(-1)}/>
                <h1 className="title">Kudos Board</h1>
                <SearchBar boards={boards} setBoards={setBoards} searchResults={searchResults} setSearchResults={setSearchResults}
                searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch}/>
                <div className='header-buttons' style={{ display: location.pathname === '/' || location.pathname === '/boards' ? 'block' : 'none' }}>
                    <button className='filter-button' onClick={() => handleFilter('ALL')}>All</button>
                    <button className='filter-button' onClick={() => handleFilter('RECENT')}>Recents</button>
                    <button className='filter-button' onClick={() => handleFilter('CELEBRATION')}>Celebrations</button>
                    <button className='filter-button' onClick={() => handleFilter('THANK_YOU')}>Thank You</button>
                    <button className='filter-button' onClick={() => handleFilter('INSPIRATION')}>Inspirations</button>
                </div>
                <button id='create-new-board-button' style={{ display: location.pathname === '/' || location.pathname === '/boards' ? 'block' : 'none' }} onClick={toggleBoardModal}>Create a New Board</button>
                <button id='create-new-card-button' style={{ display: location.pathname.match(/^\/boards\/\d+\/cards$/) !== null ? 'block' : 'none' }} onClick={toggleCardModal}>Create a New Card</button>
            </header>

        </>
    )
}
