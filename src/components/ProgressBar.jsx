export default function ProgressBar({
  index,
  noOfQuestions,
  points,
  maxEarnablePoints,
  answer,
}) {
  return (
    <div className="progress">
      <progress
        max={noOfQuestions}
        value={answer == null ? index : index + 1}
      ></progress>

      <p>
        Question <strong>{index + 1}</strong> / {noOfQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxEarnablePoints}
      </p>
    </div>
  );
}
