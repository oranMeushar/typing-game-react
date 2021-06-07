import React, {useState} from 'react';
import './Game.css';
import Typing from './Typing/Typing';
import CorrectAnswers from './CorrectAnswers/CorrectAnswers';
import {words} from '../assets/words';

const Game = (props) => {

    const [succeesWords, setSuccesWords] = useState([]);

    return (
        <div className="Game">
            <Typing 
                started={props.started} 
                words={words} 
                difficultyLevel={props.difficultyLevel}
                setSuccesWords={setSuccesWords}
                succeesWords={succeesWords}
            />
            <CorrectAnswers 
            started={props.started}
            succeesWords={succeesWords}/> 
        </div>
    );
};

export default Game;