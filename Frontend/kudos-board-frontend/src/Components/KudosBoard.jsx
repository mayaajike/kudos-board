import React from 'react';
import './KudosBoard.css';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const KudosBoard = ({ boards, setBoards }) => {
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:4500/boards')
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setBoards(data);
        })
        .catch(error => {
            console.error('Error fetching boards:', error);
        });
    }, [boards])

    const handleDeleteBoard = (boardId) => {
        console.log('Deleting board with ID:', boardId);
        navigate(`/boards/${boardId}/delete`);
    };

    const handleViewCard = (boardId) => {
        console.log('Now viewing cards at baord: ', boardId);
        navigate(`/boards/${boardId}/cards`)
    }

    const renderBoards = () => {
        return boards.map(board => (
            <div key={board.id} className='kudos-board-container'>
                <img src={board.image} className='board-image'/>
                <p className='board-title'>{board.name}</p>
                <p className='board-type'>{board.category}</p>
                <div className='board-buttons'>
                    <button className='view-button' onClick={() => handleViewCard(board.id)}>View</button>
                    <button className='delete-button' onClick={() => handleDeleteBoard(board.id)}>Delete</button>
                </div>
            </div>
        ));
    }



    return (
        <div className="boards">
             {renderBoards()}
        </div>

    )
}

export default KudosBoard;
