import { useState } from 'react'
import './App.css'
import fetchData from './utils/fetchData'
import { useEffect } from 'react'

const Flashcard = ({ flashcard }) => {
  const [text, setText] = useState(flashcard.question)
  const [backgroundColor, setBackgroundColor] = useState('lightblue')

  const flipCard = () => {
    if (text === flashcard.question) { // show the answer
      setText(flashcard.answer);
      setBackgroundColor('lightgreen');
    } else {
      setText(flashcard.question); // show the question
      setBackgroundColor('lightblue');
    }
  }

  const style = { background: backgroundColor }

  return (
    <li className="card" onClick={flipCard} style={style}>
      <p>{text}</p>
    </li>
  )
}

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const doFetch = async () => {
      const [data, error] = await fetchData('http://localhost:4000/flashcards');
      if (data) setFlashcards(data);
      if (error) setError(error);
    };
    doFetch();
  }, []);

  if (error) return <p>{error.message}</p>

  return (
    <>
      <h1>Flash Cards</h1>
      <ul>
        {
          flashcards.map((flashcard) => <Flashcard key={flashcard.id} flashcard={flashcard} />)
        }
      </ul>
    </>
  )
}

export default App
