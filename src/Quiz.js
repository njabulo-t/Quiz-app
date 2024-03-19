import React, { useState, useRef } from 'react';
import { data } from './Data';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import './Quiz.css';
import './index.css';

export const Quiz = () => {
  const navigateToHome = useNavigate();
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);
  const optionArray = [Option1, Option2, Option3, Option4];

  const checkAnswer = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        setWrongAnswers(prev => [...prev, question]);
      }
      setLock(true);
    }
  };

  const navigateToHomePage = () => {
    navigateToHome('/Homepage');
  };

  const nextQuestion = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
      } else {
        setIndex(prevIndex => prevIndex + 1);
        setQuestion(data[index + 1]);
        setLock(false);
        optionArray.forEach(option => {
          if (option.current) {
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
    setWrongAnswers([]);
    setQuestion(data[0]);
    setLock(false);

    optionArray.forEach(optionRef => {
      if (optionRef.current) {
        optionRef.current.classList.remove("wrong");
        optionRef.current.classList.remove("correct");
      }
    });
  };

  return (
    <div className='quizContainer container'>
      <div className='row justify-content-center'>
        <div className='col-lg-8 col-md-10 col-sm-12'>
          <h1>Art Quiz</h1>
          <hr />
          {result ? (
            <div className='end-result'>
              <h2>Your final score: {score} out of {data.length}</h2>
              {score === data.length && wrongAnswers.length === 0 && (
                <>
                  <Confetti />
                  <div className='praise'>
                    <h2>Good Job 🎉</h2>
                    <button onClick={navigateToHomePage}>Go back home</button>
                  </div>
                </>
              )}
              {wrongAnswers.length > 0 && (
                <>
                  <h2>Questions you got wrong:</h2>
                  <ul>
                    {wrongAnswers.map((answer, index) => (
                      <li key={index}>{answer.question}</li>
                    ))}
                  </ul>
                </>
              )}
              {score !== data.length && <button onClick={resetQuiz}>Reset</button>}
            </div>
          ) : (
            <>
              <h2>{index + 1}. {question.question}</h2>
              <ul>
                <li ref={Option1} onClick={(e) => checkAnswer(e, 1)}>{question.option1}</li>
                <li ref={Option2} onClick={(e) => checkAnswer(e, 2)}>{question.option2}</li>
                <li ref={Option3} onClick={(e) => checkAnswer(e, 3)}>{question.option3}</li>
                <li ref={Option4} onClick={(e) => checkAnswer(e, 4)}>{question.option4}</li>
              </ul>
              <button onClick={nextQuestion}>Next</button>
              <div className='index'>{index + 1} / {data.length}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
