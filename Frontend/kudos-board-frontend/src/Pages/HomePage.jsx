import { React, useState } from 'react'
import Header from '../Components/Header'
import '../App.css'
import KudosBoard from '../Components/KudosBoard'
import NewBoardModal from '../Components/NewBoardModal'
import Footer from '../Components/Footer'

function HomePage({ boards, setBoards, searchQuery, setSearchQuery, searchResults, setSearchResults }) {
    const [isClicked, setIsClicked] = useState(false)

    const toggleBoardModal = () => {
        setIsClicked(!isClicked);
    }

    const handleSearch = async () => {
        const response = await fetch('http://localhost:4500/boards/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ searchQuery })
        });
        const data = await response.json();
        setSearchResults(data);
      };

    return (
        <>
            <Header isClicked={isClicked} toggleBoardModal={toggleBoardModal} boards={boards} setBoards={setBoards} handleSearch={handleSearch}
            searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchResults={searchResults} setSearchResults={setSearchResults} />

            <main>
                <KudosBoard boards={boards} setBoards={setBoards} searchResults={searchResults} setSearchResults={setSearchResults}/>
                <NewBoardModal toggleBoardModal={toggleBoardModal} isClicked={isClicked} setBoards={setBoards} boards={boards}/>
            </main>

            <Footer />
        </>
        )
}

export default HomePage
