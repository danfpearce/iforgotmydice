import React from 'react';
import { render } from 'react-dom';
import './index.css';

function Die(props) {
  return (
    <button className="die" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dice_arr: Array[20,12,10,8,6,4,100],
    };
  }

  handleClick(i) {
    //const dice = this.state.dice_arr.slice();
    //if (calculateWinner(squares) || squares[i]) {
      //return;
    //}
    //squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      //dice_arr: dice,
      //xIsNext: !this.state.xIsNext,
      die_num: i,
    });
    
  }

  renderDie(i) {
    //alert('die num is: ' +i);
    return (
      <Die
        value={this.state.i}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    //const winner = calculateWinner(this.state.squares);
    let result;
    
    //if (winner) {
      //status = 'Winner: ' + winner;
    //} else {
      //status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      result =  Math.floor(1 + (Math.random() * (this.state.die_num)));
      //status = 'Random number:' + rand;
    //}

    return (
      <div>
        <div className="result">{result}</div>
        <div className="board-row">
        {this.renderDie(20)}
        </div>
      </div>
    );
  }

}

/* class Die extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { random: 0 };
  }

  handleClick() {
    const max = 20;
    const rand = Math.floor(1 + Math.random() * (max));
    this.setState({ random: rand })
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h3 className="text-center">Roller Heaven</h3>
          <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>20</button>
          <div className="card" style={{marginTop:"10px"}}>
            <div className="card-block">
              The number is: {this.state.random}
            </div>
          </div>
        </div>
      </div>
    );
  }
} */

render(<Screen />, document.getElementById('root'));
