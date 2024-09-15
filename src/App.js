import './App.css';
import Dies from './components/dies'
import React from 'react';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
    } 
  }, [dice])

  function aDieRoll() {
    return {
      value: Math.floor(Math.random()*6 + 1) ,
      isHeld: false , 
      id: nanoid()
    }
  }
  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10 ; i++) {
      newDice.push( aDieRoll() )
    }

    return newDice
  }

  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map( die => {
        return die.isHeld ? die : aDieRoll() 
      })) 
    } else {
      setTenzies(false) 
      setDice(allNewDice)
    }
    
  }

  function holdDies(id) {
    setDice(oldDice => oldDice.map(die => {
      return id === die.id ? {...die, isHeld : !die.isHeld } : die
    }))
  }
  const dices = dice.map( diceObj => (
  <Dies 
  key={diceObj.id} 
  value={diceObj.value} 
  isHeld={diceObj.isHeld} 
  holdDice = {() => holdDies(diceObj.id)} 
  /> 
  ))

  return (
      <>

      {tenzies && <Confetti />}   
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        
      <main>
        <div className="dies-container">
            {dices}
        </div>
        <button className="rolldice" onClick={rollDice} >
          {tenzies ? "New Game" : "Roll"}
          </button>
      </main>
      </>
  );
}

export default App;