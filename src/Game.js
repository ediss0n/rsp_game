import React, { Component } from 'react';
import Score from './Score';
import IconCard from './IconCard';
import WeaponButton from './WeaponButton';
import GoButton from './GoButton';
import gear from './actions';


class Game extends Component {
  constructor(props) {
    super(props);   
    // Subscribe to changes in model
    this.state = gear.init('Game', (obj) => { this.setState(obj) });
    this.items = gear.getItems();
    gear.load_score();
  }
  
  componentWillUnmount() {
    gear.unlink('Game');
  }
  
  render() {
    return (
      <div>
      <div className="container"> 
        <Score/>   
      
        <div className="row">
          <div className="col s12 m6 left-align">
            <IconCard type={this.state.game_type === 0 ? 'Player' : 'Computer'} icon={this.state.first_current !== '' ? this.items[this.state.first_current].icon : ''} />
          </div>
          <div className="col s12 m6 right-align">
            <IconCard type='Computer' icon={this.state.second_current !== '' ? this.items[this.state.second_current].icon : ''} />        
          </div>
        </div>
      </div>

      <div className="container">
        {this.state.round_started ?
        <div className="progress">
          <div className="determinate" style={{width: this.state.progress + '%'}}></div>
        </div> : ''}
        <div className="row">
          <div className="col s8 m6">      
            {(this.state.game_type === 0) ?

                <div className="collection">
                  {this.items.map((item, idx) => 
                    <WeaponButton key={idx} num={idx} wp_name={item.name} icon={item.icon} />
                  )}                
                </div> : ''
            }     
          </div>
          <div className="col s4 m6">
            <blockquote className="hide-on-small-only">
              Press Go button 
              {this.state.game_type === 0 ? 
                ' and choose the weapon until time is not over!' :
                ' and look how computers plays'
              }  
            </blockquote>
            <GoButton goon={this.state.round_started}/>  
          </div>
        </div>     
        
      </div>
      </div>
    );
  }
}

export default Game;