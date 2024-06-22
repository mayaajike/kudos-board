import React from 'react';
import '../CSS/NewBoardModal.css';
import { useState } from 'react';
import GiphyList from './GiphyList';


export default function NewBoardModal({ toggleBoardModal, isClicked, setBoards, boards }) {
    const apiKey = import.meta.env.VITE_API_KEY
    const [text, setText] = useState('')
    const [selectedGif, setSelectedGif] = useState('');
    const [results, setResults] = useState([])
    const [newBoard,setNewBoard] = useState({
        name: '',
        image: '',
        category: '',
        authorName: '',
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:4500/boards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBoard),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
                alert(data.error);
              } else {
                setBoards(prevBoards => [...prevBoards, data]);
          }})
          .catch((error) => console.error('Error creating board:', error));
        setNewBoard({ name: '', image: '', category: '', authorName: '',});
        setText('');
        setSelectedGif('');
        setResults([]);
    };

    const handleInputChange = (event) => {
        setNewBoard({ ...newBoard, [event.target.id]: event.target.value });
    };

    const handleGiphyInput = (e) => {
        setText(e.target.value)
    }

    const handleGiphySubmit = (e) => {
        const giphyApiCall = async () => {
            const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${text}&limit=10`;
            const response = await fetch(apiUrl);
            const result = await response.json();
            const gifs = result.data.map((gif) => gif.images.original.url);
            setResults(gifs);
        };
        giphyApiCall()
        setText('')
    }

    const handleGifSelect = (url) => {
        setNewBoard({ ...newBoard, image: url });
        setSelectedGif(url);
    };

    return (
        <div className='new-board-modal' style={{ display: isClicked ? 'flex' : 'none'}}>
            <div className='board-modal-content'>
            <span id='close-board-modal' onClick={toggleBoardModal}>&times;</span>
                <p className='board-modal-title'>Create a New Board</p>
                <form className="new-board-form" onSubmit={handleSubmit}>
                    <div className='board-form'>
                        <label htmlFor="name">Title: </label>
                        <input type='text' id="name" value={newBoard.name} onChange={handleInputChange}/>
                    </div>
                    <div className='board-form'>
                        <label htmlFor="image">Search Image: </label>
                        <input type='text' id="image" value={text} onChange={handleGiphyInput}/>
                        <button id='image-search' type='button' onClick={handleGiphySubmit}>Search</button>
                        {results && <GiphyList gifs={results} onSelect={handleGifSelect}/> }
                        <input type='text' id='selected-gif' value={selectedGif} readOnly onChange={handleInputChange}/>
                    </div>
                    <div className="board-form">
                        <label htmlFor="category">Category: </label>
                        <input list="mylist" id="category" value={newBoard.category} onChange={handleInputChange}/>
                        <datalist id="mylist">
                            <option value="RECENT" />
                            <option value="CELEBRATION" />
                            <option value="THANK_YOU" />
                            <option value="INSPIRATION" />
                        </datalist>
                    </div>
                    <div className='board-form'>
                        <label htmlFor="authorName">Author: </label>
                        <input type='text' id='authorName' value={newBoard.authorName} onChange={handleInputChange}/>
                    </div>
                    <button type='submit' id='submit-button' onClick={toggleBoardModal}>Create Board</button>
                </form>
            </div>
        </div>
    )
}
