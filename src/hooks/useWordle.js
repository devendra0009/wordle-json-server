//Here main wordle code written

import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0); //mtlb konsi turn hai 6me se agr turn khtm to gameover
  const [currentGuess, setCurrentGuess] = useState(""); //abhi ky string guess kia
  const [guesses, setGuesses] = useState([...Array(6)]); // jo bhi mre guess hoge unhe is 6length k array me setkrte rhna hai
  const [history, setHistory] = useState([]); //past guesses store krne hai users k, we can also check here if user gives the same string again
  const [isCorrect, setIsCorrect] = useState(false); //ky full string match hogyi solution se ?
  const [usedKeys, setUsedKeys] = useState({}); // {a: 'grey', b: 'green', c: 'yellow'} to keep tract of the used keys color


    /****handle keyup event & track current guess***/
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    //handling when user wants to handle his gues
    if (key === "Enter") {
      //we want to submit only when these conditions satisfies:-
      //the turn should be less than 5
      if (turn > 5) {
        alert("Your Turns Over");
        return;
      }
      //the entered word must not be present previously
      if (history.includes(currentGuess)) {
        alert("This word previously typed");
        return;
      }
      //word must contain 5chars
      if (currentGuess.length !== 5) {
        alert("Word must contain 5chars");
        return;
      }

      //on checking all the conditions just format the gueess
      const formattedGuess = formatGuess(); //no need to pass currentGuess because it is here only
      addNewGuess(formattedGuess)
    }

    //what when backspace pressed
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));  //this prev is basically whatever is stored in currentGuess
    }

    // //console.log(key);  //this gonna obviously show the keys pressed
    //but we dont't want to show keys like shift, backspace, or esa
    //Hence we are using regex(regular expression). Below is the syntax for that:
    if (/^[A-Za-z]$/.test(key)) {
      //this if block only gets executed whenever a user type a char btw the given range
      if (currentGuess.length < 5) {
        //Also the length of guess should be less than 5(starting from 0 ;)
        setCurrentGuess((prev) => {
          //now we will be adding the current key to prev guess string
          return prev + key;
        });
      }
    }
  };


  /***format a guess into an array of letter objects ***/
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    //our main motive is to compare the solution letters with the current Guess letter and format those letters into some color depending on whther it is right or not
    //spreadin the solution array into letters
    // //console.log(solution);
    let curSolution = [...solution.word];
    //spreading the current Guess into letters
    let curGuess = [...currentGuess].map((letter) => {
      return { val: letter, color: "grey" }; //by default these properties are there
    });
    //if any green key found means our curGuess's key has the same index as that of curSolution
    //so we need to iterate through my curGuess and check whichever letter is at same position as that in cursolution we will pass it to green
    curGuess.forEach((letter, i) => {
      if (solution.word[i] === letter.val) {
        curGuess[i].color = "green";
        curSolution[i] = null; //so as to avoid cases like this-> solution: plane , curGuess: piped. So it will make green for both the p's if this condn. not included
      }
    });
    //checking for yellow key
    curGuess.forEach((letter, i) => {
      if (letter.color !== "green" && curSolution.includes(letter.val)) {
        curGuess[i].color = "yellow";
        curSolution[curSolution.indexOf(letter.val)] = null; //from here we have to search for the yellow index in the solution array and nullify it, to tackle cases like this-> solution: piped, curGuess: plane. First p will become green by green condition and then it will be overwritten to yellow
      }
    });
    return curGuess;
  };

  /***add a new guess to the guesses state***/
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  //add the formatted guess here
  const addNewGuess = (formattedGuess) => {
    // //console.log('in the add guess',formattedGuess,solution.word);
    if(currentGuess===solution.word)
    {
        setIsCorrect(true); 
        //console.log('You won');
    }

    //new syntax :O
    setGuesses((prevGuesses)=>{
        let newGuesses=[...prevGuesses]  //making a arrray to store guesses
        newGuesses[turn]=formattedGuess
        return newGuesses  //means guesses array me ab ye set hojaega
    })
    setHistory((prevHistory)=>{
        return [...prevHistory,currentGuess]  //we will set jo bhi history m pda hai and jo hmne guess kia hai currently use or ad krdege, and set the history array with this brand new updated array :)
    })
    setTurn(turn+1)


    setUsedKeys(prevUsedKeys=>{
      console.log(formattedGuess);
      console.log(prevUsedKeys);
      // console.log(prevUsedKeys.key);
      // let newKeys={...prevUsedKeys} //get the prevUsedKeys here and cycle through this to know their color
      formattedGuess.forEach(l=>{
        //formattedGuess was giving us our guess with the right coloring on it
        const currColor=prevUsedKeys[l.key]  //extracting the color of our first guessed word letter and pasting it in the keypad accordingly
        // console.log(newKeys);
        // console.log(currColor);
        if(l.color==='green')  //agr guessed letter green color ka hai to keypad k key ka color bhi green krde
        {
          prevUsedKeys[l.key]= 'green'  //ye lo ji, keypad k l.key pr ja or usko green assign krde so that it can be used as a class
          return
        }
        else if(l.color==='yellow' && currColor!=='green')
        {
          prevUsedKeys[l.key]='yellow'
          return
        }
        else if(l.color==='grey' && currColor !== ('green' || 'yellow'))
        {
          prevUsedKeys[l.key]="grey"
          return
        }

      })
      return  prevUsedKeys
    })

    setCurrentGuess('')
  };

// console.log(usedKeys);
  //sare functions pass krdie jise jo use krna h just destucture it
  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
