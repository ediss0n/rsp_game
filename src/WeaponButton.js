import React, { Component } from 'react';
import gear from './actions';

class WeaponButton extends Component {
  constructor(props) {
    super(props);
    this.handleHit = this.handleHit.bind(this);
  }
  
  handleHit(event) {
    gear.playerHit(this.props.wp_name, this.props.num);
    return false;
  }
  
  render() {
    return (
      <a href="#" className="collection-item" onClick={this.handleHit}>
        <i className="material-icons left">{this.props.icon}</i> {this.props.wp_name}
      </a>     
    );
  }
}

export default WeaponButton;