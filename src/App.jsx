import { useState } from 'react'
import './App.css'
import { languages } from './assets/lang'
import  clsx  from 'clsx'


export default function AssemblyEndgame() {
  const [currentWord,setCurrentWord]=useState("react")
  const alphabets="abcdefghijklmnopqrstuvwxyz"

  const [guessed,setGuessed]=useState([])
  console.log(guessed)

  function addGuessed(letter){
      setGuessed(prev=>
        prev.includes(letter)?prev:[...prev,letter]
      )
  }

  const keyEl=alphabets.split("").map((alph)=>{
    const isGuessed = guessed.includes(alph)
    const iscorrect = isGuessed && currentWord.includes(alph)
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

  const langEl=languages.map(lang =>{
    const style={
      backgroundColor:lang.backgroundColor,
      color:lang.color
    }
    return(
    <span style={style} className='chip' 
    key={lang.name}> {lang.name}</span>)
  })

  //the keyboard
  const letterEl=currentWord.split("").map((letter,index)=>(
    <span key={index}>{guessed.includes(letter)?letter.toUpperCase():""}</span>
  ))


  return ( 
    <main> 
      <header>
        <h1>Assembly Endgame</h1>
        <p>Guess the word to stfu</p>
      </header>
      <section className="game-status">  
         <h2>You win</h2>
         <p>Congrats !!</p>
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
      <button className='newgame'>New game</button>
    </main>
  )
}
