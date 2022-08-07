import React from 'react'

const Row = ({guess,currentGuess}) => {

    if(guess)
    {
        // console.log(guess);
        return(
            <div className="row past">
            {guess.map((letter,i)=>(
                <div key={i} className={letter.color}>{letter.val}</div>
            ))}
            </div>
        )
    }
    if(currentGuess)  //agr currentGuess jse hi enter hona start hoga to hme 
    {
      //currentGuess string ko split krdega or ek array me convert krdega ***IMP
      let letters=currentGuess.split('') 
      return(
        <div className="row current">
          {
            letters.map((letter,i)=>(
              <div key={i} className="filled">{letter}</div> //this is the box currently we are filling
            ))
          }
          
        {
          [...Array(5-letters.length)].map((_,i)=>(
            <div key={i}></div> //this shows the remaining boxes 
          ))
        }
        </div>
      )
    }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Row