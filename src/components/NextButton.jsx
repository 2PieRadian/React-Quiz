export default function NextButton({ dispatch, index, noOfQuestions, answer }) {
  if (index < noOfQuestions - 1)
    return (
      <button
        className="btn"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index == noOfQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
  }
}
