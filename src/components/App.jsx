import { useEffect } from 'react'
import { useReducer } from 'react'

import Header from './Header'
import Home from './Home'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import ProgressBar from './ProgressBar'
import FinishedScreen from './FinishedScreen'
import ResetButton from './ResetButton'
import questionsData from '../data/JsonData'

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0
}

function reducer (state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      }
    case 'start':
      return {
        ...state,
        status: 'active'
      }
    case 'newAnswer':
      const question = state.questions[state.index]
      const pointsToBeAdded =
        question.correctOption == action.payload ? question.points : 0

      return {
        ...state,
        answer: action.payload,
        points: state.points + pointsToBeAdded
      }
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore
      }
    case 'reset':
      return { ...state, status: 'ready', index: 0, answer: null, points: 0 }
    default:
      throw new Error('Action Unknown')
  }
}

export default function App () {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'dataReceived', payload: questionsData })
  }, [])

  const noOfQuestions = questions.length
  const maxEarnablePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  )

  return (
    <div className='app'>
      <Header />

      <Home>
        {status == 'loading' && <Loader />}
        {status == 'error' && <Error />}
        {status == 'ready' && (
          <StartScreen noOfQuestions={noOfQuestions} dispatch={dispatch} />
        )}
        {status == 'active' && (
          <>
            <ProgressBar
              points={points}
              noOfQuestions={noOfQuestions}
              index={index}
              maxEarnablePoints={maxEarnablePoints}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            {answer != null ? (
              <NextButton
                dispatch={dispatch}
                index={index}
                noOfQuestions={noOfQuestions}
                answer={answer}
              />
            ) : (
              ''
            )}
          </>
        )}
        {status == 'finished' && (
          <>
            <FinishedScreen
              points={points}
              maxEarnablePoints={maxEarnablePoints}
              highscore={highscore}
            />
            <ResetButton dispatch={dispatch} />
          </>
        )}
      </Home>
    </div>
  )
}
