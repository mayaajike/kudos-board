import '../CSS/NewCardModal.css'
import GiphyList from './GiphyList';
import { useState } from 'react';

const NewCardModal = ({ isPressed, toggleCardModal, boardId, cards, setCards }) => {
    const apiKey = import.meta.env.VITE_API_KEY
    const [text, setText] = useState('')
    const [selectedGif, setSelectedGif] = useState('');
    const [results, setResults] = useState([])
    const [newCard,setNewCard] = useState({
        name: '',
        image: '',
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4500/boards/${boardId}/cards`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCard),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
                alert(data.error);
              } else {
                console.log('Card created:', data);
                setCards([...cards, data]);
          }})
          .catch((error) => console.error('Error creating card:', error));
        setNewCard({ name: '', image: '' });
        setText('');
        setSelectedGif('');
        setResults([]);
    };

    const handleInputChange = (event) => {
        setNewCard({ ...newCard, [event.target.id]: event.target.value });
    };

    const handleGiphyInput = (e) => {
        setText(e.target.value)
    }

    const handleGiphySubmit = (e) => {
        e.preventDefault();
        if(text.length === 0){
            console.log('length is 0, please enter text before submitting')
            return
        }

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

    return (
        <div>
            <div className='new-card-modal' style={{ display: isPressed ? 'flex' : 'none'}}>
                <div className='card-modal-content'>
                <span id='close-card-modal' onClick={toggleCardModal}>&times;</span>
                    <p className='card-modal-title'>Create a New Card</p>

                    <form className="new-card-form" onSubmit={handleSubmit}>
                        <div className='card-form'>
                            <label htmlFor='namee'>Title: </label>
                            <input type='text' id="name" value={newCard.name} onChange={handleInputChange}/>
                        </div>
                        <div className='card-form'>
                            <label htmlFor="image">Search Image: </label>
                            <input type='text' id="image" value={text} onChange={handleGiphyInput}/>
                            <button type="button" id='image-search' onClick={handleGiphySubmit}>Search</button>
                            {results && <GiphyList gifs={results} onSelect={handleGifSelect}/> }
                            <input type='text' id='selected-gif' value={selectedGif} readOnly onChange={handleInputChange}/>
                        </div>
                        <button type='submit' id='card-submit-button' onClick={toggleCardModal}>Create New Card</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewCardModal;
