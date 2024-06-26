import '../CSS/NewCardModal.css'
import GiphyList from './GiphyList';
import { useState } from 'react';

export default function NewCardModal ({ isPressed, toggleCardModal, boardId, cards, setCards }) {
    const apiKey = import.meta.env.VITE_API_KEY
    const [text, setText] = useState('')
    const [selectedGif, setSelectedGif] = useState('');
    const [results, setResults] = useState([])
    const [newCard,setNewCard] = useState({
        name: '',
        image: '',
        authorName: '',
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        const newCardWithDefaultAuthor = {
            ...newCard,
            authorName: newCard.authorName || 'Anonymous'
          };
        fetch(`http://localhost:4500/boards/${boardId}/cards`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCardWithDefaultAuthor),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
                alert(data.error);
              } else {
                setCards([...cards, data]);
          }})
          .catch((error) => console.error('Error creating card:', error));
        setNewCard({ name: '', image: '' , authorName: ''});
        setText('');
        setSelectedGif('');
        setResults([]);
    };

    const handleInputChange = (event) => {
        setNewCard((prevCard) => ({ ...prevCard, [event.target.id]: event.target.value }));
    };

    const handleGiphyInput = (e) => {
        setText(e.target.value)
    }

    const handleGiphySubmit = (e) => {
        e.preventDefault();
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
        setNewCard({ ...newCard, image: url });
        setSelectedGif(url);
    };

    const handleAuthorChange = (event, cardName) => {
        setAuthor((prevAuthors) => ({ ...prevAuthors, [cardName]: event.target.value }));
    }

    return (
        <div>
            <div className='new-card-modal' style={{ display: isPressed ? 'flex' : 'none'}}>
                <div className='card-modal-content'>
                <span id='close-card-modal' onClick={toggleCardModal}>&times;</span>
                    <p className='card-modal-title'>Create a New Card</p>
                    <form className="new-card-form" onSubmit={handleSubmit}>
                        <div className='card-form'>
                            <label htmlFor='name'>Title: </label>
                            <input type='text' id="name" value={newCard.name} onChange={handleInputChange}/>
                        </div>
                        <div className='card-form'>
                            <label htmlFor="image">Search Image: </label>
                            <input type='text' id="image" value={text} onChange={handleGiphyInput}/>
                            <button type="button" id='image-search' onClick={handleGiphySubmit}>Search</button>
                            {results && <GiphyList gifs={results} onSelect={handleGifSelect}/> }
                            <input type='text' id='selected-gif' value={selectedGif} readOnly onChange={handleInputChange}/>
                        </div>
                        <div className='card-form'>
                            <label htmlFor='authorName'>Author: </label>
                            <input type='text' id="authorName" value={newCard.authorName} onChange={handleInputChange}/>
                        </div>
                        <button type='submit' id='card-submit-button' onClick={toggleCardModal}>Create New Card</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
