import { useState } from 'react'
import './App.css'
import { languages } from './assets/lang'
import  clsx  from 'clsx'


export default function AssemblyEndgame() {
  //state
  const [currentWord,setCurrentWord]=useState("react")
  const [guessed,setGuessed]=useState([])

  //derived 
  const wrongGuess=guessed.filter(letter=>!currentWord.includes(letter)).length
  const gameWon = currentWord.split("").every(letter =>guessed.includes(letter))
  const gameLost = wrongGuess >= 8
  const gameOver = gameWon || gameLost

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
  const letterEl=currentWord.split("").map((letter,index)=>(
    <span key={index}>{guessed.includes(letter)?letter.toUpperCase():""}</span>
  ))


  return ( 
    <main> 
      <header>
        <h1>Assembly Endgame</h1>
        <p>Guess the word to stfu</p>
      </header>
      <section className={clsx("game-status",{
        "win":gameWon,
        "lose":gameLost
      })}>  
         {gameWon && (
            <>
              <h2>You Win!</h2>
              <p>Congrats !!</p>
            </>
        )}
          {gameLost && (
            <>
              <h2>You Lose!</h2>
              <p>Better luck next time!</p>
            </>
          )}
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
      {gameOver && (<button className='newgame'>New game</button>)}
    </main>
  )
}
