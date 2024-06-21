import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage'
import Cards from './Pages/Cards'
import DeleteBoardPage from './Pages/DeleteBoardPage'
import { useState } from 'react'
import DeleteCardPage from './Pages/DeleteCardPage';

function App() {
  const [boards, setBoards] = useState([]);
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage setBoards={setBoards} boards={boards} searchQuery={searchQuery}
          setSearchQuery={setSearchQuery} searchResults={searchResults} setSearchResults={setSearchResults} />} />
          <Route path='/boards' element={<HomePage setBoards={setBoards} boards={boards} searchQuery={searchQuery}
          setSearchQuery={setSearchQuery} searchResults={searchResults} setSearchResults={setSearchResults}/>}/>
          <Route path='/boards/:boardId/cards' element={<Cards cards={cards} setCards={setCards}/>} />
          <Route path="/boards/:boardId/delete" element={<DeleteBoardPage setBoards={setBoards} boards={boards} />} />
          <Route path="/boards/:boardId/cards/:cardId/delete" element={<DeleteCardPage setCards={setCards} cards={cards} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
