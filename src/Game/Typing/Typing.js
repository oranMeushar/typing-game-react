import React, {useState, useEffect} from 'react';
import './Typing.css';
import {Transition} from 'react-transition-group';

const Typing = (props) => {
    const [currentWord, setCurrentWord] = useState(props.words[Math.floor(Math.random() * props.words.length)]);
    const [userInput, setUserInput] = useState('');
    const [counter, setCounter] = useState(11);
    const [newBarThreshold, setNewBarThreshold] = useState(11)
    const inputRef = React.useRef();
    const timerRef = React.useRef();
    
    useEffect(() =>{
        let interval = null;
        if (props.started && counter >= 0) {
            inputRef.current.focus();
            interval = setInterval(() =>{
                setCounter((counter) => --counter);
                    if (counter === 0) {
                        clearInterval(interval);
                        setCounter('Game Over')
                    }
            }, 1000)
        }
        timerRef.current.style.width = `${(counter / newBarThreshold * 100)}%`
        return ()=> clearInterval(interval)

    },[counter, props.started])


    useEffect(() =>{
        if (userInput && userInput.toLocaleLowerCase() === currentWord.toLocaleLowerCase()) {
            setUserInput('');
            setCurrentWord(props.words[Math.floor(Math.random() * props.words.length)]);
            props.setSuccesWords([...props.succeesWords, userInput]);

            switch (props.difficultyLevel) {
                case 'easy':
                    setCounter((counter)=> counter + 5);
                    if (counter + 5 > newBarThreshold) {
                        setNewBarThreshold((counter)=> counter + 5)
                    }
                    break;
                case 'medium':
                    setCounter((counter)=> counter + 3);
                    if (counter + 3 > newBarThreshold) {
                        setNewBarThreshold((counter)=> counter + 3)
                    }
                    break;
                case 'hard':
                    setCounter((counter)=> counter + 2);
                    if (counter + 2 > newBarThreshold) {
                        setNewBarThreshold((counter)=> counter + 2)
                    }
                    break;
            
                default:
                    break;
            }
        }
    },[userInput])


    const handleInputChange = (e) => {
        e.preventDefault();
        setUserInput(e.target.value);
    }
    return (
        <Transition in={props.started} timeout={500}>
            {(state) =>(
                <div className={`Typing Typing-${state}`}>
                    <Transition in={props.started} timeout={700}>
                        {(state) => (
                            <div className={`board board-${state}`}>
                            <h1 className="board-header">{currentWord}</h1>
                            <div className="timer-container">
                                <div className="timer-border-empty">
                                    <div className="timer-border-full" ref={timerRef}></div>
                                </div>
                                <h2>{counter}</h2>
                            </div>
                            <form className="board-footer" onSubmit={handleInputChange}>
                                <input 
                                    type="text"
                                    placeholder="Type Here..."
                                    value={userInput}
                                    onChange={handleInputChange}
                                    disabled={counter ==='Game Over' } 
                                    ref={inputRef}/>
                            </form>
                        </div>
                        )}
                    </Transition>
                    
                </div>
            )}
        </Transition>
    );
};

export default Typing;