import React from 'react';
import { render } from 'react-dom';
import './index.css';

function Die(props) {
  return (
    <button class="die" onClick={props.onClick}>
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
    // if we're switching to a different dice, start recording
    // the new rolls and forget the old ones
    let _result_arr;
    //console.log('sides paassed: ' + sides + ' dice type saved: ' +this.state.dice_type);
    if (sides !== this.state.dice_type) {
      _result_arr = new Array(0);
    } else {
      _result_arr = this.state.result_arr;
    }
    let result =  Math.floor(1 + (Math.random() * (sides)));
    _result_arr.push(result);

    let _sum = _result_arr.reduce((previous, current) => current += previous);
    let _half = Math.floor(_sum / 2);
    this.setState({
      result_arr: _result_arr,
      dice_type: sides,
      total: _sum,
      half: _half,
      high: Math.max.apply(null, _result_arr),
      low: Math.min.apply(null, _result_arr),
      mean: Math.round(_sum / _result_arr.length),
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
    // what dice can they roll?
    let dice_arr = [20,12,10,8,6,4,100];

    return (
      <div className="screen">
        <div className="nav">
          <ul>
            {dice_arr.map((value, index) => {
              return <li>{this.renderDie(value)}</li>})}
            <li><a className="die" id="reset_btn" href="/">Reset</a></li>
          </ul>
        </div>

        <div className="results clearfix">
          <ul>
            {this.state.result_arr.map((value, index) => {
            return <li className="result" key={index}>{value}</li>
            })}
        </ul>
       </div>

      <div className="stats">
        <ul>
          <li className="rolls">{this.state.rolls}d{this.state.dice_type}</li>
          <li>Total: {this.state.total}</li>
          <li>With Resistance: {this.state.half}</li>
          {this.state.dice_type === 20 && this.state.rolls === 2 &&
            <li>With Advantage: {this.state.high}</li>
          }
          {this.state.dice_type === 20 && this.state.rolls ===2 &&
            <li>With Disadvantage: {this.state.low}</li>  
          }
        </ul>
      </div>
    </div>
    );
  }

}

render(<Screen />, document.getElementById('root'));
