import React from 'react';
import { render } from 'react-dom';

function rollTheDie (max) {
  var max = max;
  return Math.floor(1 + Math.random() * max);
}

class Button extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { random: 0 };
  }

  handleClick(max) {
    //const max = 20;
    //const rand = Math.floor(1 + Math.random() * (max));
    rollTheDie(max);
        this.setState({ random: rand })
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h3 className="text-center">Roller Heaven</h3>
          <button className="btn btn-primary" onClick={this.handleClick.bind(20)}>20</button>
          <div className="card" style={{marginTop:"10px"}}>
            <div className="card-block">
              The number is: {this.state.random}
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>10</button>
          <div className="card" style={{marginTop:"10px"}}>
            <div className="card-block">
              The number is: {this.state.random}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Screen extends React.Component {
  constructor(props) {
    super(props);
    
  }

}



render(<Button />, document.getElementById('root'));
