export default function FinishedScreen({
  points,
  maxEarnablePoints,
  highscore,
}) {
  const percent = (points / maxEarnablePoints) * 100;
  return (
    <>
      <p className="result">
        You scored {points} out of {maxEarnablePoints} ({Math.round(percent)}%)
      </p>

      <p className="highscore">Highscore: {highscore} points</p>
    </>
  );
}
