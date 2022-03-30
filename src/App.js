import React, { Component } from 'react';
import Snake from './Snake'

class App extends Component {

  state = {
    direction: 'RIGHT',
    snakeDots: [
      [0,0],
      [2,0]
    ],
    speed: 100
  };

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
  }

  render() {
    return (
      <div className='game-area'>
        <Snake snakeDots = {this.state.snakeDots}/>
      </div>
    )
  }
}

export default App;
