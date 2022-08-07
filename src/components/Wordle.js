import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'

const Wordle = ({solution}) => {
    //currGuess->jp abhi guess kia hai; handleKeyup->keys dbane m ky kre; guesses->prevGuesses+currGuess ka array; isCorrect->ky correct hai word; turn->konsi bajji chlri hai
    const {currentGuess,handleKeyup, guesses, isCorrect,usedKeys,turn}=useWordle(solution)
    
    //handling whatever user is typing and passing it to handleKeyup so as to render it 
    useEffect(() => {
        //console.log(guesses,isCorrect, turn);
      window.addEventListener('keyup',handleKeyup)  //whenver key ios pressed pass that button to handlekeyup which will make changes and add some filters
    
      if(isCorrect)
      {
        alert('Congrats you win!!')
        window.removeEventListener('keyup',handleKeyup)
      }
      if(turn>5&&!isCorrect)
      {
        alert('Out of Guess, Play Again!!')
      }
      return () => window.removeEventListener('keyup',handleKeyup)
      // eslint-disable-next-line
    }, [handleKeyup,isCorrect,turn])
    // console.log(usedKeys);
  return (
    <div>
    Your Guess : {currentGuess}
    <br />
    Your Solution: {solution.word}
    <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
    {/* <Keypad usedKeys={usedKeys} /> */}
    </div>
  )
}

export default Wordle