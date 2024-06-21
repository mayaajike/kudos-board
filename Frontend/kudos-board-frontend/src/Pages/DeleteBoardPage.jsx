import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { useParams } from 'react-router-dom';
import DeleteBoard from "../Components/DeleteBoard";
import { useNavigate } from 'react-router-dom'


const DeleteBoardPage = ({ boards, setBoards }) => {
    const params = useParams();
    const boardId = params.boardId;
    const navigate = useNavigate()

    const handleBoardDelete = (boardId) => {
        fetch(`http://localhost:4500/boards/${boardId}/delete`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setBoards(boards.filter(board => board.id !== boardId));
        })
        .catch(error => {
            console.log('Error fetching board: ', error);
        });
        navigate('/boards');
    };

    return (
        <>
            <Header />
            <main>
                <DeleteBoard style={{ display: location.pathname === `/boards/${boardId}/delete` ? 'block' : 'none' }} handleDelete={handleBoardDelete} boardId={boardId} />
            </main>
            <Footer />
        </>
    )
}

export default DeleteBoardPage;
