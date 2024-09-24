import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Die from "./components/Die.jsx"
import Stats from "./components/Stats.jsx"
import Footer from "./components/Footer.jsx"
// import Confetti from "react-confetti"
import {nanoid} from "nanoid"

function App() {  
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollCount, setRollCount] = useState(0)
  const [time, setTime] = useState(0.0)
  const [startTime, setStartTime] = useState(new Date().getTime());

  const clickSoundRef = useRef(new Audio('/click.mp3'));
  const rollSoundRef = useRef(new Audio('/roll.mp3'));
  const ringSoundRef = useRef(new Audio('/ring.mp3'));
  const shakeSoundRef = useRef(new Audio('/shake.mp3'));


  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      playRingSound();
    }
  }, [dice])

  // useEffect(() => {
  //   if (tenzies == true) {
  //     return;
  //   }
  // }, [tenzies])

  useEffect(() => {
    if (tenzies) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const elapsedTime = (now - startTime) / 1000;
      setTime(elapsedTime)
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, tenzies])

  function allNewDice() {
    return Array(10).fill(null).map(() => (
      {
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: nanoid()
      }
    ));
  }
  
  function holdDice(id) {
    if (tenzies) return;
    playClickSound();
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
  }

  function playClickSound() {
    const audio = clickSoundRef.current.cloneNode();
    audio.currentTime = 0;
    audio.play();
  }

  function playRollSound() {
    const audio = rollSoundRef.current.cloneNode();
    audio.currentTime = 0;
    audio.play();
  }

  function playRingSound() {
    const audio = ringSoundRef.current.cloneNode();
    audio.currentTime = 0;
    audio.play();
  }

  function playShakeSound() {
    const audio = shakeSoundRef.current.cloneNode();
    audio.currentTime = 0;
    audio.play();
  }

  const diceElements = dice.map(die => (
    <Die 
      value={die.value}
      isHeld={die.isHeld}
      tenzies={tenzies}
      key={die.id}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function rollDice() {
    if (dice.every(die => die.isHeld)) {
      return;
    }

    playRollSound();
    const newDice = allNewDice();
    setDice(oldDice => oldDice.map((die, index) => {
      return die.isHeld ? die : newDice[index];
    }))
    setRollCount(prevRollCount => prevRollCount + 1)
  }

  function newGame() {
    playShakeSound();
    setStartTime(new Date().getTime());
    setRollCount(0);
    setDice(allNewDice());
    setTenzies(false);
  }

  return (
    <main className="game-container">
      <div className="outer-square">
        {/* {tenzies && <Confetti />} */}
        <div className="inner-square">
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. 
            Click each die to freeze it at its 
            current value between rolls.
          </p>
          <div className="die-container">
            {diceElements}
          </div>
          {tenzies ? 
            <button className="new-button" onClick={newGame}>New Game</button>
            :
            <div className="buttons-container">
              <button className="roll-button" onClick={rollDice}>Roll</button>
              <button className="new-button" onClick={newGame}>Reset</button>
            </div>
          }
          <Stats rollCount={rollCount} time={time}/>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default App