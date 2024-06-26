import '../CSS/DeleteBoard.css'
import { useNavigate } from 'react-router-dom'


export default function DeleteBoard({ handleDelete, boardId }) {
    const navigate = useNavigate();
    return (
        <>
            <div className="delete-confirmation">
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this board and all related cards?</p>
                <div className='confirmation-buttons'>
                    <button id="cancel-delete-board" onClick={() => navigate('/boards')}>Cancel</button>
                    <button id="delete-board-buttton" onClick={() => handleDelete(boardId)}>Delete</button>
                </div>
            </div>
        </>
    )
}
