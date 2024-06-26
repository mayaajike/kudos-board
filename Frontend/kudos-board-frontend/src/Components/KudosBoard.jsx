import React from 'react';
import '../CSS//KudosBoard.css';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function KudosBoard({ boards, setBoards, searchResults, filterResults }) {
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
        navigate(`/boards/${boardId}/delete`);
    };

    const handleViewCard = (boardId) => {
        navigate(`/boards/${boardId}/cards`)
    }

    const renderBoards = () => {
      let boardsToRender;
      switch (true) {
        case searchResults && searchResults.length > 0:
          boardsToRender = searchResults;
          break;
        case filterResults && filterResults.length > 0:
          boardsToRender = filterResults;
          break;
        default:
          boardsToRender = boards;
      }

      return boardsToRender.map(board => (
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
    };
    return (
        <div className="boards">{renderBoards()}</div>
    )
}
