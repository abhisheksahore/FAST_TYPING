import React, {useState, useEffect, useRef} from 'react';

function App() {
  const STARTING_TIME = 5;
  const [text, setText] = useState('');
  const [time, setTime] = useState(STARTING_TIME);
  const [start, setStart] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const inputRef = useRef(null);

  function handleChange(e) {
    const {value} = e.target;
    setText(value);
  }
  console.log(text)

  function calculateWordCount(text) {
    const wordsArray = text.split(' ');
    return wordsArray.filter(word => word !== '').length;
  }
  console.log(calculateWordCount(text))

  const startGame = () => {
    setStart(true);
    setTime(STARTING_TIME);
    setText('');
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }

  const endGame = () => {
    setStart(false)
    setWordCount(calculateWordCount(text));
  }

  useEffect(()=> {
    if(time > 0 && start){
      setTimeout(()=> {
        setTime(prevTime => (prevTime-1));
      }, 1000);
    } else if(time === 0) {
      endGame();
    }
  }, [start, time])



  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea ref={inputRef} name='textarea' value={text} onChange={handleChange} disabled={!start}/>
      <h4>time remaining: {time}</h4>
      <button onClick={startGame} disabled={start}>start</button>
      <h1>word count: {(time===0 && start===false)? wordCount: 0}</h1  >
    </div>
  );
}

export default App;
