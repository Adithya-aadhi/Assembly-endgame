import { useState } from 'react'
import './App.css'
import { languages } from './assets/lang'
import  clsx  from 'clsx'
import { randomword } from './assets/utils'
import Confetti from "react-confetti"

export default function AssemblyEndgame() {
  //state
  const [currentWord,setCurrentWord]=useState(randomword)
  const [guessed,setGuessed]=useState([])

  //derived 
  const wrongGuess=guessed.filter(letter=>!currentWord.includes(letter)).length
  const gameWon = currentWord.split("").every(letter =>guessed.includes(letter))
  const gameLost = wrongGuess >= 8
  const gameOver = gameWon || gameLost
  const lastguessed =guessed[guessed.length-1]
  const lastGuessIncorrect=lastguessed && !currentWord.includes(lastguessed)
  
  //static
  const alphabets="abcdefghijklmnopqrstuvwxyz"

  function addGuessed(letter){
      setGuessed(prev=>
        prev.includes(letter)?prev:[...prev,letter] // check if it is already guessed or not 
      )
  }

  //the keyboard 
  const keyEl=alphabets.split("").map((alph)=>{
    const isGuessed = guessed.includes(alph)
    const iscorrect = isGuessed && currentWord.includes(alph) //check with the current word i.e the word to guess 
    const iswrong = isGuessed && !currentWord.includes(alph)

    const className = clsx({
      correct : iscorrect,
      wrong : iswrong
    })
    return(
      <button 
            className={className}
            key={alph}
            disabled={gameOver}
            onClick={()=>addGuessed(alph)}>
            {alph.toUpperCase()}
      </button>
    )}
  )

  const langEl=languages.map((lang,index) =>{
    const isLost=index < wrongGuess
    const style={
      backgroundColor:lang.backgroundColor,
      color:lang.color
    }
    return(
        <span style={style} className={`chip ${isLost?"lost":""}`} 
        key={lang.name}> {lang.name}</span>)
  })

  //the letter to guess
  const letterEl=currentWord.split("").map((letter,index)=>{
    const reveal =gameLost ||guessed.includes(letter)
    return(
    <span key={index}>
      {reveal?letter.toUpperCase():""}
    </span>
    )
})
  
  function getFarewellText(langName) {
  return `Oops! You lost ${langName}`;
}

  const gameStatusClass=clsx("game-status",{
    won:gameWon,
    lost:gameLost,
    farewell: !gameOver && lastGuessIncorrect

  })
  function renderStatus(){
    if(!gameOver && lastGuessIncorrect){
      return (<p 
                className="farewell-message"
                >
              {getFarewellText(languages[wrongGuess - 1].name)}
                </p>)
    }
    if(gameWon){
      return(
        <>
          <h2>You Win!</h2>
          <p>Congrats !!</p>
        </>
      )
    }
    if(gameLost){
      return(
        <>
          <h2>You Lose!</h2>
          <p>Better luck next time!</p>
        </>
      )
    }
  }
    function newGame(){
        setCurrentWord(randomword())
        setGuessed([])
    }

  return ( 
    <main> 
      {
    gameWon && <Confetti width={window.innerWidth} height={window.innerHeight} />
}

      <header>
        <h1>Assembly Endgame</h1>
        <p>Guess the word to stfu</p>
      </header>
      <section className={gameStatusClass}>
        {renderStatus()}
      </section>
      <section className="lang-chips">
          {langEl}
      </section>
      <section className='word'>
          {letterEl}
      </section>
      <section className='keys'>
          {keyEl}
      </section>
      {gameOver && (<button className='newgame' onClick={newGame}>New game</button>)}
    </main>
  )
}
