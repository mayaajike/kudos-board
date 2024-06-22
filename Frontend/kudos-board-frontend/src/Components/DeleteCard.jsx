import '../CSS/DeleteCard.css'
import { useNavigate } from 'react-router-dom'

const DeleteCard = ({ handleDelete, boardId, cardId }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="delete-card-confirmation">
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this card?</p>
                <div className='card-confirmation-buttons'>
                    <button id="cancel-delete-card" onClick={() => navigate(-1)}>Cancel</button>
                    <button id="delete-card-buttton" onClick={() => handleDelete(boardId, cardId)}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default DeleteCard;
