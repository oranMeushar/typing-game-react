import React, {useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import Game from './Game/Game';

import './App.css';

const App = () => {

  const [showDifficulty, setShowDifficulty] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState('easy');
  const [isGame, setIsGame] = useState(false);
  
  const difficulty = () =>{
    return(
      <CSSTransition in={showDifficulty} timeout={500} classNames='difficulty' unmountOnExit>
        <div className="difficulty">
          <h1>Difficulty</h1>
          <select name="difficulty" id="difficulty" onChange={(e) =>setDifficultyLevel(e.target.value)}>
            <option value='easy' selected>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
      </CSSTransition>
    )
  }


  const handleStartGame = (e) =>{
    setShowDifficulty(false);
    setIsGame(true);
    e.target.classList.add('start-game-button-hide');
  }

  return (
    <div className="App">
      {difficulty()}
      <button 
        onClick={handleStartGame} 
        className="start-game-button">Start Game
      </button>
      <button 
        onClick={() =>setShowDifficulty(!showDifficulty)}
        className="difficulty-button"
        disabled={isGame}>🔲
      </button>
      <Game started={isGame} difficultyLevel={difficultyLevel}/>
    </div>
  );
}

export default App;
