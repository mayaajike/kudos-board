import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { useParams } from 'react-router-dom';
import DeleteBoard from "../Components/DeleteBoard";

const Delete = () => {
    const params = useParams();
    const boardId = params.boardId;

    const handleDelete = (boardId) => {
        console.log('Deleting board with ID:', boardId);
        fetch(`/boards/${boardId}/delete`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Deleted Board: ', data);
            setBoards(boards.filter(board => board.id !== boardId));
            navigate('/boards');
        })
        .catch(error => {
            console.log('Error fetching boards: ', error);
        });
    };

    return (
        <>
            <Header />
            <main>
                <DeleteBoard handleDelete={handleDelete} boardId={boardId}/>
            </main>
            <Footer />
        </>
    )
}

export default Delete;
