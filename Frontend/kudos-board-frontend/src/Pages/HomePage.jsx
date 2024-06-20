import { React, useState } from 'react'
import Header from '../Components/Header'
import '../App.css'
import KudosBoard from '../Components/KudosBoard'
import NewBoardModal from '../Components/NewBoardModal'
import Footer from '../Components/Footer'
import NewCardModal from '../Components/NewCardModal'

function HomePage() {
    // const [count, setCount] = useState(0)
    const [isClicked, setIsClicked] = useState(false)
    const [boards, setBoards] = useState([]);

    const toggleBoardModal = () => {
        setIsClicked(!isClicked);
    }


    return (
        <>
            <Header isClicked={isClicked} toggleBoardModal={toggleBoardModal}/>

            <main>
                <KudosBoard boards={boards} setBoards={setBoards}/>
                <NewBoardModal toggleBoardModal={toggleBoardModal} isClicked={isClicked} setBoards={setBoards} boards={boards}/>
            </main>

            <Footer />
        </>
        )
}

export default HomePage
