import React, { useState, useRef } from 'react';
import { dataMusic} from './DataMusic';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import './Quiz.css';
import './index.css';


export const QuizMusic = () => {
  const navigateToHome = useNavigate();
  let [index, setIndex] = useState(0); // init useState + startpoint on first index on data component//
  let [question, setQuestion] = useState(dataMusic[index]);
  let [lock,setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [wrongAnswers, setWrongAnswers] = useState([]);


  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  let optionArray = [Option1, Option2, Option3,Option4];


  const checkAnswer = (e, ans) => {
    if (lock === false) {
      if(question.ans === ans) {
        e.target.classList.add("correct");
        setScore( prev=> prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        setWrongAnswers(prev => [...prev, question]);
    }
    setLock(true);
  }
};

const navigateToHomePage = () => {
  navigateToHome('/Homepage')
};

const nextQuestion = () => {
  if (lock ===true){
    if(index === dataMusic.length -1) {
      setResult(true);
    } else {

    setIndex(prevIndex => prevIndex + 1);
    setQuestion(dataMusic[index + 1]);
    setLock(false);
    optionArray.forEach(option => {
      if(option.current) {
      option.current.classList.remove("wrong");
      option.current.classList.remove("correct");
    }
    });
  }
}
  };


  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setResult(false);
    setWrongAnswers([ ]);
    setQuestion(dataMusic[0]);
    setLock(false);

    optionArray.forEach(optionRef => {
      if(optionRef.current) {
          optionRef.current.classList.remove("wrong");
          optionRef.current.classList.remove("correct");
      }
    });
    };

if (result) {
  return (
    <div className='quizContainer container-fluid'>   
      <h1>Music Quiz</h1>
      <hr />
      <div className='end-result'>
        <h2>Your final score: {score} out of {dataMusic.length}</h2>
      {score === dataMusic.length && wrongAnswers.length === 0 &&  (
        <>
      <Confetti />
      <div className='praise'>
        <h2>Good Job 🎉</h2>
        <button onClick={ navigateToHomePage}> Go back home</button>
        </div>
        </>
        
        )}
       
        </div>
        {wrongAnswers.length > 0 ?  (
          <>
          <h2>Questions you got wrong:</h2>
          <ul>
            {wrongAnswers.map(( answer, index) => (
              <li key={index}>{answer.question} </li>
            ))}
          </ul>
          </>
        ) : null}
      { score !== dataMusic.length && <button onClick={resetQuiz}>Reset</button>}
       
         </div>
        );
      } else {
      return (
        <div className='quizContainer container'>
        <h1> Music Quiz</h1>
        <hr/>
      <h2>{index + 1}. {question.question}</h2>
      <ul>
        <li ref={Option1} onClick={(e)=>{checkAnswer(e, 1)}}>{question.option1}</li>
        <li ref={Option2} onClick={(e)=>{checkAnswer(e, 2)}}>{question.option2}</li>
        <li ref={Option3} onClick={(e)=>{checkAnswer(e, 3)}}>{question.option3}</li>
        <li ref={Option4} onClick={(e)=>{checkAnswer(e, 4)}}>{question.option4}</li>
      </ul>
<button onClick={nextQuestion}>Next</button>
<div className='index'>{index+1} / {dataMusic.length}</div>

</div>
     );
}
};
 export default QuizMusic;