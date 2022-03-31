import React, { Component } from 'react';
import Snake from './components/Snake'
import Food from './components/Food'
import Score from './components/Score'

const initialState = {
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
  ],
  speed: 100,
  foodDot: [40,0],
  score: 0,
  highScore: localStorage.getItem('highScore') ? localStorage.getItem('highScore') : 0
}

class App extends Component {

  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.handleKeyPress;
  };

  handleKeyPress = e => {

    // handle direction change
    switch (e.keyCode) {

      // change direction to left
      case 37:
        if (this.state.direction !== 'RIGHT') {
          this.setState({ direction: 'LEFT' });
        }
        break;

      // change direction to right
      case 39:
        if (this.state.direction !== 'LEFT') {
          this.setState({ direction: 'RIGHT' });
        }
        break;

      // change direction to up
      case 38:
        if (this.state.direction !== 'DOWN') {
          this.setState({ direction: 'UP' });
        }
        break;

      // change direction to down
      case 40:
        if (this.state.direction !== 'UP') {
          this.setState({ direction: 'DOWN' });
        }
        break;
    }
  }

  moveSnake = () => {
    let snakeDots = this.state.snakeDots;
    const oldHead = snakeDots[snakeDots.length - 1];
    let newHead;
    switch (this.state.direction){
      case 'LEFT':
        newHead = [oldHead[0] - 2, oldHead[1]]
        break
      case 'RIGHT':
        newHead = [oldHead[0] + 2, oldHead[1]]
        break
      case 'UP':
        newHead = [oldHead[0], oldHead[1] - 2]
        break
      case 'DOWN':
        newHead = [oldHead[0], oldHead[1] + 2]
        break
    };
    
    // remove back dot of snake
    snakeDots.shift();

    // update head of snake
    snakeDots.push(newHead);

    // update this.state.snakeDots with new snake
    this.setState({
      snakeDots: snakeDots
    });

    // check if food has been eaten
    this.checkIfAte(newHead);

    // check if snake is out of bounds
    this.checkIfOutOfBounds(newHead);

    // check if snake has collided with itself
    this.checkIfHitItself(newHead);
  }

  checkIfAte = head => {
    if (head[0] === this.state.foodDot[0] && head[1] === this.state.foodDot[1]) {
      
      // make snake bigger
      this.enlargeSnake();
      // move food to random location
      this.moveFood();

      this.setState({ score: this.state.score+1 })
    }
  }

  enlargeSnake = () => {
    let dots = this.state.snakeDots;
    dots.unshift([]);
    this.setState({ snakeDots: dots });
  }

  moveFood = () => {
    // get random horizontal placement
    const coordinate1 = (Math.floor(Math.random() * 49) + 1) * 2
    // get random vertical placement
    const coordinate2 = (Math.floor(Math.random() * 49) + 1) * 2

    this.setState({ foodDot: [ coordinate1, coordinate2 ] })
  }

  checkIfOutOfBounds = head => {
    if (
      head[0] < 0 || head[0] >= 100 ||
      head[1] < 0 || head[1] >= 100
    ) {
      this.gameOver()
    }
  }

  checkIfHitItself = head => {
    const headString = head.toString()
    let dotsToCheck = this.state.snakeDots
    for (let i = 0; i < dotsToCheck.length-1; i++) {
      if (headString === dotsToCheck[i].toString()) {
        this.gameOver()
      }
    }
  }

  gameOver = () => {

    // check for high score
    this.checkHighScore()

    // alert user that the game is over and display their score
    alert(`Game Over. Your score is ${this.state.snakeDots.length-1}`)

    // reset state
    this.setState({
      direction: 'RIGHT',
      snakeDots: [
        [0,0],
      ],
      speed: 100,
      foodDot: [40,0],
      score: 0,
      highScore: localStorage.getItem('highScore') ? localStorage.getItem('highScore') : 0
    })
  }

  checkHighScore = () => {
    if (this.state.score > this.state.highScore) {
      localStorage.setItem('highScore', this.state.score)
    }
  }

  render() {
    return (
      <div>
        <Score score={this.state.score} highScore={this.state.highScore}/>
        <div className='game-area'>
          <Snake snakeDots = {this.state.snakeDots}/>
          <Food dot={this.state.foodDot}/>
        </div>
      </div>
    )
  }
}

export default App;
