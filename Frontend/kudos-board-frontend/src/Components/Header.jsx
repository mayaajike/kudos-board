import React from 'react';
import './Header.css';
import SearchBar from './SearchBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineArrowBackIos } from "react-icons/md";


const Header = ({ isClicked, isPressed, toggleBoardModal, toggleCardModal }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <header>
                <MdOutlineArrowBackIos className="back-button" style={{ display: location.pathname !== '/boards' ? 'block' : 'none' }} onClick={() => navigate('/boards')}/>
                <h1 className="title">Kudos Board</h1>
                <SearchBar />
                <div className='header-buttons'>
                <button id='all-button'>All</button>
                <button id='recent-button'>Recents</button>
                <button id='celebration-button'>Celebrations</button>
                <button id='thanks-button'>Thank You</button>
                <button id='inspiration-button'>Inspirations</button>
                </div>
                <button id='create-new-board-button' style={{ display: location.pathname === '/boards' ? 'block' : 'none' }} onClick={toggleBoardModal}>Create a New Board</button>
                <button id='create-new-card-button' style={{ display: location.pathname.match(/^\/boards\/\d+\/cards$/) !== null ? 'block' : 'none' }} onClick={toggleCardModal}>Create a New Card</button>
            </header>

        </>
    )
}

export default Header;