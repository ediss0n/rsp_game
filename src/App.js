import React, { Component } from 'react';
import Welcome from './Welcome';
import Game from './Game';
import './App.css';
import gear from './actions';

class App extends Component {
  constructor() {
    super();
    // Subscribe to changes in model
    this.state = gear.init('App', (obj) => { this.setState(obj) });
  }
  
  componentWillUnmount() {
    gear.unlink('App');
  }  
 
  render() {
    return (
      this.state.game_status ? <Game/> : <Welcome/>
    );
  }
}

export default App;
