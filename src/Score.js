import React, { Component } from 'react';
import gear from './actions';

class Game extends Component {
  constructor(props) {
    super(props);  
    // Subscribe to changes in model
    this.state = gear.init('Score', (obj) => { this.setState(obj) });
  }
  
  componentWillUnmount() {
    gear.unlink('Score');
  }  
  
  handleExit() {
    gear.endGame();
    return false;
  }
  
  render() {
    return (
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo center">Score {this.state.data.join(':')}</a>
            <ul id="nav-mobile" className="right">
              <li><a onClick={this.handleExit}>Exit</a></li>
            </ul>
          </div>
        </nav>       
    );
  }
}

export default Game;