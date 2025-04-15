export default function StartScreen ({ noOfQuestions, dispatch }) {
  return (
    <div className='start'>
      <h3>{noOfQuestions} questions to test your React mastery</h3>
      <button className='btn' onClick={() => dispatch({ type: 'start' })}>
        Let's Start
      </button>
    </div>
  )
}
