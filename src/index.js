import React from 'react';
import { render } from 'react-dom';
import './index.css';

// TODO: prettify stats-right
// TODO: Make high rolls (crit) turn a different color
// TODO: reset button resets but does not reload the page

class Results extends React.Component {
  render() {
    return (
      <div className="results clearfix">
        {this.props.array.length === 0 &&
        <Intro />
        }
      <ul>
        {this.props.array.map((value, index) => {
        return <li className="result" key={index}>{value}</li>
        })}
    </ul>
    </div>
    );
  }
}

class Stats extends React.Component {
  render() {
    if (this.props.rolls === 0) {
      return (
        <div className="stats"></div>
      );
    } else if (this.props.dice_type === 20 && this.props.rolls === 2 ) {
    return (
      <div className="stats">
      <div className="stats-left">
        <div className="rolls">{this.props.rolls}d{this.props.dice_type}</div>
      </div>
      <ul className="stats-right">
        <li>{this.props.high} Advantage</li>
        <li>{this.props.low} Disadvantage</li>
      </ul>
    </div>
    );
    } else {
      return (
        <div className="stats">
        <div className="stats-left">
          <div className="rolls">{this.props.rolls}d{this.props.dice_type}</div>
        </div>
        <ul className="stats-right">
          <li>Total: {this.props.total}</li>
          <li>{this.props.half} Resistance</li>
        </ul>
      </div>
      );
      }
  }
}


function Intro(props) {
  return (
    <div className="intro">Click on the number buttons above to roll that die. <br/><br/>Selecting the same die rolls it multiple times.</div>
  );
}

function Die(props) {
  return (
    <button className="die button" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result_arr: Array(0),
      rolls: 0,
      dice_type: 0,
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

  reset() {
    this.setState ({
      result_arr: Array(0),
      dice_type: 0,
      total: 0,
      half: 0,
      high: 0,
      low: 0,
      mean: 0,
      rolls: 0,
    });
  }

  renderReset() {
    return (
      <button className="button reset_btn" onClick={() => this.reset()}>
      Reset
    </button>
    )
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
    // what dice can they roll?
    let dice_arr = [20,12,10,8,6,4];
    // TODO: make the reset button reset within the app instead of reloading the page

    return (
      <div className="screen">
        <div className="nav-left">
          <ul>
            {dice_arr.map((value, index) => {
              return <li key={index}>{this.renderDie(value)}</li>})}
          </ul>
        </div>
        <div className="nav-right">
          {this.renderReset()}
        </div>

      <Results array={this.state.result_arr}></Results>

      <Stats total={this.state.total} half={this.state.half} dice_type={this.state.dice_type} rolls={this.state.rolls} high={this.state.high} low={this.state.low}></Stats>
     
    </div>
    );
  }
}

render(<Screen />, document.getElementById('root'));
