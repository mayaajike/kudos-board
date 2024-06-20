import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage'
import Cards from './Pages/Cards'
import Delete from './Pages/Delete'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/boards' element={<HomePage />}/>
          <Route path='/boards/:boardId/cards' element={<Cards />} />
          <Route path="/boards/:boardId/delete" element={<Delete />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
