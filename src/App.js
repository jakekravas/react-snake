import React, { Component } from 'react';
import Snake from './components/Snake'
import Food from './components/Food'

const initialState = {
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
  ],
  speed: 100,
  foodDot: [40,0]
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

    this.checkIfAte(newHead);
    this.checkIfOutOfBounds(newHead);
    this.checkIfHitItself(newHead);
  }

  checkIfAte = head => {
    if (head[0] === this.state.foodDot[0] && head[1] === this.state.foodDot[1]) {
      this.enlargeSnake();
      this.moveFood();
    }
  }

  enlargeSnake = () => {
    let dots = this.state.snakeDots;
    dots.unshift([]);
    this.setState({ snakeDots: dots });
  }

  moveFood = () => {
    const coordinate1 = (Math.floor(Math.random() * 49) + 1) * 2
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
    alert(`Game Over. Your score is ${this.state.snakeDots.length-1}`)
    this.setState({
      direction: 'RIGHT',
      snakeDots: [
        [0,0],
      ],
      speed: 100,
      foodDot: [40,0]
    })
  }

  render() {
    return (
      <div>
        <div id='score-area'>
          <h5>Score: {this.state.snakeDots.length-1}</h5>
          <h5>High score: </h5>
        </div>
        <div className='game-area'>
          <Snake snakeDots = {this.state.snakeDots}/>
          <Food dot={this.state.foodDot}/>
        </div>
      </div>
    )
  }
}

export default App;
