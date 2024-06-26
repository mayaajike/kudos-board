import React from 'react';
import '../CSS/KudosCard.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from "react-icons/ai";
import CommentsModal from './CommentsModal';

export default function KudosCard({ cards, setCards, boardId }) {
    const navigate = useNavigate();
    const [comments, setComments] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState(-1)
    const [isOpened, setIsOpened] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:4500/boards/${boardId}/cards`)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setCards(data);
        })
        .catch(error => {
            console.error('Error fetching cards:', error);
        });
    }, [cards])

    const handleUpvoteIncrease = (cardId, upvote) => {
        fetch(`http://localhost:4500/boards/${boardId}/cards/${cardId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ upvote }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } return response.json();
        })
        .then(data => {
            setCards(cards.map((c) =>
            c.id === cardId ? { ...c, upvote: data.upvote + 1 } : c
            ))
        });
    }

    const handleCardDelete = (boardId, cardId) => {
        navigate(`/boards/${boardId}/cards/${cardId}/delete`);
    }

    const viewComments = () => {
        fetch(`http://localhost:4500/boards/${boardId}/cards/${cardId}/comments`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ upvote }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } return response.json();
        })
        .then(data => {
            setComments(data)
        })
        .catch(error => {
            console.error('Error fetching comments:', error)
        })
    }

    const toggleCardModal = () => {
        setIsClicked(!isClicked);
    }

    const handleViewComments = (cardId) => {
        setSelectedCardId(cardId)
        setIsOpened(!isOpened)
    }
    const renderCards = () => {
        return cards.map(card => (
            <div key={card.id} className='kudos-cards'>
                <div className='KudosContainer'>
                    <img src={card.image} className='card-image'/>
                    <p className='card-title'>{card.name}</p>
                    <p>Created By: {card.authorName}</p>
                    <div className='buttons'>
                        <button className='upvote-button' onClick={() => handleUpvoteIncrease(card.id, card.upvote)}>Upvote <span id="upvote-coount" >{card.upvote}</span></button>
                        <button className='delete-card-button' onClick={() => handleCardDelete(boardId, card.id)}>Delete</button>
                        <button className='comments-button'  onClick={() => {handleViewComments(card.id)}}>Comments</button> <button className='add-comment-button'><AiOutlinePlusCircle /></button>
                    </div>
                </div>
                <CommentsModal isOpened={isOpened} setIsOpened={setIsOpened}/>
            </div>
        ));
    }

    return (
        <div className='cards-container'>{renderCards()}
        {selectedCardId !== -1 && selectedCardId}</div>
    )
}
