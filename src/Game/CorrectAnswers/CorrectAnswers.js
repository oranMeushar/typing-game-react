import React from 'react';
import './CorrectAnswers.css';
import {Transition} from 'react-transition-group';


const CorrectAnswers = (props) => {
    return (
        <Transition in={props.started} timeout={500}>
            {(state) =>(
                <div className={`CorrectAnswers CorrectAnswers-${state}`}>
                    <h1>Correct Answers: {props.succeesWords.length}</h1>
                    <ul>
                    {props.succeesWords.map((word, idx) =>{
                        return(
                            <li key={idx}>{word}</li>
                        )
                    })}
                    </ul>
                    
                </div>
            )}
        </Transition>
    );
};

export default CorrectAnswers;