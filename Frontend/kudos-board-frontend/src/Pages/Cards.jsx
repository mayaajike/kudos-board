import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import KudosCard from '../Components/KudosCard'
import { useState } from 'react'
import NewCardModal from '../Components/NewCardModal'
import { useParams } from 'react-router-dom';


const Cards = () => {
    const [isPressed, setIsPressed] = useState(false)
    const [cards, setCards] = useState([]);
    const params = useParams();
    const boardId = params.boardId;

    const toggleCardModal = () => {
        setIsPressed(!isPressed);
    }
    return (
        <div>
            <Header toggleCardModal={toggleCardModal} isPressed={isPressed}/>
            <main>
                <KudosCard cards={cards} setCards={setCards} boardId={boardId} />
                <NewCardModal toggleCardModal={toggleCardModal} isPressed={isPressed} cards={cards} setCards={setCards} boardId={boardId}/>
            </main>
            <Footer />

        </div>
    )
}

export default Cards;
