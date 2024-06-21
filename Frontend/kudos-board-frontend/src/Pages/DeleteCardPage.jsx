import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DeleteCard from "../Components/DeleteCard";

const DeleteCardPage = ({ setCards, cards}) => {
    const params = useParams();
    const boardId = params.boardId;
    const cardId = params.cardId;
    const navigate = useNavigate()

    const handleCardDelete = (boardId, cardId) => {
        fetch(`http://localhost:4500/boards/${boardId}/cards/${cardId}/delete`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setCards(cards.filter(card => card.id !== cardId));
        })
        .catch(error => {
            console.log('Error fetching card: ', error);
        });
        navigate(-1);
    };

    return (
        <>
            <Header />
            <main>
                <DeleteCard style={{ display: location.pathname === `/boards/${boardId}/cards/${cardId}/delete` ? 'block' : 'none' }} handleDelete={handleCardDelete} boardId={boardId} cardId={cardId}/>
            </main>
            <Footer />
        </>
    )
}

export default  DeleteCardPage;
