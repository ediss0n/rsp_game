import React, { Component } from 'react';
import gear from './actions';

class Welcome extends Component {
  
  constructor(props) {
    super(props);
    this.handleP2C = this.handleP2C.bind(this);
    this.handleC2C = this.handleC2C.bind(this);
  }
  
  handleP2C(event) {
    gear.startGamePlayer2Comp();
    return false;
  }
  
  handleC2C(event) {
    gear.startGameComp2Comp();
    return false;
  }
  
  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <span className="card-title">Welcome the Game!</span>
                  <p>
                      You have to choose from Rock Scissors or Paper, but remember that Scissors beats Paper, 
                      Paper beats Rock, but Rock beats Scissors!
                      Good luck!
                  </p>
                </div>
                <div className="card-action">
                  <a href="#" className="left-align" onClick={this.handleP2C}>Player vs Computer</a>
                  <a href="#" className="right-align" onClick={this.handleC2C}>Computer vs Computer</a>
                </div>
              </div>
            </div>
          </div>
        </div>
     );
  }
}

export default Welcome;