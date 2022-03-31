export default ({ score, highScore }) => {
  return (
    <div id='score-area'>
      <h5>Score: {score}</h5>
      <h5>High score: {highScore}</h5>
    </div>
  )
}
