import React from 'react';
import './KudosCard.css';
import { useEffect } from 'react';



const KudosCard = ({ cards, setCards, boardId }) => {


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
        console.log(cardId)
        console.log(upvote)
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
            console.log('Card updated:', data);
            setCards(cards.map((c) =>
            c.id === cardId ? { ...c, upvote: data.upvote + 1 } : c
            ))
        });
    }


    const renderCards = () => {
        return cards.map(card => (
            <div key={card.id} className='kudos-cards'>
                <div className='KudosContainer'>
                    <img src={card.image} className='card-image'/>
                    <p className='card-title'>{card.name}</p>
                    <div className='buttons'>
                        <button className='upvote-button' onClick={() => handleUpvoteIncrease(card.id, card.upvote)}>Upvote <span id="upvote-coount" >{card.upvote}</span></button>
                        <button className='delete-card-button'>Delete</button>
                    </div>
                </div>
            </div>
        ));
    }

    return (
        <div className='cards-container'>
            {renderCards()}
        </div>

    )
}

export default KudosCard;
