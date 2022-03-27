import React, { Component } from 'react';
import Snake from './Snake'

class App extends Component {

  state = {
    direction: 'R',
    snakeDots: [
      [0,0],
      [2,0]
    ],
    speed: 100
  }

  componentDidMount() {
    // this.moveSnake()
    setInterval(this.moveSnake, this.state.speed);
  }

  moveSnake = () => {
    let snakeDots = this.state.snakeDots
    const frontDot = snakeDots[snakeDots.length - 1]

    if (this.state.direction === 'R') {
      snakeDots.push([
        frontDot[0] + 2,
        frontDot[1]
      ])
    }

    snakeDots.shift()
    this.setState({
      snakeDots: snakeDots
    })
  }

  render() {
    return (
      <div className='game-area'>
        <Snake snakeDots = {this.state.snakeDots}/>
      </div>
    );
  }
}

export default App;
