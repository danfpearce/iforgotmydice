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
      result_arr: Array(0),
    };
  }

  handleClick(sides) {
    //if we're switching to a different dice, start recording
    //the new rolls and forget the old ones
    let _result_arr;
    console.log('sides paassed: ' + sides + ' dice type saved: ' +this.state.dice_type);
    if (sides !== this.state.dice_type) {
      _result_arr = new Array(0);
    } else {
      _result_arr = this.state.result_arr;
    }
    let result =  Math.floor(1 + (Math.random() * (sides)));
    _result_arr.push(result);

    let sum = _result_arr.reduce((previous, current) => current += previous);
    let half = Math.floor(sum / 2);
    this.setState({
      result_arr: _result_arr,
      dice_type: sides,
      total: sum,
      half: half,
      high: Math.max.apply(null, _result_arr),
      low: Math.min.apply(null, _result_arr),
      mean: Math.round(sum / _result_arr.length),
      rolls: _result_arr.length,
    });
    
  }

  renderDie(sides) {
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
        {this.renderDie(100)}
        </div>

        <ul>
          {this.state.result_arr.map((value, index) => {
           return <li key={index}>{value}</li>
           })}
       </ul>
       <div>Rolls: {this.state.rolls}</div>
       <div>Total: {this.state.total}</div>
       <div>Half: {this.state.half}</div>
       {this.state.dice_type === 20 &&
         <div>High: {this.state.high}</div>
       }
       {this.state.dice_type === 20 &&
          <div>Low: {this.state.low}</div>  
       }
       <div>Average: {this.state.mean}</div>
      </div>
    );
  }

}

render(<Screen />, document.getElementById('root'));
