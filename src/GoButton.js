import React, { Component } from 'react';
import gear from './actions';

class GoButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      started: 0,
      count: 5
    };
    this.handleHit = this.handleHit.bind(this);
    this.update = this.update.bind(this);
  }
  
  handleHit(event) {
    // ignore all if alredy hit
    if (this.state.started)
      return false;
    gear.startRound();
    this.setState({ started: 1 });
    setTimeout(this.update, 1000);
    return false;
  }
  
  update() {
    this.setState({ count: this.state.count-1 });
    // for progress bar
    gear.updateRound(Math.round(this.state.count/5*100));
    if (this.state.count > 0 && this.props.goon) {
      setTimeout(this.update, 1000);
    }
    else {
      this.setState({
        started: 0,
        count: 5       
      });
      if (this.props.goon)
        gear.timeEnded();
    }
  }
  
  render() {
    return (
      <div className="right-align">   
        <a className="btn-floating btn-large red waves-effect waves-light" onClick={this.handleHit}>
          {!this.state.started ? 'Go!' : this.state.count}
        </a>
      </div>               
    );
  }
}

export default GoButton;