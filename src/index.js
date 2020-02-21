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
      //dice_arr: Array[20,12,10,8,6,4,100],
      result_arr: new Array(),
      dice_type: 0,
      high: 0,
      low: 0,
      mean: 0,
      half: 0,
    };
  }

  handleClick(sides) {
    //alert('Dice type:' + this.state.dice_type)
    //if we're switching to a different dice, start recording
    //the new rolls and forget the old ones
    if (sides != this.state.dice_type) {
      this.state.result_arr = new Array();
    }
    this.state.dice_type = sides;
    //const dice = this.state.dice_arr.slice();
    //if (calculateWinner(squares) || squares[i]) {
      //return;
    //}
    //squares[i] = this.state.xIsNext ? 'X' : 'O';
    let result;
    result =  Math.floor(1 + (Math.random() * (sides)));
    this.state.result_arr.push(result);

    //this.state.high = Math.max.apply(null, this.state.result_arr);
    //this.state.low = Math.min.apply(null, this.state.result_arr);
    let sum = this.state.result_arr.reduce((previous, current) => current += previous);
    //this.state.mean = Math.round(sum / this.state.result_arr.length);
    this.setState({
      high: Math.max.apply(null, this.state.result_arr),
      low: Math.min.apply(null, this.state.result_arr),
      mean: Math.round(sum / this.state.result_arr.length),
      //dice_arr: dice,
      //xIsNext: !this.state.xIsNext,
      //die_num: sides,
      //result_arr: new Array(2,3,4),
    });
    
  }

  renderDie(sides) {
    //alert('die num is: ' +i);
    return (
      <Die
        value={sides}
        onClick={() => this.handleClick(sides)}
      />
    );
  }

  render() {
    //const winner = calculateWinner(this.state.squares);
   // let result;
    //result = this.state.result; 
    //let rolls;
    
    //if (winner) {
      //status = 'Winner: ' + winner;
    //} else {
      //status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      
      //rolls = 'Result array:' + (this.state.result_arr);
      //result_arr = 999;

      //status = 'Random number:' + rand;
    //}

    return (
      <div>
        <div className="board-row">
        {this.renderDie(20)}
        {this.renderDie(12)}
        {this.renderDie(10)}
        {this.renderDie(8)}
        {this.renderDie(6)}
        {this.renderDie(4)}
        {this.renderDie(3)}
        {this.renderDie(100)}
        </div>

        <ul>
          {this.state.result_arr.map((value, index) => {
           return <li key={index}>{value}</li>
           })}
       </ul>
           <div>High: {this.state.high}</div>
           <div>Low: {this.state.low}</div>
           <div>Average: {this.state.mean}</div>
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
