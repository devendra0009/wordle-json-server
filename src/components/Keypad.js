import React, { useEffect, useState } from 'react'

const Keypad = ({usedKeys}) => {
    const [letters,setLetters]=useState(null) //this will be storing a array of letter 
    useEffect(() => {
        fetch('http://localhost:8000/letters')
        .then(res=>res.json())
        .then(data=>{
          setLetters(data)})
        }, [])
    
  return (
    <div className='keypad'>
        {
            letters&& letters.map((letter,id)=>{
                        const color=usedKeys[letter.key]
                        {/* console.log(usedKeys) */}
                        {/* console.log(color) */}
                        return(
                            <div key={id} className={color}>{letter.key}</div>
                        )
                    })
                }
    </div>
  )
}

export default Keypad