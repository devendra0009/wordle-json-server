import React from 'react'
import Row from './Row'

const Grid = ({currentGuess,guesses,turn}) => {
  return (
    <div>
        {
            guesses.map((g,i)=>{
              if(turn===i)
              {
                {/* {console.log(currentGuess)} */}
                return <Row key={i} guess={g} currentGuess={currentGuess}/> //this will handle the cuurent row in which we are at
              }
                return <Row key={i} guess={g} />  //since guess array already made of size 6, hence it will make 6 rows
                //this row handles the prev and next rows excluding curr guess
            })
        }
    </div>
  )
}

export default Grid